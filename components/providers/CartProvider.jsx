import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  items: [],
  isOpen: false,
  loading: false,
  error: null,
  totalItems: 0,
  totalPrice: 0,
};

// Action types
const CART_ACTIONS = {
  SET_LOADING: 'SET_LOADING',
  SET_ERROR: 'SET_ERROR',
  SET_CART: 'SET_CART',
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  TOGGLE_CART: 'TOGGLE_CART',
  CLOSE_CART: 'CLOSE_CART',
};

// Cart reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case CART_ACTIONS.SET_LOADING:
      return { ...state, loading: action.payload };
    
    case CART_ACTIONS.SET_ERROR:
      return { ...state, error: action.payload, loading: false };
    
    case CART_ACTIONS.SET_CART:
      const { items } = action.payload;
      const safeItems = Array.isArray(items) ? items.filter(item => 
        item && 
        (item.productId || (item.product && item.product.id)) && 
        typeof item.quantity === 'number' && 
        item.quantity > 0 &&
        (item.price !== null && item.price !== undefined)
      ) : [];
      return {
        ...state,
        items: safeItems,
        totalItems: safeItems.reduce((sum, item) => sum + (item.quantity || 0), 0),
        totalPrice: safeItems.reduce((sum, item) => {
          const price = item.variant?.price || item.product?.price || item.price || 0;
          const quantity = item.quantity || 0;
          return sum + (parseFloat(price) * quantity);
        }, 0),
        loading: false,
        error: null,
      };
    
    case CART_ACTIONS.ADD_ITEM:
      const newItem = action.payload;
      
      // Filter out any invalid items before processing
      const validItems = state.items.filter(item => 
        item && 
        (item.productId || (item.product && item.product.id))
      );
      
      const existingItemIndex = validItems.findIndex(
        item => {
          if (!item) return false;
          const itemProductId = item.productId || (item.product ? item.product.id : null);
          const newItemProductId = newItem.productId || (newItem.product ? newItem.product.id : null);
          return itemProductId === newItemProductId && 
                 item.variantId === newItem.variantId;
        }
      );
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = validItems.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedItems = [...validItems, newItem];
      }
      
      return {
        ...state,
        items: updatedItems,
        totalItems: updatedItems.reduce((sum, item) => sum + (item?.quantity || 0), 0),
        totalPrice: updatedItems.reduce((sum, item) => {
          const price = item?.variant?.price || item?.product?.price || item?.price || 0;
          const quantity = item?.quantity || 0;
          return sum + (parseFloat(price) * quantity);
        }, 0),
      };
    
    case CART_ACTIONS.REMOVE_ITEM:
      const filteredItems = state.items.filter(item => 
        item && 
        (item.productId || (item.product && item.product.id)) && 
        item.id !== action.payload
      );
      return {
        ...state,
        items: filteredItems,
        totalItems: filteredItems.reduce((sum, item) => sum + (item?.quantity || 0), 0),
        totalPrice: filteredItems.reduce((sum, item) => {
          const price = item?.variant?.price || item?.product?.price || item?.price || 0;
          const quantity = item?.quantity || 0;
          return sum + (parseFloat(price) * quantity);
        }, 0),
      };
    
    case CART_ACTIONS.UPDATE_QUANTITY:
      const { itemId, quantity } = action.payload;
      const updatedQuantityItems = state.items
        .map(item => item && item.id === itemId ? { ...item, quantity } : item)
        .filter(item => 
          item && 
          (item.productId || (item.product && item.product.id)) && 
          item.quantity > 0
        );
      return {
        ...state,
        items: updatedQuantityItems,
        totalItems: updatedQuantityItems.reduce((sum, item) => sum + (item?.quantity || 0), 0),
        totalPrice: updatedQuantityItems.reduce((sum, item) => {
          const price = item?.variant?.price || item?.product?.price || item?.price || 0;
          const quantity = item?.quantity || 0;
          return sum + (parseFloat(price) * quantity);
        }, 0),
      };
    
    case CART_ACTIONS.CLEAR_CART:
      return { ...state, items: [], totalItems: 0, totalPrice: 0 };
    
    case CART_ACTIONS.TOGGLE_CART:
      return { ...state, isOpen: !state.isOpen };
    
    case CART_ACTIONS.CLOSE_CART:
      return { ...state, isOpen: false };
    
    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

