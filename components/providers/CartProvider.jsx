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
      const safeItems = Array.isArray(items) ? items.filter(item => item && typeof item.quantity === 'number') : [];
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
      const existingItemIndex = state.items.findIndex(
        item => item.productId === newItem.productId && item.variantId === newItem.variantId
      );
      
      let updatedItems;
      if (existingItemIndex >= 0) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, newItem];
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
      const filteredItems = state.items.filter(item => item.id !== action.payload);
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
      const updatedQuantityItems = state.items.map(item =>
        item.id === itemId ? { ...item, quantity } : item
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
        const guestCart = localStorage.getItem('guestCart');
        const items = guestCart ? JSON.parse(guestCart) : [];
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items } });
      } else {
        // If API fails, try localStorage as fallback
        console.log('Cart API failed, using localStorage fallback');
        const fallbackCart = localStorage.getItem('cartFallback');
        const items = fallbackCart ? JSON.parse(fallbackCart) : [];
        dispatch({ type: CART_ACTIONS.SET_CART, payload: { items } });
      }
    } catch (error) {
      console.error('Error loading cart:', error);
      // Try to load from localStorage as fallback
      const guestCart = localStorage.getItem('guestCart');
      const items = guestCart ? JSON.parse(guestCart) : [];
      dispatch({ type: CART_ACTIONS.SET_CART, payload: { items } });
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: false });
    }
  };

  // Add item to cart
  const addToCart = async (product, quantity = 1, variantId = null) => {
    try {
      dispatch({ type: CART_ACTIONS.SET_LOADING, payload: true });
      
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
        dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: data.item });
        
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
        // API error - fallback to localStorage
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
        throw new Error(error.message || 'Failed to remove item from cart');
      }
    } catch (error) {
      console.error('Error removing from cart:', error);
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
        throw new Error(error.message || 'Failed to update quantity');
      }
    } catch (error) {
      console.error('Error updating quantity:', error);
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
    const item = state.items.find(
      item => item.productId === productId && item.variantId === variantId
    );
    return item ? item.quantity : 0;
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