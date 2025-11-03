// Temporary in-memory storage for when database is unavailable
let tempStorage = {
  carts: new Map(),
  wishlists: new Map(),
  users: new Map()
};

// Helper to generate temp IDs
const generateTempId = () => `temp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

// Helper to get user cart from temp storage
const getTempCart = (userId) => {
  if (!tempStorage.carts.has(userId)) {
    tempStorage.carts.set(userId, []);
  }
  return tempStorage.carts.get(userId);
};

// Helper to get user wishlist from temp storage
const getTempWishlist = (userId) => {
  if (!tempStorage.wishlists.has(userId)) {
    tempStorage.wishlists.set(userId, []);
  }
  return tempStorage.wishlists.get(userId);
};

// Cart operations
export const tempCartOperations = {
  addItem: (userId, item) => {
    const cart = getTempCart(userId);
    const existingIndex = cart.findIndex(
      cartItem => cartItem.productId === item.productId && 
                  cartItem.variantId === item.variantId
    );
    
    if (existingIndex >= 0) {
      cart[existingIndex].quantity += item.quantity;
    } else {
      cart.push({ 
        ...item, 
        id: generateTempId(),
        addedAt: new Date().toISOString() 
      });
    }
    
    return cart;
  },
  
  getCart: (userId) => {
    const cart = getTempCart(userId);
    // Clean up any invalid items
    const validCart = cart.filter(item => {
      return item && 
             item.productId && 
             typeof item.quantity === 'number' && 
             item.quantity > 0 &&
             item.price !== null && 
             item.price !== undefined;
    });
    
    // Update storage if we filtered out invalid items
    if (validCart.length !== cart.length) {
      tempStorage.carts.set(userId, validCart);
    }
    
    return validCart;
  },
  
  removeItem: (userId, itemId) => {
    const cart = getTempCart(userId);
    const filteredCart = cart.filter(item => item.id !== itemId);
    tempStorage.carts.set(userId, filteredCart);
    return filteredCart;
  },
  
  updateQuantity: (userId, itemId, quantity) => {
    const cart = getTempCart(userId);
    const item = cart.find(item => item.id === itemId);
    if (item) {
      item.quantity = quantity;
    }
    return cart;
  }
};

// Wishlist operations
export const tempWishlistOperations = {
  addItem: (userId, productId) => {
    const wishlist = getTempWishlist(userId);
    const exists = wishlist.find(item => item.productId === productId);
    
    if (!exists) {
      wishlist.push({
        id: generateTempId(),
        productId,
        userId,
        addedAt: new Date().toISOString()
      });
    }
    
    return wishlist;
  },
  
  getWishlist: (userId) => getTempWishlist(userId),
  
  removeItem: (userId, productId) => {
    const wishlist = getTempWishlist(userId);
    const filteredWishlist = wishlist.filter(item => item.productId !== productId);
    tempStorage.wishlists.set(userId, filteredWishlist);
    return filteredWishlist;
  }
};

// Clear temp storage periodically (every 30 minutes)
setInterval(() => {
  tempStorage = {
    carts: new Map(),
    wishlists: new Map(),
    users: new Map()
  };
  console.log('Temporary storage cleared');
}, 30 * 60 * 1000);

export default tempStorage;