// Cart provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Load cart on mount
  useEffect(() => {
    loadCart();
  }, []);

  // API call to load cart
  const loadCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      const response = await fetch('/api/cart');
      
      if (response.ok) {
        const data = await response.json();
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: data.items || [] } });
      } else if (response.status === 401) {
        // User not authenticated, try to load from localStorage for guest cart
        try {
          const guestCart = localStorage.getItem('guestCart');
          const items = guestCart ? JSON.parse(guestCart) : [];
          const validItems = Array.isArray(items) ? items.filter(item => 
            item && 
            item.productId && 
            typeof item.quantity === 'number' && 
            item.quantity > 0
          ) : [];
          
          // Clean up localStorage if we filtered out any corrupted items
          if (validItems.length !== items.length) {
            console.log('Cleaned up corrupted guest cart items from localStorage');
            localStorage.setItem('guestCart', JSON.stringify(validItems));
          }
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: validItems } });
        } catch (localStorageError) {
          console.error('Error parsing guest cart from localStorage:', localStorageError);
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: [] } });
        }
      } else {
        // If API fails, try localStorage as fallback
        console.log('Cart API failed, using localStorage fallback');
        try {
          const fallbackCart = localStorage.getItem('cartFallback');
          const items = fallbackCart ? JSON.parse(fallbackCart) : [];
          const validItems = Array.isArray(items) ? items.filter(item => 
            item && 
            item.productId && 
            typeof item.quantity === 'number' && 
            item.quantity > 0
          ) : [];
          
          // Clean up localStorage if we filtered out any corrupted items
          if (validItems.length !== items.length) {
            console.log('Cleaned up corrupted fallback cart items from localStorage');
            localStorage.setItem('cartFallback', JSON.stringify(validItems));
          }
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: validItems } });
        } catch (localStorageError) {
          console.error('Error parsing fallback cart from localStorage:', localStorageError);
          dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: [] } });
        }
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Try to load from localStorage as fallback
      try {
        const guestCart = localStorage.getItem('guestCart');
        const items = guestCart ? JSON.parse(guestCart) : [];
        const validItems = Array.isArray(items) ? items.filter(item => 
          item && 
          item.productId && 
          typeof item.quantity === 'number' && 
          item.quantity > 0
        ) : [];
        
        // Clean up localStorage if we filtered out any corrupted items
        if (validItems.length !== items.length) {
          console.log('Cleaned up corrupted cart items from localStorage during error recovery');
          localStorage.setItem('guestCart', JSON.stringify(validItems));
        }
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: validItems } });
      } catch (localStorageError) {
        console.error('Error parsing localStorage cart data:', localStorageError);
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: [] } });
      }
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Add item to cart
  const addToCart = async (product, quantity = 1, variantId = null) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      // Validate product data before sending
      if (!product || !product.id || !product.price) {
        throw new Error('Invalid product data');
      }
      
      const response = await fetch('/api/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productId: product.id,
          variantId,
          quantity,
          price: product.price,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        
        // Create cart item from response or construct it if not provided
        const cartItem = data.item || {
          id: `new-${Date.now()}-${Math.random()}`,
          productId: product.id,
          variantId,
          quantity,
          price: product.price,
          product: {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            brand: product.brand,
            category: product.category,
          },
          addedAt: new Date().toISOString(),
        };
        
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: cartItem });
        
        // Show success message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-success', {
            detail: { message: `${product.name} added to cart!` }
          });
          window.dispatchEvent(event);
        }
      } else if (response.status === 401) {
        // User not authenticated, add to guest cart (localStorage)
        const guestCartItem = {
          id: `guest-${Date.now()}-${Math.random()}`,
          productId: product.id,
          variantId,
          quantity,
          price: product.price,
          product: {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            brand: product.brand,
            category: product.category,
          },
          addedAt: new Date().toISOString(),
        };
        
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: guestCartItem });
        
        // Save to localStorage
        const currentItems = [...state.items, guestCartItem];
        localStorage.setItem('guestCart', JSON.stringify(currentItems));
        
        // Show success message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-success', {
            detail: { message: `${product.name} added to cart! (Login to sync)` }
          });
          window.dispatchEvent(event);
        }
      } else {
        // Handle API errors with specific messages
        let errorMessage = 'Failed to add item to cart';
        try {
          const errorData = await response.json();
          errorMessage = errorData.error || errorMessage;
        } catch (e) {
          // If we can't parse the error response, use default message
        }

        // For stock or other business logic errors, don't fallback to localStorage
        if (response.status === 400) {
          dispatch({ type: CART_ACTIONS.SET_ERROR, payload: errorMessage });
          
          if (typeof window !== 'undefined') {
            const event = new CustomEvent('cart-error', {
              detail: { message: errorMessage }
            });
            window.dispatchEvent(event);
          }
          return;
        }
        
        // For server errors, fallback to localStorage
        const fallbackCartItem = {
          id: `fallback-${Date.now()}-${Math.random()}`,
          productId: product.id,
          variantId,
          quantity,
          price: product.price,
          product: {
            id: product.id,
            name: product.name,
            images: product.images,
            price: product.price,
            brand: product.brand,
            category: product.category,
          },
          addedAt: new Date().toISOString(),
        };
        
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: fallbackCartItem });
        
        // Save to localStorage as fallback
        const currentItems = [...state.items, fallbackCartItem];
        localStorage.setItem('cartFallback', JSON.stringify(currentItems));
        
        // Show message about offline mode
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-success', {
            detail: { message: `${product.name} added to cart! (Offline mode)` }
          });
          window.dispatchEvent(event);
        }
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
      
      // If complete API failure, add to localStorage as fallback
      try {
        const fallbackCartItem = {
          id: `offline-${Date.now()}-${Math.random()}`,
          productId: product.id,
          variantId,
          quantity,
          price: product.price,
          product: {
            id: product.id,
            name: product.name,
            images: product.images || [],
            price: product.price,
            brand: product.brand || '',
            category: product.category || '',
          },
          addedAt: new Date().toISOString(),
        };
        
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: fallbackCartItem });
        
        // Save to localStorage
        const currentItems = [...state.items, fallbackCartItem];
        localStorage.setItem('cartFallback', JSON.stringify(currentItems));
        
        // Show offline success message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-success', {
            detail: { message: `${product.name} added to cart! (Working offline)` }
          });
          window.dispatchEvent(event);
        }
      } catch (fallbackError) {
        console.error('Fallback cart operation failed:', fallbackError);
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: 'Unable to add item to cart' });
        
        // Show error message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-error', {
            detail: { message: 'Unable to add item to cart. Please try again.' }
          });
          window.dispatchEvent(event);
        }
      }
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Remove item from cart
  const removeFromCart = async (itemId) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: itemId });
      } else if (response.status === 401) {
        // Handle guest cart removal
        const updatedItems = state.items.filter(item => item.id !== itemId);
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: updatedItems } });
        localStorage.setItem('guestCart', JSON.stringify(updatedItems));
      } else {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
      
      // Try to remove locally as fallback
      try {
        const updatedItems = state.items.filter(item => item.id !== itemId);
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: updatedItems } });
        localStorage.setItem('cartFallback', JSON.stringify(updatedItems));
        
        // Show fallback success message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-success', {
            detail: { message: 'Item removed locally (sync pending)' }
          });
          window.dispatchEvent(event);
        }
      } catch (fallbackError) {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
        
        // Show error message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-error', {
            detail: { message: error.message }
          });
          window.dispatchEvent(event);
        }
      }
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Update item quantity
  const updateQuantity = async (itemId, quantity) => {
    if (quantity <= 0) {
      return removeFromCart(itemId);
    }

    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      const response = await fetch(`/api/cart/${itemId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ quantity }),
      });

      if (response.ok) {
        dispatch({ type: CART_ACTIONS.UPDATE_QUANTITY, payload: { itemId, quantity } });
      } else if (response.status === 401) {
        // Handle guest cart update
        const updatedItems = state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: updatedItems } });
        localStorage.setItem('guestCart', JSON.stringify(updatedItems));
      } else {
        const error = await response.json();
        throw new Error(error.error || error.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
      
      // Try to update locally as fallback
      try {
        const updatedItems = state.items.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        );
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: updatedItems } });
        localStorage.setItem('cartFallback', JSON.stringify(updatedItems));
        
        // Show fallback success message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-success', {
            detail: { message: 'Quantity updated locally (sync pending)' }
          });
          window.dispatchEvent(event);
        }
      } catch (fallbackError) {
        dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
        
        // Show error message
        if (typeof window !== 'undefined') {
          const event = new CustomEvent('cart-error', {
            detail: { message: error.message }
          });
          window.dispatchEvent(event);
        }
      }
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Clear entire cart
  const clearCart = async () => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
      const response = await fetch('/api/cart', {
        method: 'DELETE',
      });

      if (response.ok) {
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
        localStorage.removeItem('guestCart'); // Also clear guest cart
      } else if (response.status === 401) {
        // Handle guest cart clear
        dispatch({ type: CART_ACTIONS.CLEAR_CART });
        localStorage.removeItem('guestCart');
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to clear cart');
      }
    } catch (error) {
      console.error('Error clearing cart:', error);
      dispatch({ type: CART_ACTIONS.SET_ERROR, payload: error.message });
      
      // Show error message
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('cart-error', {
          detail: { message: error.message }
        });
        window.dispatchEvent(event);
      }
    } finally {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Toggle cart sidebar
  const toggleCart = () => {
    dispatch({ type: CART_ACTIONS.TOGGLE_CART });
  };

  // Close cart sidebar
  const closeCart = () => {
    dispatch({ type: CART_ACTIONS.CLOSE_CART });
  };

  // Get item count for a specific product
  const getItemCount = (productId, variantId = null) => {
    if (!productId || !Array.isArray(state.items)) {
      return 0;
    }
    
    // Filter out any invalid items first
    const validItems = state.items.filter(item => 
      item && (item.productId || (item.product && item.product.id))
    );
    
    // If we found invalid items, clean up the state
    if (validItems.length !== state.items.length) {
      console.log('Cleaning up invalid cart items...');
      // Dispatch a cleanup action to remove invalid items
      dispatch({ type: CART_ACTIONS.SET_CART, payload: { items: validItems } });
    }
    
    const item = validItems.find(
      item => {
        const itemProductId = item.productId || (item.product ? item.product.id : null);
        return itemProductId === productId && item.variantId === variantId;
      }
    );
    return item && typeof item.quantity === 'number' ? item.quantity : 0;
  };

  const value = {
    // State
    ...state,
    
    // Actions
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    toggleCart,
    closeCart,
    loadCart,
    getItemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;