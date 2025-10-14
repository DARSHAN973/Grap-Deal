# 🎯 GRAP DEAL - COMPLETE BUSINESS FLOW

> **Comprehensive Business Logic & User Journey Documentation**  
> Last Updated: October 10, 2025  
> Platform: Multi-Business Model E-Commerce Platform

---

## 📋 EXECUTIVE OVERVIEW

**Grap Deal** is a comprehensive multi-business model platform that operates four distinct business verticals:

### **Business Models:**

1. **E-COMMERCE** - Grap Deal owns and sells products directly
2. **B2C (Vendor Marketplace)** - Third-party vendors sell through platform (commission-based)
3. **B2B (Service Directory)** - Business service providers list services (subscription-based)
4. **C2C (Customer Marketplace)** - Customers sell to customers (reveal fee-based)

### **Revenue Streams:**

| Model | Revenue Source | Example |
|-------|---------------|---------|
| E-Commerce | Product sales (100% revenue) | Sell headphones for ₹2,999 |
| B2C | Commission (15% avg) | Vendor sells for ₹10,000 → Platform earns ₹1,500 |
| B2B | Subscriptions (₹999-4,999/month) | Business pays ₹2,499/month for Pro plan |
| C2C | Reveal fees (₹20 per contact) + Featured listings | Buyer pays ₹20 to see seller's phone number |

---

## 🎯 PLATFORM FLOW ARCHITECTURE

```
┌─────────────────────────────────────────────────────────────┐
│                     CUSTOMER ENTRY POINT                     │
│                    www.grapdeal.com                          │
└──────────────────┬──────────────────────────────────────────┘
                   │
         ┌─────────┴─────────┐
         │   AUTHENTICATION   │
         │  Login / Register  │
         └─────────┬─────────┘
                   │
    ┌──────────────┼──────────────┬──────────────┐
    │              │              │              │
    ▼              ▼              ▼              ▼
┌────────┐   ┌─────────┐   ┌─────────┐   ┌──────────┐
│E-COMM  │   │  B2C    │   │  B2B    │   │   C2C    │
│Shop &  │   │ Vendor  │   │Business │   │Customer  │
│ Buy    │   │Products │   │Services │   │Listings  │
└────────┘   └─────────┘   └─────────┘   └──────────┘
    │              │              │              │
    └──────────────┴──────────────┴──────────────┘
                   │
         ┌─────────┴─────────┐
         │   ADMIN PANEL      │
         │ (All Models Mgmt)  │
         └───────────────────┘
```

---

# 1️⃣ E-COMMERCE FLOW (Grap Deal Direct Sales)

## 🎯 Business Model Overview

**What:** Grap Deal purchases inventory and sells directly to customers  
**Revenue:** 100% of product sale price (minus costs)  
**Fulfillment:** Grap Deal handles everything  
**Control:** Complete control over pricing, inventory, quality

---

## 📊 CUSTOMER PURCHASE JOURNEY

### **DISCOVERY PHASE**

**Customer arrives on platform through:**
- Direct URL visit
- Google search
- Social media ads
- Word of mouth

**Homepage Experience:**
- Sees curated hero banners with current promotions
- Views featured E-Commerce products
- Can browse by categories (Electronics, Fashion, Home, etc.)
- Notices "Best Sellers" and "New Arrivals" sections
- Sees trust indicators (secure payment, fast delivery, returns accepted)

**Key Decision Points:**
- Does the product catch attention?
- Is the price competitive?
- Is the product in stock?
- What are the reviews saying?

---

### **EXPLORATION PHASE**

**Customer browses products:**

**Category Navigation:**
- Clicks on category (e.g., "Electronics")
- Sees all E-Commerce products in that category
- Can use filters: Price range, Brand, Rating, Availability
- Can sort: Price (Low to High), Newest, Popularity, Rating

**Search Experience:**
- Types product name in search bar
- Gets suggestions as they type
- Results show E-Commerce products (can be mixed with B2C products)
- Can refine search with filters

**Product Discovery Triggers:**
- Attractive product images
- Competitive pricing
- Discount badges (e.g., "25% OFF")
- High ratings (4+ stars)
- "In Stock" indicator
- "Free Delivery" badge

---

### **EVALUATION PHASE**

**Customer clicks on product:**

**Product Detail Page Experience:**

**Visual Assessment:**
- Views primary product image (high quality, zoomable)
- Sees 4-5 additional images from different angles
- Can zoom in to see details
- May see product in use (lifestyle shots)

**Price Analysis:**
- Sees current price (e.g., ₹2,999)
- Sees original price struck through if discounted (e.g., ~~₹3,999~~)
- Calculates savings (25% off, Save ₹1,000)
- Sees "Price drop alert" if recently reduced

**Information Gathering:**
- Reads short product description (2-3 lines)
- Expands full description (detailed features)
- Reviews technical specifications table
- Checks warranty information
- Verifies delivery timeline ("Delivers in 3-5 days")
- Confirms return policy ("7-day return available")

**Social Proof:**
- Reads customer reviews (sorted by most helpful)
- Views star rating distribution (5★: 45%, 4★: 30%, etc.)
- Sees verified purchase badges on reviews
- May watch video reviews if available
- Checks Q&A section for common questions

**Key Decision Criteria:**
1. Does product meet needs?
2. Is price within budget?
3. Are reviews positive?
4. Is delivery time acceptable?
5. Is return policy satisfactory?

---

### **DECISION PHASE**

**Customer decides to purchase:**

**Add to Cart:**
- Selects quantity (subject to availability)
- May see "Only 3 left in stock" urgency message
- Clicks "Add to Cart" button
- Sees confirmation: "Item added to cart"
- Cart icon updates with count

**Alternative Actions:**
- "Buy Now" - Skip cart, go directly to checkout
- "Add to Wishlist" - Save for later
- "Share" - Send to friend/family for opinion

**Cart Abandonment Prevention:**
- "Cart" button glows or pulses
- Small pop-up: "Complete your purchase and get it by [date]"
- May see "Frequently bought together" suggestions

---

### **CHECKOUT PHASE**

**Customer proceeds to checkout:**

**Cart Review:**
- Views all items in cart
- Can adjust quantities
- Can remove items
- Sees itemized breakdown:
  - Subtotal (sum of all items)
  - Delivery charges (calculated based on weight/location)
  - Tax (if applicable)
  - Discount (if coupon applied)
  - **Grand Total**

**Coupon Application:**
- Can enter coupon code
- Sees available coupons: "FIRST100" (₹100 off first order)
- Applies coupon, sees price update immediately

**Delivery Address:**
- If returning customer: Selects from saved addresses
- If new customer: Enters complete address:
  - Full name
  - Phone number
  - Address line 1, 2
  - City, State, PIN code
  - Address type (Home/Office)
- Option to save address for future orders

**Delivery Options:**
- Standard delivery (3-5 days) - Free or ₹50
- Express delivery (1-2 days) - ₹100
- Sees estimated delivery date for each option

**Billing Address:**
- Same as shipping (default)
- Or enter different billing address

---

### **PAYMENT PHASE**

**Payment Method Selection:**

**Options Available:**
1. **Credit/Debit Card**
   - Enter card number, expiry, CVV
   - Option to save card for future (secure, encrypted)
   
2. **UPI**
   - Enter UPI ID
   - Verify on UPI app
   - Instant confirmation
   
3. **Net Banking**
   - Select bank
   - Redirected to bank website
   - Login and authorize
   
4. **Wallets**
   - Paytm, PhonePe, Google Pay
   - One-click payment if linked
   
5. **Cash on Delivery (COD)**
   - Available for orders under ₹10,000
   - May have ₹50 COD charges
   - Pay when product arrives

**Payment Security Indicators:**
- SSL certificate badge
- "Secured by Razorpay" logo
- "Your payment info is encrypted" message

**Order Review Before Payment:**
- Summary of items
- Delivery address confirmation
- Payment method confirmation
- Total amount to pay
- Terms & Conditions checkbox
- "Place Order" button

---

### **PAYMENT PROCESSING**

**What Happens Behind the Scenes:**

**If Online Payment (Card/UPI/Net Banking):**

1. Customer clicks "Place Order"
2. Redirected to Razorpay payment gateway
3. Completes payment
4. Razorpay verifies payment
5. Returns to Grap Deal with confirmation
6. System verifies payment signature
7. If verified:
   - Order status: CONFIRMED
   - Payment status: COMPLETED
   - Inventory: Reserved quantity reduced, actual stock reduced
   - Cart: Cleared
   - Email: Order confirmation sent
   - SMS: "Your order is confirmed" sent
   - Admin: Notified of new order

**If COD:**
1. Customer clicks "Place Order"
2. No payment gateway involved
3. Order status: CONFIRMED
4. Payment status: PENDING (will be paid on delivery)
5. Rest same as online payment (inventory, notifications)

---

### **POST-ORDER PHASE**

**Immediate Confirmation:**

**Customer sees:**
- Success screen with checkmark animation
- Order number (e.g., EC1728563421)
- Order summary (items, address, payment method)
- Estimated delivery date
- "Track Order" button
- "Continue Shopping" button

**Email Confirmation:**
- Order number and details
- Itemized list with images
- Delivery address
- Payment method
- Total paid
- Expected delivery
- Track order link
- Cancel order option (if within 1 hour)

**SMS Confirmation:**
- "Your order #EC1728563421 is confirmed. Track: [link]"

---

### **ORDER FULFILLMENT FLOW**

**Admin Side - Order Processing:**

**Step 1: Order Received (Admin Dashboard)**
- Admin sees notification: "New E-Commerce Order"
- Order appears in "Pending Orders" list
- Admin clicks to view details

**Step 2: Order Verification**
- Admin verifies:
  - Payment received (if online) or COD confirmed
  - Product in stock
  - Address is complete and valid
  - No fraud indicators

**Step 3: Inventory Check**
- System shows:
  - Product location in warehouse
  - Quantity available
  - Reserved vs available stock
- If out of stock: Admin must cancel order and refund

**Step 4: Packing**
- Admin/warehouse staff:
  - Picks product from warehouse
  - Quality checks
  - Packs securely
  - Includes invoice
  - Affixes shipping label
- Order status: PROCESSING

**Step 5: Logistics Assignment**
- Admin chooses delivery partner:
  - **Shiprocket** (preferred for reliability)
  - **Delhivery** (backup option)
  - **Self-delivery** (for local orders)

**Shiprocket Integration:**
- Admin enters:
  - Product weight
  - Package dimensions
  - Pickup address (warehouse)
- System creates shipment on Shiprocket
- Shiprocket provides:
  - AWB (Airway Bill) number
  - Tracking number
  - Estimated delivery date
- System updates order:
  - Tracking number saved
  - AWB number saved
  - Status: SHIPPED

**Customer Notification:**
- Email: "Your order has been shipped!"
- SMS: "Order #EC1728563421 shipped. Track: [link]"
- Shows tracking number
- Shows expected delivery date

---

### **DELIVERY TRACKING PHASE**

**Customer Tracking Experience:**

**Customer accesses tracking:**
- Via "Track Order" button in email/SMS
- Via "My Orders" section in account
- Via order confirmation page link

**Tracking Page Shows:**

**Timeline View:**
```
✓ Order Placed - Oct 10, 10:30 AM
✓ Payment Confirmed - Oct 10, 10:31 AM
✓ Order Processing - Oct 11, 9:00 AM
✓ Shipped - Oct 12, 2:00 PM
    ↓ Package left Mumbai hub
○ Out for Delivery - Pending
○ Delivered - Pending
```

**Current Status:**
- "Your package is in transit"
- Last updated location: "Mumbai Hub"
- Expected delivery: "Oct 15, before 7 PM"

**Tracking Details:**
- Tracking number: TRK123456
- AWB number: AWB789012
- Courier: Shiprocket (via Delivery Partner)
- "Track on courier website" link

**Map View (optional):**
- Shows approximate current location
- Shows delivery address
- Estimated route

---

### **DELIVERY PHASE**

**What Happens:**

**Shiprocket/Delivery Partner:**
1. Picks up package from Grap Deal warehouse
2. Transports to local hub
3. Assigns to delivery agent
4. Delivery agent schedules delivery
5. May call customer: "I'll deliver between 2-4 PM"
6. Arrives at customer address
7. Hands over package
8. If COD: Collects cash
9. Gets delivery confirmation (photo/signature)
10. Updates system: DELIVERED

**Webhooks Update:**
- Shiprocket sends webhook to Grap Deal
- "Order #EC1728563421 delivered successfully"
- System updates:
  - Order status: DELIVERED
  - Delivery timestamp recorded
  - If COD: Payment status: COMPLETED

**Customer Notification:**
- Email: "Your order has been delivered!"
- SMS: "Order #EC1728563421 delivered. Thank you!"
- Push notification (if app)

---

### **POST-DELIVERY PHASE**

**Review Request (3 days after delivery):**

**Customer receives:**
- Email: "How was your product?"
- Shows product image
- "Rate & Review" button
- Incentive: "Get ₹50 coupon for your next order"

**If customer reviews:**
- Rates product (1-5 stars)
- Writes review text
- Can upload photos
- Submits review
- Review goes to admin for moderation
- Once approved, appears on product page

**Returns/Exchange (within 7 days):**

**If customer wants to return:**
- Goes to "My Orders"
- Clicks "Return/Exchange"
- Selects reason:
  - Defective product
  - Wrong item received
  - Size/fit issue
  - Changed mind
  - Damaged in delivery
- Can upload photos as proof
- Submits return request

**Return Processing:**
- Admin reviews request
- If valid: Approves return
- Generates return AWB
- Courier picks up from customer
- Product reaches warehouse
- Quality check performed
- If acceptable: Refund initiated
- Money returned to customer (3-5 days)

---

## 💰 E-COMMERCE REVENUE CALCULATION

**Example Order:**

```
Product: Premium Headphones
Selling Price: ₹2,999
Purchase Cost: ₹1,800 (from supplier)
Delivery Charges: ₹50 (charged to customer)
Actual Delivery Cost: ₹70 (paid to Shiprocket)
Platform Commission: ₹0 (own product)

Revenue Calculation:
Customer Pays: ₹2,999 + ₹50 = ₹3,049

Costs:
- Product Cost: ₹1,800
- Delivery: ₹70
- Payment Gateway Fee (2%): ₹61
Total Costs: ₹1,931

Net Profit: ₹3,049 - ₹1,931 = ₹1,118 (36.6% margin)
```

---

## 📊 E-COMMERCE ADMIN ANALYTICS

**Admin Dashboard Shows:**

**Daily Metrics:**
- Total orders today: 23
- Revenue today: ₹45,670
- Pending orders: 12
- Orders to ship: 8

**Monthly Performance:**
- Total orders: 456
- Total revenue: ₹567,800
- Average order value: ₹1,245
- Top selling product: Premium Headphones (89 units)
- Category performance: Electronics (60%), Fashion (25%), Home (15%)

**Inventory Alerts:**
- Low stock: 8 products
- Out of stock: 2 products
- Reorder needed: 5 products

**Fulfillment Metrics:**
- Average processing time: 1.5 days
- Average delivery time: 3.2 days
- Delivery success rate: 98.5%
- Return rate: 2.3%

---

# 2️⃣ B2C FLOW (Vendor Marketplace)
   - Individual product → Goes to product detail page
   - "Shop Now" → Goes to E-Commerce product listing
   - Category → Filtered products

#### **API Calls:**
```javascript
// Get E-Commerce products for homepage
GET /api/products?businessModel=E_COMMERCE&featured=true&limit=8

Response:
{
  products: [
    {
      id: "prod_123",
      name: "Premium Headphones",
      slug: "premium-headphones",
      basePrice: 2999,
      comparePrice: 3999,
      businessModel: "E_COMMERCE",
      images: [{url: "/uploads/...", isPrimary: true}],
      category: {name: "Electronics"},
      status: "ACTIVE"
    }
  ]
}
```

#### **Database Query:**
```javascript
const products = await prisma.product.findMany({
  where: {
    businessModel: 'E_COMMERCE',
    status: 'ACTIVE',
    isActive: true,
    isFeatured: true
  },
  include: {
    images: { where: { isPrimary: true } },
    category: { select: { name: true, slug: true } }
  },
  take: 8,
  orderBy: { createdAt: 'desc' }
});
```

---

### **PAGE 2: E-COMMERCE PRODUCT LISTING**

**URL:** `/products?model=ecommerce` or `/ecommerce`

#### **UI Elements:**
- Breadcrumb: Home > E-Commerce Products
- Filters sidebar:
  - Categories
  - Price range
  - Sort by (Price, Newest, Popular)
- Product grid (12 products per page)
- Pagination
- "Add to Cart" buttons on each card

#### **User Actions:**
1. Browse products
2. Apply filters
3. Click product → Goes to detail page
4. Click "Add to Cart" → Opens cart drawer

#### **API Calls:**
```javascript
// List E-Commerce products with filters
GET /api/products?businessModel=E_COMMERCE&page=1&limit=12&category=electronics&minPrice=1000&maxPrice=5000&sortBy=price-low

Response:
{
  products: [...],
  totalCount: 45,
  page: 1,
  totalPages: 4
}
```

#### **State Management:**
```javascript
// Frontend state
const [filters, setFilters] = useState({
  category: null,
  minPrice: 0,
  maxPrice: 10000,
  sortBy: 'newest'
});

const [products, setProducts] = useState([]);
const [loading, setLoading] = useState(false);
```

---

### **PAGE 3: PRODUCT DETAIL PAGE**

**URL:** `/products/[slug]`

#### **UI Elements:**
- Product image gallery (zoom, multiple images)
- Product name, price, discount
- "Add to Cart" button
- Quantity selector
- Product description
- Specifications
- Reviews section
- Related products

#### **User Actions:**
1. Views product details
2. Selects quantity
3. Clicks "Add to Cart"
4. Cart drawer opens
5. Can continue shopping or go to checkout

#### **API Calls:**
```javascript
// Get product by slug
GET /api/products/premium-headphones

Response:
{
  id: "prod_123",
  name: "Premium Headphones",
  slug: "premium-headphones",
  description: "High-quality wireless headphones...",
  basePrice: 2999,
  comparePrice: 3999,
  businessModel: "E_COMMERCE",
  sku: "EC-HEAD-001",
  category: {id: "cat_1", name: "Electronics"},
  images: [
    {url: "/uploads/products/head-1.jpg", isPrimary: true},
    {url: "/uploads/products/head-2.jpg", isPrimary: false}
  ],
  inventory: [{quantity: 50, reservedQty: 5}],
  reviews: [...],
  averageRating: 4.5,
  reviewCount: 23
}
```

#### **Add to Cart Flow:**

**Frontend:**
```javascript
const handleAddToCart = async () => {
  const response = await fetch('/api/cart/add', {
    method: 'POST',
    body: JSON.stringify({
      productId: product.id,
      quantity: selectedQuantity
    })
  });
  
  if (response.ok) {
    // Update cart count in header
    // Show success toast
    // Open cart drawer
  }
};
```

**API:**
```javascript
// Add to cart
POST /api/cart/add

Request:
{
  productId: "prod_123",
  quantity: 1
}

Response:
{
  success: true,
  cart: {
    id: "cart_456",
    items: [
      {
        id: "item_789",
        product: {...},
        quantity: 1,
        price: 2999
      }
    ],
    subtotal: 2999
  }
}
```

**Database Query:**
```javascript
// Check if cart exists for user
let cart = await prisma.cart.findUnique({
  where: { userId: user.id },
  include: { items: true }
});

// If not, create cart
if (!cart) {
  cart = await prisma.cart.create({
    data: { userId: user.id }
  });
}

// Check if product already in cart
const existingItem = await prisma.cartItem.findFirst({
  where: {
    cartId: cart.id,
    productId: productId
  }
});

if (existingItem) {
  // Update quantity
  await prisma.cartItem.update({
    where: { id: existingItem.id },
    data: { quantity: existingItem.quantity + quantity }
  });
} else {
  // Add new item
  await prisma.cartItem.create({
    data: {
      cartId: cart.id,
      productId: productId,
      quantity: quantity,
      price: product.basePrice
    }
  });
}

// Check inventory
const inventory = await prisma.inventory.findFirst({
  where: { productId: productId }
});

if (inventory.quantity - inventory.reservedQty < quantity) {
  throw new Error('Insufficient stock');
}
```

---

### **PAGE 4: CART PAGE**

**URL:** `/cart`

#### **UI Elements:**
- Cart items list (image, name, price, quantity, remove)
- Quantity updater (+/- buttons)
- Item subtotal
- Cart summary:
  - Subtotal
  - Delivery charges (calculated)
  - Tax (if applicable)
  - Total
- "Continue Shopping" button
- "Proceed to Checkout" button

#### **User Actions:**
1. Views cart items
2. Updates quantities
3. Removes items
4. Clicks "Proceed to Checkout"

#### **API Calls:**
```javascript
// Get cart
GET /api/cart

Response:
{
  cart: {
    id: "cart_456",
    items: [
      {
        id: "item_789",
        product: {
          id: "prod_123",
          name: "Premium Headphones",
          images: [{url: "..."}]
        },
        quantity: 2,
        price: 2999
      }
    ],
    subtotal: 5998,
    deliveryCharges: 50,
    tax: 0,
    total: 6048
  }
}

// Update cart item quantity
PUT /api/cart/items/item_789

Request:
{
  quantity: 3
}

// Remove cart item
DELETE /api/cart/items/item_789
```

---

### **PAGE 5: CHECKOUT PAGE**

**URL:** `/checkout`

#### **UI Steps (Multi-step form):**

**Step 1: Address Selection**
- Show saved addresses
- "Add New Address" button
- Select address radio buttons

**Step 2: Payment Method**
- Online Payment (Razorpay)
- Cash on Delivery (COD)

**Step 3: Review Order**
- Order summary
- Selected address
- Payment method
- Total amount
- "Place Order" button

#### **UI Elements:**
```jsx
<CheckoutWizard>
  <Step1_Address />
  <Step2_Payment />
  <Step3_Review />
</CheckoutWizard>
```

#### **User Actions:**

**Step 1: Address**
1. User sees saved addresses
2. Selects one OR adds new address
3. Clicks "Continue"

**API Call - Get Addresses:**
```javascript
GET /api/user/addresses

Response:
{
  addresses: [
    {
      id: "addr_123",
      type: "HOME",
      firstName: "John",
      lastName: "Doe",
      address1: "123 Main St",
      city: "Mumbai",
      state: "Maharashtra",
      zipCode: "400001",
      phone: "+91-9876543210",
      isDefault: true
    }
  ]
}
```

**API Call - Add Address:**
```javascript
POST /api/user/addresses

Request:
{
  type: "HOME",
  firstName: "John",
  lastName: "Doe",
  address1: "123 Main St",
  address2: "Apt 4B",
  city: "Mumbai",
  state: "Maharashtra",
  country: "India",
  zipCode: "400001",
  phone: "+91-9876543210",
  isDefault: false
}
```

**Step 2: Payment Method**
1. User selects payment method
2. If Razorpay → Continues to review
3. If COD → Continues to review

**Step 3: Review & Place Order**
1. User reviews everything
2. Clicks "Place Order"
3. If Razorpay → Opens Razorpay checkout
4. If COD → Creates order immediately

---

### **PAGE 6: PAYMENT FLOW (RAZORPAY)**

#### **Frontend Flow:**

```javascript
const handlePlaceOrder = async () => {
  // Step 1: Create order on backend
  const response = await fetch('/api/orders/create', {
    method: 'POST',
    body: JSON.stringify({
      addressId: selectedAddress.id,
      paymentMethod: 'RAZORPAY'
    })
  });
  
  const { order, razorpayOrderId } = await response.json();
  
  // Step 2: Open Razorpay checkout
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: order.total * 100, // in paise
    currency: 'INR',
    name: 'Grap Deal',
    description: `Order #${order.orderNumber}`,
    order_id: razorpayOrderId,
    handler: async function(response) {
      // Step 3: Verify payment on backend
      const verifyResponse = await fetch('/api/payment/verify', {
        method: 'POST',
        body: JSON.stringify({
          orderId: order.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        })
      });
      
      if (verifyResponse.ok) {
        router.push(`/orders/${order.id}/success`);
      }
    },
    prefill: {
      name: user.name,
      email: user.email,
      contact: user.phone
    }
  };
  
  const razorpay = new Razorpay(options);
  razorpay.open();
};
```

#### **Backend API - Create Order:**

```javascript
POST /api/orders/create

Request:
{
  addressId: "addr_123",
  paymentMethod: "RAZORPAY"
}

// Server-side logic:
async function createOrder(req, res) {
  const { addressId, paymentMethod } = req.body;
  const { userId } = req.user;
  
  // 1. Get cart
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true }
      }
    }
  });
  
  if (!cart || cart.items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty' });
  }
  
  // 2. Get address
  const address = await prisma.address.findUnique({
    where: { id: addressId }
  });
  
  // 3. Calculate totals
  const subtotal = cart.items.reduce((sum, item) => {
    return sum + (item.price * item.quantity);
  }, 0);
  
  const deliveryCharges = 50; // Fixed or calculated
  const tax = 0; // Calculate if needed
  const total = subtotal + deliveryCharges + tax;
  
  // 4. Generate order number
  const orderNumber = `EC${Date.now()}`;
  
  // 5. Create order in database
  const order = await prisma.order.create({
    data: {
      orderNumber,
      userId,
      businessModel: 'E_COMMERCE',
      subtotal,
      shipping: deliveryCharges,
      tax,
      total,
      status: 'PENDING',
      paymentStatus: 'PENDING',
      shippingAddress: address,
      billingAddress: address,
      items: {
        create: cart.items.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        }))
      }
    },
    include: {
      items: {
        include: { product: true }
      }
    }
  });
  
  // 6. Reserve inventory
  for (const item of cart.items) {
    await prisma.inventory.updateMany({
      where: { productId: item.productId },
      data: {
        reservedQty: {
          increment: item.quantity
        }
      }
    });
  }
  
  // 7. Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: total * 100, // in paise
    currency: 'INR',
    receipt: orderNumber,
    notes: {
      orderId: order.id,
      businessModel: 'E_COMMERCE'
    }
  });
  
  // 8. Save payment record
  await prisma.payment.create({
    data: {
      orderId: order.id,
      amount: total,
      currency: 'INR',
      paymentMethod: 'CREDIT_CARD',
      status: 'PENDING',
      gatewayId: razorpayOrder.id,
      gatewayData: razorpayOrder
    }
  });
  
  return res.json({
    order,
    razorpayOrderId: razorpayOrder.id
  });
}
```

#### **Backend API - Verify Payment:**

```javascript
POST /api/payment/verify

Request:
{
  orderId: "order_123",
  razorpayPaymentId: "pay_xyz",
  razorpayOrderId: "order_razorpay_abc",
  razorpaySignature: "signature_hash"
}

// Server-side logic:
async function verifyPayment(req, res) {
  const { orderId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  
  // 1. Verify signature
  const crypto = require('crypto');
  const secret = process.env.RAZORPAY_KEY_SECRET;
  
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');
  
  if (generatedSignature !== razorpaySignature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }
  
  // 2. Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'CONFIRMED',
      paymentStatus: 'COMPLETED'
    }
  });
  
  // 3. Update payment record
  await prisma.payment.updateMany({
    where: { orderId },
    data: {
      status: 'COMPLETED',
      gatewayData: {
        paymentId: razorpayPaymentId,
        signature: razorpaySignature
      }
    }
  });
  
  // 4. Clear cart
  await prisma.cartItem.deleteMany({
    where: {
      cart: {
        user: { id: order.userId }
      }
    }
  });
  
  // 5. Update inventory (deduct from quantity, clear reserved)
  const orderItems = await prisma.orderItem.findMany({
    where: { orderId }
  });
  
  for (const item of orderItems) {
    await prisma.inventory.updateMany({
      where: { productId: item.productId },
      data: {
        quantity: { decrement: item.quantity },
        reservedQty: { decrement: item.quantity }
      }
    });
  }
  
  // 6. Send confirmation email
  await sendOrderConfirmationEmail(order);
  
  // 7. Create notification for admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'ORDER_PLACED',
      title: 'New E-Commerce Order',
      message: `Order #${order.orderNumber} placed`,
      link: `/admin/orders/${order.id}`
    }
  });
  
  return res.json({ success: true });
}
```

---

### **PAGE 7: ORDER SUCCESS PAGE**

**URL:** `/orders/[orderId]/success`

#### **UI Elements:**
- Success checkmark animation
- "Order Confirmed!" message
- Order number
- Estimated delivery date
- Order summary (items, address, total)
- "Track Order" button
- "Continue Shopping" button

#### **API Call:**
```javascript
GET /api/orders/order_123

Response:
{
  order: {
    id: "order_123",
    orderNumber: "EC1728563421",
    status: "CONFIRMED",
    paymentStatus: "COMPLETED",
    total: 6048,
    orderDate: "2025-10-10T10:30:00Z",
    estimatedDelivery: "2025-10-15",
    shippingAddress: {...},
    items: [...]
  }
}
```

---

### **PAGE 8: MY ORDERS PAGE**

**URL:** `/account/orders`

#### **UI Elements:**
- Orders list (tabs: All, Pending, Shipped, Delivered, Cancelled)
- Each order card shows:
  - Order number
  - Date
  - Status badge
  - Total amount
  - Product thumbnails
  - "View Details" button
  - "Track Order" button (if shipped)

#### **API Call:**
```javascript
GET /api/orders?status=all&page=1&limit=10

Response:
{
  orders: [
    {
      id: "order_123",
      orderNumber: "EC1728563421",
      orderDate: "2025-10-10T10:30:00Z",
      status: "SHIPPED",
      total: 6048,
      items: [{product: {...}, quantity: 2}],
      trackingNumber: "TRK123456"
    }
  ],
  totalCount: 12,
  page: 1,
  totalPages: 2
}
```

---

### **PAGE 9: ORDER DETAIL & TRACKING**

**URL:** `/orders/[orderId]`

#### **UI Elements:**
- Order header (number, date, status)
- Tracking timeline:
  - Order Placed ✓
  - Payment Confirmed ✓
  - Order Processing ✓
  - Shipped ← (current)
  - Out for Delivery
  - Delivered
- Tracking number & AWB
- "Track on [Shiprocket/Delhivery]" link
- Delivery address
- Order items with images
- Price breakdown
- Invoice download button
- Cancel order button (if status allows)

#### **API Call:**
```javascript
GET /api/orders/order_123/track

Response:
{
  order: {
    id: "order_123",
    orderNumber: "EC1728563421",
    status: "SHIPPED",
    paymentStatus: "COMPLETED",
    trackingNumber: "TRK123456",
    awbNumber: "AWB789012",
    deliveryPartner: "Shiprocket",
    estimatedDelivery: "2025-10-15",
    timeline: [
      {status: "PENDING", timestamp: "2025-10-10T10:30:00Z"},
      {status: "CONFIRMED", timestamp: "2025-10-10T10:35:00Z"},
      {status: "PROCESSING", timestamp: "2025-10-11T09:00:00Z"},
      {status: "SHIPPED", timestamp: "2025-10-12T14:00:00Z", location: "Mumbai Hub"}
    ],
    shippingAddress: {...},
    items: [...],
    subtotal: 5998,
    shipping: 50,
    total: 6048
  }
}
```

---

## 🔄 ADMIN WORKFLOW FOR E-COMMERCE ORDERS

### **ADMIN DASHBOARD - E-COMMERCE PANEL**

**URL:** `/admin/ecommerce`

#### **When New Order Arrives:**

**1. Notification appears:**
```javascript
{
  type: 'ORDER_PLACED',
  title: 'New E-Commerce Order',
  message: 'Order #EC1728563421 received',
  link: '/admin/ecommerce/orders/order_123'
}
```

**2. Admin sees order in pending list:**

**API Call:**
```javascript
GET /api/admin/ecommerce/orders?status=CONFIRMED

Response:
{
  orders: [
    {
      id: "order_123",
      orderNumber: "EC1728563421",
      status: "CONFIRMED",
      customer: {name: "John Doe", phone: "+91-9876543210"},
      items: [{product: "Premium Headphones", quantity: 2}],
      total: 6048,
      orderDate: "2025-10-10T10:30:00Z"
    }
  ]
}
```

**3. Admin clicks order to view details**

**4. Admin checks inventory:**
- Is stock available? (should be, since it was reserved)
- Where is product located? (warehouse location)

**5. Admin assigns delivery partner:**

**UI:**
- "Assign Delivery" button
- Modal opens with:
  - Delivery partner dropdown (Shiprocket, Delhivery)
  - Pickup address selection
  - Product weight input
  - "Create Shipment" button

**API Call:**
```javascript
POST /api/admin/orders/order_123/assign-logistics

Request:
{
  deliveryPartnerId: "dp_shiprocket",
  pickupAddress: {
    address: "Warehouse 1, Mumbai",
    pincode: "400001",
    phone: "+91-9999999999"
  },
  weight: 0.5, // kg
  dimensions: {length: 20, width: 15, height: 10} // cm
}

// Backend creates shipment with Shiprocket:
const shipment = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${shiprocketToken}`
  },
  body: JSON.stringify({
    order_id: order.orderNumber,
    order_date: order.orderDate,
    pickup_location: "Warehouse 1",
    billing_customer_name: customer.name,
    billing_address: shippingAddress.address1,
    billing_city: shippingAddress.city,
    billing_pincode: shippingAddress.zipCode,
    billing_phone: shippingAddress.phone,
    order_items: order.items.map(item => ({
      name: item.product.name,
      sku: item.product.sku,
      units: item.quantity,
      selling_price: item.price
    })),
    payment_method: "Prepaid",
    sub_total: order.subtotal,
    length: 20,
    breadth: 15,
    height: 10,
    weight: 0.5
  })
});

// Update order with tracking info:
await prisma.order.update({
  where: { id: orderId },
  data: {
    status: 'PROCESSING',
    deliveryPartnerId: 'dp_shiprocket',
    trackingNumber: shipment.shipment_id,
    awbNumber: shipment.awb_code
  }
});

Response:
{
  success: true,
  trackingNumber: "TRK123456",
  awbNumber: "AWB789012",
  shipmentId: "12345678"
}
```

**6. Order status changes to "PROCESSING"**

**7. Shiprocket webhook updates status:**

When Shiprocket picks up:
```javascript
POST /api/logistics/webhook

Request (from Shiprocket):
{
  order_id: "EC1728563421",
  shipment_status: "PICKUP_COMPLETE",
  awb: "AWB789012",
  current_status: "IN_TRANSIT"
}

// Backend updates order:
await prisma.order.update({
  where: { orderNumber: orderId },
  data: { status: 'SHIPPED', shippedAt: new Date() }
});

// Notify customer:
await prisma.notification.create({
  data: {
    userId: order.userId,
    type: 'ORDER_SHIPPED',
    title: 'Order Shipped!',
    message: `Your order #${order.orderNumber} is on the way`,
    link: `/orders/${order.id}`
  }
});

// Send email:
await sendShipmentEmail(order);
```

**8. When delivered:**
```javascript
// Shiprocket webhook:
POST /api/logistics/webhook

Request:
{
  order_id: "EC1728563421",
  shipment_status: "DELIVERED",
  awb: "AWB789012",
  delivered_date: "2025-10-14"
}

// Backend updates:
await prisma.order.update({
  where: { orderNumber: orderId },
  data: { 
    status: 'DELIVERED',
    deliveredAt: new Date()
  }
});

// Notify customer:
await prisma.notification.create({
  data: {
    userId: order.userId,
    type: 'ORDER_DELIVERED',
    title: 'Order Delivered!',
    message: `Your order #${order.orderNumber} has been delivered`,
    link: `/orders/${order.id}`
  }
});
```

---

## 📊 E-COMMERCE ANALYTICS

### **Admin Dashboard Metrics:**

**API Call:**
```javascript
GET /api/admin/analytics/ecommerce?period=month

Response:
{
  revenue: {
    current: 125000,
    previous: 98000,
    growth: 27.5 // %
  },
  orders: {
    total: 145,
    pending: 12,
    processing: 8,
    shipped: 15,
    delivered: 105,
    cancelled: 5
  },
  topProducts: [
    {name: "Premium Headphones", units: 45, revenue: 134550},
    {name: "Wireless Mouse", units: 67, revenue: 100500}
  ],
  inventory: {
    lowStock: 8, // products below min level
    outOfStock: 2
  },
  averageOrderValue: 862,
  fulfillmentRate: 98.5, // %
  deliveryTime: 3.2 // days average
}
```

---

## 💾 COMPLETE DATABASE FLOW

### **Order Lifecycle in Database:**

```sql
-- 1. User adds to cart
INSERT INTO cart_items (cart_id, product_id, quantity, price)

-- 2. User proceeds to checkout, order created
INSERT INTO orders (
  order_number, user_id, business_model, 
  subtotal, shipping, total, 
  status, payment_status,
  shipping_address, billing_address
)

-- 3. Order items created
INSERT INTO order_items (order_id, product_id, quantity, price)

-- 4. Inventory reserved
UPDATE inventory SET reserved_qty = reserved_qty + 2 WHERE product_id = 'prod_123'

-- 5. Payment created
INSERT INTO payments (order_id, amount, payment_method, status, gateway_id)

-- 6. Payment verified
UPDATE orders SET status = 'CONFIRMED', payment_status = 'COMPLETED'
UPDATE payments SET status = 'COMPLETED'

-- 7. Inventory deducted
UPDATE inventory 
SET quantity = quantity - 2, reserved_qty = reserved_qty - 2
WHERE product_id = 'prod_123'

-- 8. Cart cleared
DELETE FROM cart_items WHERE cart_id = 'cart_456'

-- 9. Admin assigns delivery
UPDATE orders 
SET status = 'PROCESSING', delivery_partner_id = 'dp_shiprocket',
    tracking_number = 'TRK123', awb_number = 'AWB789'

-- 10. Order shipped
UPDATE orders SET status = 'SHIPPED', shipped_at = NOW()

-- 11. Order delivered
UPDATE orders SET status = 'DELIVERED', delivered_at = NOW()
```

---

## 🔍 KEY QUERIES FOR E-COMMERCE

### **Check Product Availability:**
```javascript
const available = await prisma.inventory.findFirst({
  where: { productId: 'prod_123' },
  select: {
    quantity: true,
    reservedQty: true
  }
});

const availableStock = available.quantity - available.reservedQty;
```

### **Get E-Commerce Revenue:**
```javascript
const revenue = await prisma.order.aggregate({
  where: {
    businessModel: 'E_COMMERCE',
    paymentStatus: 'COMPLETED',
    createdAt: {
      gte: startOfMonth,
      lte: endOfMonth
    }
  },
  _sum: { total: true },
  _count: true
});
```

### **Low Stock Alert:**
```javascript
const lowStock = await prisma.inventory.findMany({
  where: {
    product: {
      businessModel: 'E_COMMERCE',
      isActive: true
    },
    quantity: {
      lte: prisma.inventory.fields.minStockLevel
    }
  },
  include: { product: true }
});
```

---

## ✅ E-COMMERCE CHECKLIST

**Customer Flow:**
- [x] Browse products
- [x] View product details
- [x] Add to cart
- [x] Checkout
- [x] Payment
- [x] Order confirmation
- [x] Track order

**Admin Flow:**
- [x] View new orders
- [x] Check inventory
- [x] Assign delivery partner
- [x] Track fulfillment
- [x] View analytics

**Technical:**
- [x] Product APIs
- [x] Cart APIs
- [x] Order creation
- [x] Payment integration
- [x] Inventory management
- [x] Logistics integration
- [x] Webhooks handling
- [x] Email notifications

---

**END OF PART 1 - E-COMMERCE FLOW**

**Next:** [COMPLETEFLOW_2_B2C.md](./COMPLETEFLOW_2_B2C.md) - B2C/Vendor Flow

# 🏪 COMPLETE FLOW - B2C (Business-to-Consumer / Vendor Model)

> **Part 2 of 5** - Detailed flow for vendor registration, product management, and commission-based sales  
> Last Updated: October 10, 2025

---

## 📋 OVERVIEW

**B2C/Vendor Model:** Third-party vendors sell products through Grap Deal platform. Grap Deal charges commission on each sale.

**Key Characteristics:**
- ✅ Vendors own and manage their inventory
- ✅ Vendor uploads products to platform
- ✅ Grap Deal takes commission (e.g., 10-15%)
- ✅ Vendor handles fulfillment (ships directly or via platform logistics)
- ✅ Periodic payouts to vendors (weekly/monthly)
- ✅ KYC verification required

**Revenue Model:**
- Commission on each sale
- Vendor pays commission from sale amount
- Example: Product sold for ₹1000 → Vendor receives ₹850 (15% commission)

---

## 🎯 VENDOR JOURNEY MAP

```
Registration → KYC Submit → Admin Approval → Dashboard Access 
  → Add Products → Product Approval → Listed on Platform 
  → Customer Orders → Vendor Ships → Payment Settlement
```

---

## 📄 DETAILED PAGE-BY-PAGE FLOW

---

### **PHASE 1: VENDOR REGISTRATION & ONBOARDING**

---

### **PAGE 1: VENDOR REGISTRATION FORM**

**URL:** `/vendor/apply`

#### **UI Elements:**
- Hero section: "Sell on Grap Deal"
- Benefits section:
  - Reach millions of customers
  - Easy onboarding
  - Secure payments
  - 24/7 support
- Registration form (multi-step):
  - **Step 1:** Basic Info
  - **Step 2:** Business Details
  - **Step 3:** Bank Details
  - **Step 4:** Document Upload (KYC)

#### **Step 1: Basic Information**

**Form Fields:**
```javascript
{
  firstName: "John",
  lastName: "Seller",
  email: "john@example.com",
  phone: "+91-9876543210",
  password: "********",
  confirmPassword: "********"
}
```

#### **Step 2: Business Details**

**Form Fields:**
```javascript
{
  businessName: "John's Electronics",
  businessType: "INDIVIDUAL" | "PROPRIETORSHIP" | "PARTNERSHIP" | "PVT_LTD" | "LLP",
  gstin: "27XXXXX1234X1ZX", // optional for individuals
  panNumber: "ABCDE1234F",
  businessAddress: {
    address1: "Shop 123, Market Road",
    address2: "Near City Mall",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India"
  },
  businessCategory: "Electronics", // dropdown
  pickupAddress: {
    // Same as business or different
    isSameAsBusiness: true,
    address: {...}
  }
}
```

#### **Step 3: Bank Details**

**Form Fields:**
```javascript
{
  accountHolderName: "John Seller",
  accountNumber: "123456789012",
  ifscCode: "HDFC0001234",
  bankName: "HDFC Bank",
  branchName: "Mumbai Main",
  accountType: "SAVINGS" | "CURRENT"
}
```

#### **Step 4: KYC Documents**

**Upload Fields:**
- PAN Card (mandatory)
- Aadhaar Card (mandatory)
- GST Certificate (if registered)
- Business License (if applicable)
- Cancelled Cheque (for bank verification)

**API Call - Submit Application:**
```javascript
POST /api/vendor/apply

Request (multipart/form-data):
{
  // Step 1
  firstName: "John",
  lastName: "Seller",
  email: "john@example.com",
  phone: "+91-9876543210",
  password: "hashed_password",
  
  // Step 2
  businessName: "John's Electronics",
  businessType: "PROPRIETORSHIP",
  gstin: "27XXXXX1234X1ZX",
  panNumber: "ABCDE1234F",
  businessAddress: {...},
  pickupAddress: {...},
  businessCategory: "Electronics",
  
  // Step 3
  bankDetails: {
    accountHolderName: "John Seller",
    accountNumber: "123456789012",
    ifscCode: "HDFC0001234",
    bankName: "HDFC Bank",
    branchName: "Mumbai Main",
    accountType: "SAVINGS"
  },
  
  // Step 4 (files)
  panCard: File,
  aadhaarCard: File,
  gstCertificate: File,
  businessLicense: File,
  cancelledCheque: File
}

// Backend processing:
async function handleVendorApplication(req, res) {
  const formData = req.body;
  const files = req.files;
  
  // 1. Create user account
  const hashedPassword = await bcrypt.hash(formData.password, 10);
  
  const user = await prisma.user.create({
    data: {
      email: formData.email,
      password: hashedPassword,
      name: `${formData.firstName} ${formData.lastName}`,
      phone: formData.phone,
      role: 'VENDOR', // important!
      isActive: false, // until approved
      emailVerified: false
    }
  });
  
  // 2. Upload documents to local storage
  const panCardUrl = await uploadImageLocally(files.panCard, 'kyc');
  const aadhaarUrl = await uploadImageLocally(files.aadhaarCard, 'kyc');
  const gstUrl = files.gstCertificate ? 
    await uploadImageLocally(files.gstCertificate, 'kyc') : null;
  
  // 3. Create vendor profile
  const vendor = await prisma.vendorProfile.create({
    data: {
      userId: user.id,
      businessName: formData.businessName,
      businessType: formData.businessType,
      gstin: formData.gstin,
      panNumber: formData.panNumber,
      businessAddress: formData.businessAddress,
      pickupAddress: formData.pickupAddress,
      businessCategory: formData.businessCategory,
      status: 'PENDING', // Awaiting admin approval
      commissionRate: 15, // Default, admin can modify
      bankDetails: formData.bankDetails
    }
  });
  
  // 4. Create KYC records
  await prisma.kYCDocument.createMany({
    data: [
      {
        userId: user.id,
        documentType: 'PAN_CARD',
        documentNumber: formData.panNumber,
        documentUrl: panCardUrl,
        status: 'PENDING'
      },
      {
        userId: user.id,
        documentType: 'AADHAAR_CARD',
        documentUrl: aadhaarUrl,
        status: 'PENDING'
      },
      gstUrl ? {
        userId: user.id,
        documentType: 'GST_CERTIFICATE',
        documentNumber: formData.gstin,
        documentUrl: gstUrl,
        status: 'PENDING'
      } : null
    ].filter(Boolean)
  });
  
  // 5. Create notification for admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'VENDOR_APPLICATION',
      title: 'New Vendor Application',
      message: `${formData.businessName} has applied to become a vendor`,
      link: `/admin/vendors/applications/${vendor.id}`
    }
  });
  
  // 6. Send verification email
  const verificationToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);
  await sendEmailVerification(user.email, verificationToken);
  
  return res.json({
    success: true,
    message: 'Application submitted successfully. We will review and get back to you within 24-48 hours.',
    applicationId: vendor.id
  });
}

Response:
{
  success: true,
  message: "Application submitted successfully...",
  applicationId: "vendor_123"
}
```

---

### **PAGE 2: APPLICATION SUBMITTED (CONFIRMATION)**

**URL:** `/vendor/application-submitted`

#### **UI Elements:**
- Success animation
- "Application Submitted!" message
- Timeline showing:
  - ✅ Application Received
  - ⏳ Under Review (24-48 hours)
  - ⏳ KYC Verification
  - ⏳ Approval
- "Check Status" button
- Contact support link

---

### **ADMIN SIDE: VENDOR APPLICATION REVIEW**

**URL:** `/admin/vendors/applications`

#### **Admin Views Application:**

**API Call:**
```javascript
GET /api/admin/vendor-applications?status=PENDING

Response:
{
  applications: [
    {
      id: "vendor_123",
      businessName: "John's Electronics",
      applicantName: "John Seller",
      email: "john@example.com",
      phone: "+91-9876543210",
      businessType: "PROPRIETORSHIP",
      category: "Electronics",
      appliedDate: "2025-10-10T10:00:00Z",
      status: "PENDING"
    }
  ]
}
```

#### **Admin Clicks to View Details:**

**API Call:**
```javascript
GET /api/admin/vendor-applications/vendor_123

Response:
{
  vendor: {
    id: "vendor_123",
    user: {
      id: "user_456",
      name: "John Seller",
      email: "john@example.com",
      phone: "+91-9876543210"
    },
    businessName: "John's Electronics",
    businessType: "PROPRIETORSHIP",
    gstin: "27XXXXX1234X1ZX",
    panNumber: "ABCDE1234F",
    businessAddress: {...},
    pickupAddress: {...},
    businessCategory: "Electronics",
    bankDetails: {
      accountHolderName: "John Seller",
      accountNumber: "123456789012",
      ifscCode: "HDFC0001234",
      bankName: "HDFC Bank"
    },
    kycDocuments: [
      {
        id: "kyc_1",
        documentType: "PAN_CARD",
        documentNumber: "ABCDE1234F",
        documentUrl: "/uploads/kyc/pan_123.jpg",
        status: "PENDING"
      },
      {
        id: "kyc_2",
        documentType: "AADHAAR_CARD",
        documentUrl: "/uploads/kyc/aadhaar_123.jpg",
        status: "PENDING"
      }
    ],
    status: "PENDING",
    commissionRate: 15
  }
}
```

#### **Admin Actions:**
1. Reviews business details
2. Verifies PAN number (external API if available)
3. Checks GST number (GST portal)
4. Views uploaded documents
5. Verifies bank account (penny drop test optional)

#### **Admin Approves/Rejects:**

**API Call - Approve:**
```javascript
PUT /api/admin/vendor-applications/vendor_123/approve

Request:
{
  status: "APPROVED",
  commissionRate: 15, // Admin can modify
  notes: "All documents verified. Approved."
}

// Backend:
async function approveVendor(req, res) {
  const { vendorId } = req.params;
  const { commissionRate, notes } = req.body;
  
  // 1. Update vendor status
  const vendor = await prisma.vendorProfile.update({
    where: { id: vendorId },
    data: {
      status: 'APPROVED',
      commissionRate,
      approvedAt: new Date(),
      approvedBy: req.user.id
    },
    include: { user: true }
  });
  
  // 2. Update KYC documents
  await prisma.kYCDocument.updateMany({
    where: { userId: vendor.userId },
    data: { status: 'APPROVED' }
  });
  
  // 3. Activate user account
  await prisma.user.update({
    where: { id: vendor.userId },
    data: { isActive: true }
  });
  
  // 4. Create vendor dashboard access notification
  await prisma.notification.create({
    data: {
      userId: vendor.userId,
      type: 'VENDOR_APPROVED',
      title: 'Vendor Account Approved!',
      message: 'Congratulations! Your vendor account has been approved. You can now start listing products.',
      link: '/vendor/dashboard'
    }
  });
  
  // 5. Send approval email
  await sendVendorApprovalEmail(vendor.user.email, {
    businessName: vendor.businessName,
    loginUrl: 'https://grapdeal.com/login',
    dashboardUrl: 'https://grapdeal.com/vendor/dashboard'
  });
  
  return res.json({ success: true });
}

Response:
{
  success: true,
  message: "Vendor approved successfully"
}
```

**API Call - Reject:**
```javascript
PUT /api/admin/vendor-applications/vendor_123/reject

Request:
{
  status: "REJECTED",
  rejectionReason: "Invalid GST number. Please reapply with correct details."
}

// Backend:
async function rejectVendor(req, res) {
  const { vendorId } = req.params;
  const { rejectionReason } = req.body;
  
  const vendor = await prisma.vendorProfile.update({
    where: { id: vendorId },
    data: {
      status: 'REJECTED',
      rejectionReason
    },
    include: { user: true }
  });
  
  // Notify vendor
  await prisma.notification.create({
    data: {
      userId: vendor.userId,
      type: 'VENDOR_REJECTED',
      title: 'Application Not Approved',
      message: rejectionReason,
      link: '/vendor/reapply'
    }
  });
  
  // Send rejection email
  await sendVendorRejectionEmail(vendor.user.email, {
    businessName: vendor.businessName,
    reason: rejectionReason,
    reapplyUrl: 'https://grapdeal.com/vendor/reapply'
  });
  
  return res.json({ success: true });
}
```

---

### **PHASE 2: VENDOR DASHBOARD & PRODUCT MANAGEMENT**

---

### **PAGE 3: VENDOR DASHBOARD**

**URL:** `/vendor/dashboard`

**Access Control:**
```javascript
// Middleware check
if (user.role !== 'VENDOR') {
  return redirect('/');
}

if (!user.isActive) {
  return redirect('/vendor/pending-approval');
}
```

#### **UI Elements:**
- Header: "Welcome back, John's Electronics"
- Stats cards:
  - Total Products (active)
  - Total Orders
  - Pending Orders
  - Total Revenue
  - Available Balance (for payout)
- Quick actions:
  - Add New Product
  - View Orders
  - Request Payout
- Recent orders table
- Low stock alerts
- Chart: Sales over time

#### **API Call:**
```javascript
GET /api/vendor/dashboard/stats

Response:
{
  stats: {
    totalProducts: 24,
    activeProducts: 20,
    pendingProducts: 2,
    rejectedProducts: 2,
    totalOrders: 156,
    pendingOrders: 8,
    shippedOrders: 12,
    deliveredOrders: 136,
    totalRevenue: 345600, // After commission
    availableBalance: 12000, // Settled but not paid out
    pendingRevenue: 8500 // Orders not yet delivered
  },
  recentOrders: [
    {
      id: "order_789",
      orderNumber: "B2C1728563500",
      customer: "Jane Doe",
      items: [{product: "Wireless Mouse", quantity: 1}],
      total: 850,
      vendorEarnings: 722.5, // After 15% commission
      status: "PENDING",
      orderDate: "2025-10-10T14:00:00Z"
    }
  ],
  lowStockProducts: [
    {
      id: "prod_999",
      name: "Wireless Mouse",
      currentStock: 3,
      minStock: 10
    }
  ]
}
```

---

### **PAGE 4: ADD PRODUCT (VENDOR)**

**URL:** `/vendor/products/add`

#### **UI Elements:**
- Multi-step form:
  - **Step 1:** Basic Info
  - **Step 2:** Pricing & Inventory
  - **Step 3:** Images
  - **Step 4:** Specifications

#### **Step 1: Basic Information**

```javascript
{
  name: "Wireless Gaming Mouse",
  slug: "wireless-gaming-mouse-v2", // Auto-generated, editable
  category: "Electronics > Computer Accessories", // Nested dropdown
  description: "High-precision gaming mouse with RGB lighting...",
  shortDescription: "RGB gaming mouse with 6 buttons",
  sku: "VENDOR-MOUSE-001", // Vendor's internal SKU
  brandName: "TechPro",
  modelNumber: "TP-WM-100"
}
```

#### **Step 2: Pricing & Inventory**

```javascript
{
  basePrice: 1299, // Selling price
  comparePrice: 1999, // MRP/Compare at price
  costPrice: 800, // Vendor's cost (for admin analytics)
  taxRate: 18, // GST %
  hsn: "84713000", // HSN code for GST
  
  // Inventory
  quantity: 50,
  minStockLevel: 10,
  maxOrderQuantity: 5, // Per order limit
  
  // Shipping
  weight: 0.2, // kg
  dimensions: {
    length: 15,
    width: 10,
    height: 5
  },
  packageType: "BOX" | "POLYBAG" | "ENVELOPE"
}
```

#### **Step 3: Images**

```javascript
{
  images: [
    File, // Primary image (required)
    File, // Additional
    File  // Additional
  ]
  // Max 5 images
}
```

#### **Step 4: Specifications (Dynamic)**

```javascript
{
  specifications: [
    {key: "DPI", value: "16000"},
    {key: "Buttons", value: "6"},
    {key: "Connectivity", value: "Wireless 2.4GHz"},
    {key: "Battery", value: "Rechargeable Li-ion"},
    {key: "Color", value: "Black"}
  ],
  
  features: [
    "RGB lighting with 16 million colors",
    "Programmable buttons",
    "Ergonomic design",
    "Compatible with Windows and Mac"
  ]
}
```

#### **API Call - Submit Product:**

```javascript
POST /api/vendor/products

Request (multipart/form-data):
{
  // Step 1
  name: "Wireless Gaming Mouse",
  slug: "wireless-gaming-mouse-v2",
  categoryId: "cat_electronics_accessories",
  description: "High-precision gaming mouse...",
  shortDescription: "RGB gaming mouse",
  sku: "VENDOR-MOUSE-001",
  brandName: "TechPro",
  
  // Step 2
  basePrice: 1299,
  comparePrice: 1999,
  costPrice: 800,
  taxRate: 18,
  hsn: "84713000",
  quantity: 50,
  minStockLevel: 10,
  maxOrderQuantity: 5,
  weight: 0.2,
  dimensions: {length: 15, width: 10, height: 5},
  
  // Step 3
  images: [File, File, File],
  
  // Step 4
  specifications: JSON.stringify([...]),
  features: JSON.stringify([...])
}

// Backend:
async function createVendorProduct(req, res) {
  const { userId } = req.user; // From JWT
  const formData = req.body;
  const files = req.files;
  
  // 1. Get vendor profile
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });
  
  if (vendor.status !== 'APPROVED') {
    return res.status(403).json({ error: 'Vendor not approved' });
  }
  
  // 2. Upload images
  const imageUrls = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImageLocally(files[i], 'products');
    imageUrls.push({
      url,
      isPrimary: i === 0, // First image is primary
      altText: formData.name
    });
  }
  
  // 3. Create product
  const product = await prisma.product.create({
    data: {
      name: formData.name,
      slug: formData.slug,
      categoryId: formData.categoryId,
      description: formData.description,
      shortDescription: formData.shortDescription,
      sku: formData.sku,
      brandName: formData.brandName,
      modelNumber: formData.modelNumber,
      
      basePrice: parseFloat(formData.basePrice),
      comparePrice: parseFloat(formData.comparePrice),
      costPrice: parseFloat(formData.costPrice),
      taxRate: parseFloat(formData.taxRate),
      hsn: formData.hsn,
      
      weight: parseFloat(formData.weight),
      dimensions: formData.dimensions,
      packageType: formData.packageType,
      maxOrderQuantity: parseInt(formData.maxOrderQuantity),
      
      specifications: JSON.parse(formData.specifications),
      features: JSON.parse(formData.features),
      
      businessModel: 'B2C',
      vendorId: vendor.id,
      
      status: 'PENDING', // Needs admin approval
      isActive: false,
      
      images: {
        create: imageUrls
      },
      
      inventory: {
        create: {
          quantity: parseInt(formData.quantity),
          minStockLevel: parseInt(formData.minStockLevel),
          reservedQty: 0
        }
      }
    }
  });
  
  // 4. Notify admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'PRODUCT_SUBMITTED',
      title: 'New Product for Review',
      message: `${vendor.businessName} submitted "${formData.name}" for approval`,
      link: `/admin/products/pending/${product.id}`
    }
  });
  
  return res.json({
    success: true,
    product: product
  });
}

Response:
{
  success: true,
  product: {
    id: "prod_new_123",
    name: "Wireless Gaming Mouse",
    status: "PENDING",
    message: "Product submitted for admin approval. You'll be notified once approved."
  }
}
```

---

### **ADMIN SIDE: PRODUCT APPROVAL**

**URL:** `/admin/b2c/products/pending`

#### **Admin Reviews Product:**

**API Call:**
```javascript
GET /api/admin/products?businessModel=B2C&status=PENDING

Response:
{
  products: [
    {
      id: "prod_new_123",
      name: "Wireless Gaming Mouse",
      vendor: {businessName: "John's Electronics"},
      basePrice: 1299,
      images: [{url: "...", isPrimary: true}],
      submittedAt: "2025-10-10T15:00:00Z"
    }
  ]
}
```

#### **Admin Approves/Rejects:**

**API Call - Approve:**
```javascript
PUT /api/admin/products/prod_new_123/approve

Request:
{
  status: "APPROVED",
  isFeatured: false, // Admin can feature product
  notes: "Product approved. Good listing."
}

// Backend:
await prisma.product.update({
  where: { id: productId },
  data: {
    status: 'ACTIVE',
    isActive: true,
    approvedAt: new Date(),
    approvedBy: adminId
  }
});

// Notify vendor
await prisma.notification.create({
  data: {
    userId: vendor.userId,
    type: 'PRODUCT_APPROVED',
    title: 'Product Approved!',
    message: `Your product "${product.name}" is now live on the platform.`,
    link: `/vendor/products/${product.id}`
  }
});

Response:
{
  success: true
}
```

---

### **PHASE 3: B2C ORDER FLOW (CUSTOMER SIDE)**

**Customer Flow (same as E-Commerce):**
1. Customer browses products (E-Commerce + B2C together)
2. Adds B2C product to cart
3. Proceeds to checkout
4. Makes payment

**API Call - Filter shows both:**
```javascript
GET /api/products?businessModel=E_COMMERCE,B2C

// Returns products from both Grap Deal and vendors
```

---

### **PHASE 4: B2C ORDER HANDLING (VENDOR SIDE)**

---

### **PAGE 5: VENDOR ORDERS PAGE**

**URL:** `/vendor/orders`

#### **When Customer Places Order with B2C Product:**

**Backend (after payment confirmed):**
```javascript
// In payment verification:
const orderItems = await prisma.orderItem.findMany({
  where: { orderId },
  include: { product: { include: { vendor: true } } }
});

// For each item, notify vendor
for (const item of orderItems) {
  if (item.product.businessModel === 'B2C') {
    await prisma.notification.create({
      data: {
        userId: item.product.vendor.userId,
        type: 'NEW_ORDER',
        title: 'New Order Received!',
        message: `Order #${order.orderNumber} - ${item.product.name} x${item.quantity}`,
        link: `/vendor/orders/${order.id}`
      }
    });
  }
}
```

#### **Vendor Views Orders:**

**API Call:**
```javascript
GET /api/vendor/orders?status=PENDING

Response:
{
  orders: [
    {
      id: "order_789",
      orderNumber: "B2C1728563500",
      orderDate: "2025-10-10T14:00:00Z",
      customer: {
        name: "Jane Doe",
        phone: "+91-9988776655"
      },
      items: [
        {
          product: {
            id: "prod_123",
            name: "Wireless Gaming Mouse",
            sku: "VENDOR-MOUSE-001"
          },
          quantity: 2,
          price: 1299
        }
      ],
      subtotal: 2598,
      platformCommission: 389.7, // 15%
      vendorEarnings: 2208.3, // 85%
      shippingAddress: {
        name: "Jane Doe",
        address: "456 Park Avenue",
        city: "Delhi",
        state: "Delhi",
        zipCode: "110001",
        phone: "+91-9988776655"
      },
      status: "CONFIRMED", // Payment done, waiting for vendor to ship
      paymentStatus: "COMPLETED"
    }
  ]
}
```

#### **Vendor Actions:**

**1. View Order Details**
- Click order to see full details
- Print packing slip
- Print shipping label

**2. Mark as Ready to Ship**

**API Call:**
```javascript
PUT /api/vendor/orders/order_789/ready-to-ship

Request:
{
  awbNumber: "AWB123456789", // If vendor using own logistics
  trackingUrl: "https://vendor-logistics.com/track/AWB123456789"
}

// Backend:
await prisma.order.update({
  where: { id: orderId },
  data: {
    status: 'PROCESSING',
    awbNumber: req.body.awbNumber,
    trackingUrl: req.body.trackingUrl
  }
});

// Notify customer
await prisma.notification.create({
  data: {
    userId: order.userId,
    type: 'ORDER_PROCESSING',
    title: 'Your order is being prepared',
    message: `Order #${order.orderNumber} is being prepared for shipment`,
    link: `/orders/${order.id}`
  }
});
```

**3. Ship Order**

**Option A: Vendor uses platform logistics (Shiprocket/Delhivery)**

```javascript
POST /api/vendor/orders/order_789/ship-via-platform

Request:
{
  pickupLocation: "Warehouse 1", // Vendor's saved location
  weight: 0.2,
  dimensions: {length: 15, width: 10, height: 5}
}

// Backend creates shipment:
const shipment = await fetch('https://apiv2.shiprocket.in/v1/external/orders/create', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${shiprocketToken}`
  },
  body: JSON.stringify({
    order_id: order.orderNumber,
    order_date: order.orderDate,
    pickup_location: req.body.pickupLocation,
    channel_id: "",
    billing_customer_name: customer.name,
    billing_address: shippingAddress.address,
    billing_city: shippingAddress.city,
    billing_pincode: shippingAddress.zipCode,
    billing_phone: customer.phone,
    order_items: [{
      name: product.name,
      sku: product.sku,
      units: quantity,
      selling_price: price
    }],
    payment_method: "Prepaid",
    sub_total: order.subtotal,
    length: dimensions.length,
    breadth: dimensions.width,
    height: dimensions.height,
    weight: weight
  })
});

// Update order:
await prisma.order.update({
  where: { id: orderId },
  data: {
    status: 'SHIPPED',
    shippedAt: new Date(),
    trackingNumber: shipment.shipment_id,
    awbNumber: shipment.awb_code,
    deliveryPartner: 'Shiprocket'
  }
});

// Shipping charges added to vendor settlement:
await prisma.vendorPayout.upsert({
  where: { vendorId_orderid: { vendorId, orderId } },
  update: {
    shippingCharges: shipment.charges
  },
  create: {
    vendorId,
    orderId,
    orderAmount: order.subtotal,
    commission: order.platformCommission,
    shippingCharges: shipment.charges,
    netAmount: order.vendorEarnings - shipment.charges,
    status: 'PENDING'
  }
});
```

**Option B: Vendor ships via own logistics**

```javascript
POST /api/vendor/orders/order_789/ship

Request:
{
  courierName: "Blue Dart",
  awbNumber: "BD123456789",
  trackingUrl: "https://bluedart.com/track/BD123456789",
  expectedDelivery: "2025-10-15"
}

// Backend:
await prisma.order.update({
  where: { id: orderId },
  data: {
    status: 'SHIPPED',
    shippedAt: new Date(),
    awbNumber: req.body.awbNumber,
    trackingUrl: req.body.trackingUrl,
    deliveryPartner: req.body.courierName
  }
});
```

**4. Order Delivered (webhook from logistics partner)**

```javascript
// Shiprocket/Vendor webhook:
POST /api/vendor/webhooks/delivery

Request:
{
  orderNumber: "B2C1728563500",
  status: "DELIVERED",
  deliveredDate: "2025-10-14T18:30:00Z"
}

// Backend:
const order = await prisma.order.update({
  where: { orderNumber },
  data: {
    status: 'DELIVERED',
    deliveredAt: new Date()
  },
  include: { items: { include: { product: { include: { vendor: true } } } } }
});

// Mark vendor payout as ready to settle
await prisma.vendorPayout.updateMany({
  where: { orderId: order.id },
  data: {
    status: 'READY_TO_SETTLE',
    deliveredAt: new Date()
  }
});

// Notify customer
await prisma.notification.create({
  data: {
    userId: order.userId,
    type: 'ORDER_DELIVERED',
    title: 'Order Delivered!',
    message: `Your order #${order.orderNumber} has been delivered`,
    link: `/orders/${order.id}`
  }
});

// Notify vendor
for (const item of order.items) {
  if (item.product.businessModel === 'B2C') {
    await prisma.notification.create({
      data: {
        userId: item.product.vendor.userId,
        type: 'ORDER_COMPLETED',
        title: 'Order Completed',
        message: `Order #${order.orderNumber} delivered. Payment will be settled soon.`,
        link: `/vendor/payouts`
      }
    });
  }
}
```

---

### **PHASE 5: VENDOR PAYOUT & SETTLEMENT**

---

### **PAGE 6: VENDOR PAYOUTS**

**URL:** `/vendor/payouts`

#### **UI Elements:**
- Available balance card
- "Request Payout" button
- Payout history table:
  - Date
  - Amount
  - Status (Pending, Processed, Paid)
  - UTR Number
- Order-wise settlement details

#### **How Payouts Work:**

**Payout Cycle:** Weekly/Monthly (configurable by admin)

**Payout Logic:**
```javascript
// For each delivered order:
vendorEarnings = orderAmount - platformCommission - shippingCharges(if platform logistics)

// Example:
orderAmount = ₹2598
platformCommission = ₹389.7 (15%)
shippingCharges = ₹50 (if using platform logistics)
vendorEarnings = ₹2598 - ₹389.7 - ₹50 = ₹2158.3
```

#### **Vendor Views Available Balance:**

**API Call:**
```javascript
GET /api/vendor/payouts/summary

Response:
{
  availableBalance: 12450.50, // Orders delivered, ready to pay
  pendingRevenue: 8500, // Orders shipped but not delivered yet
  totalPaid: 245600, // All-time paid amount
  
  readyOrders: [
    {
      orderId: "order_789",
      orderNumber: "B2C1728563500",
      deliveredDate: "2025-10-05",
      orderAmount: 2598,
      commission: 389.7,
      shippingCharges: 50,
      netAmount: 2158.3,
      status: "READY_TO_SETTLE"
    }
  ],
  
  pendingOrders: [
    {
      orderId: "order_790",
      orderNumber: "B2C1728563501",
      shippedDate: "2025-10-08",
      status: "SHIPPED",
      expectedSettlement: "After delivery"
    }
  ]
}
```

#### **Vendor Requests Payout:**

**API Call:**
```javascript
POST /api/vendor/payouts/request

Request:
{
  amount: 12450.50 // Available balance
}

// Backend:
async function createPayoutRequest(req, res) {
  const { userId } = req.user;
  const { amount } = req.body;
  
  const vendor = await prisma.vendorProfile.findUnique({
    where: { userId }
  });
  
  // 1. Get all ready-to-settle orders
  const readyPayouts = await prisma.vendorPayout.findMany({
    where: {
      vendorId: vendor.id,
      status: 'READY_TO_SETTLE'
    }
  });
  
  const totalAvailable = readyPayouts.reduce((sum, p) => sum + p.netAmount, 0);
  
  if (amount > totalAvailable) {
    return res.status(400).json({ error: 'Insufficient balance' });
  }
  
  // 2. Create payout request
  const payoutRequest = await prisma.payoutRequest.create({
    data: {
      vendorId: vendor.id,
      amount,
      status: 'PENDING',
      bankDetails: vendor.bankDetails,
      requestedAt: new Date()
    }
  });
  
  // 3. Mark individual payouts as requested
  await prisma.vendorPayout.updateMany({
    where: {
      vendorId: vendor.id,
      status: 'READY_TO_SETTLE'
    },
    data: {
      payoutRequestId: payoutRequest.id,
      status: 'PAYOUT_REQUESTED'
    }
  });
  
  // 4. Notify admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'PAYOUT_REQUEST',
      title: 'Vendor Payout Request',
      message: `${vendor.businessName} requested payout of ₹${amount}`,
      link: `/admin/payouts/${payoutRequest.id}`
    }
  });
  
  return res.json({
    success: true,
    payoutRequestId: payoutRequest.id
  });
}

Response:
{
  success: true,
  message: "Payout request submitted. It will be processed within 2-3 business days.",
  payoutRequestId: "payout_req_123"
}
```

---

### **ADMIN SIDE: PROCESS PAYOUTS**

**URL:** `/admin/b2c/payouts`

#### **Admin Views Payout Requests:**

**API Call:**
```javascript
GET /api/admin/payouts?status=PENDING

Response:
{
  payoutRequests: [
    {
      id: "payout_req_123",
      vendor: {
        id: "vendor_123",
        businessName: "John's Electronics",
        userId: "user_456"
      },
      amount: 12450.50,
      orderCount: 15, // Number of orders in this payout
      bankDetails: {
        accountHolderName: "John Seller",
        accountNumber: "123456789012",
        ifscCode: "HDFC0001234",
        bankName: "HDFC Bank"
      },
      requestedAt: "2025-10-10T10:00:00Z",
      status: "PENDING"
    }
  ]
}
```

#### **Admin Verifies & Processes:**

**Steps:**
1. Verify order details
2. Check bank account details
3. Process payment via:
   - Bank transfer (manual)
   - Payment gateway (Razorpay Payout API)
   - Bulk payout (for multiple vendors)

**API Call - Process Payout:**
```javascript
PUT /api/admin/payouts/payout_req_123/process

Request:
{
  status: "PROCESSED",
  utrNumber: "UTR123456789", // Bank transaction reference
  processedBy: "admin_user_id",
  notes: "Payment processed via NEFT"
}

// Backend:
async function processPayout(req, res) {
  const { payoutRequestId } = req.params;
  const { utrNumber, notes } = req.body;
  
  // 1. Update payout request
  const payoutRequest = await prisma.payoutRequest.update({
    where: { id: payoutRequestId },
    data: {
      status: 'PROCESSED',
      processedAt: new Date(),
      processedBy: req.user.id,
      utrNumber,
      notes
    },
    include: { vendor: true }
  });
  
  // 2. Update individual order payouts
  await prisma.vendorPayout.updateMany({
    where: { payoutRequestId },
    data: {
      status: 'PAID',
      paidAt: new Date(),
      utrNumber
    }
  });
  
  // 3. Notify vendor
  await prisma.notification.create({
    data: {
      userId: payoutRequest.vendor.userId,
      type: 'PAYOUT_COMPLETED',
      title: 'Payout Processed!',
      message: `Your payout of ₹${payoutRequest.amount} has been processed. UTR: ${utrNumber}`,
      link: '/vendor/payouts'
    }
  });
  
  // 4. Send email with payout details
  await sendPayoutConfirmationEmail(payoutRequest);
  
  return res.json({ success: true });
}

Response:
{
  success: true,
  message: "Payout processed successfully"
}
```

---

## 📊 B2C ANALYTICS

### **Vendor Analytics:**

**API Call:**
```javascript
GET /api/vendor/analytics?period=month

Response:
{
  sales: {
    totalOrders: 45,
    totalRevenue: 58500,
    netEarnings: 49725, // After commission
    averageOrderValue: 1300
  },
  
  topProducts: [
    {
      product: {name: "Wireless Mouse", id: "prod_123"},
      unitsSold: 23,
      revenue: 29877
    }
  ],
  
  ordersByStatus: {
    pending: 5,
    processing: 3,
    shipped: 8,
    delivered: 29
  },
  
  performanceMetrics: {
    orderFulfillmentTime: 1.2, // days average
    deliverySuccessRate: 98.5, // %
    returnRate: 1.5 // %
  }
}
```

### **Admin B2C Analytics:**

**API Call:**
```javascript
GET /api/admin/analytics/b2c?period=month

Response:
{
  revenue: {
    totalSales: 1250000,
    platformCommission: 187500, // Total commission earned
    vendorPayouts: 1062500
  },
  
  vendors: {
    total: 125,
    active: 98, // Made at least 1 sale this month
    pending: 12,
    suspended: 2
  },
  
  orders: {
    total: 1456,
    pending: 45,
    shipped: 123,
    delivered: 1245,
    cancelled: 43
  },
  
  topVendors: [
    {
      vendor: {businessName: "John's Electronics"},
      sales: 145000,
      commission: 21750,
      orders: 112
    }
  ]
}
```

---

## 💾 COMPLETE DATABASE FLOW

### **Vendor Lifecycle:**

```sql
-- 1. Vendor applies
INSERT INTO users (email, password, role, is_active)
INSERT INTO vendor_profiles (user_id, business_name, status)
INSERT INTO kyc_documents (user_id, document_type, document_url, status)

-- 2. Admin approves
UPDATE vendor_profiles SET status = 'APPROVED', approved_at = NOW()
UPDATE users SET is_active = TRUE WHERE id = vendor_user_id
UPDATE kyc_documents SET status = 'APPROVED' WHERE user_id = vendor_user_id

-- 3. Vendor adds product
INSERT INTO products (name, vendor_id, business_model, status, is_active)
INSERT INTO product_images (product_id, url, is_primary)
INSERT INTO inventory (product_id, quantity, min_stock_level)

-- 4. Admin approves product
UPDATE products SET status = 'ACTIVE', is_active = TRUE, approved_at = NOW()

-- 5. Customer orders
INSERT INTO orders (order_number, user_id, business_model, status)
INSERT INTO order_items (order_id, product_id, quantity, price)
UPDATE inventory SET reserved_qty = reserved_qty + quantity

-- 6. Payment completed
UPDATE orders SET payment_status = 'COMPLETED', status = 'CONFIRMED'
UPDATE inventory SET quantity = quantity - quantity, reserved_qty = reserved_qty - quantity

-- 7. Vendor ships
UPDATE orders SET status = 'SHIPPED', shipped_at = NOW(), awb_number = 'AWB123'

-- 8. Order delivered
UPDATE orders SET status = 'DELIVERED', delivered_at = NOW()

-- 9. Create payout record
INSERT INTO vendor_payouts (
  vendor_id, order_id, order_amount, commission, 
  shipping_charges, net_amount, status
)

-- 10. Vendor requests payout
INSERT INTO payout_requests (vendor_id, amount, status, requested_at)
UPDATE vendor_payouts SET payout_request_id = req_id, status = 'PAYOUT_REQUESTED'

-- 11. Admin processes payout
UPDATE payout_requests SET status = 'PROCESSED', utr_number = 'UTR123', processed_at = NOW()
UPDATE vendor_payouts SET status = 'PAID', paid_at = NOW(), utr_number = 'UTR123'
```

---

## ✅ B2C CHECKLIST

**Vendor Onboarding:**
- [ ] Registration form with KYC
- [ ] Email verification
- [ ] Document upload (PAN, Aadhaar, GST, Bank)
- [ ] Admin approval workflow
- [ ] Rejection flow with reason

**Product Management:**
- [ ] Add product form (multi-step)
- [ ] Image upload (multiple)
- [ ] Admin product approval
- [ ] Edit/delete products
- [ ] Inventory management
- [ ] Low stock alerts

**Order Management:**
- [ ] Vendor order notifications
- [ ] Order details view
- [ ] Shipping integration
- [ ] AWB generation
- [ ] Tracking updates via webhooks
- [ ] Order status updates

**Payouts:**
- [ ] Payout calculation logic
- [ ] Settlement after delivery
- [ ] Payout request flow
- [ ] Admin payout processing
- [ ] UTR tracking
- [ ] Payout history

**Analytics:**
- [ ] Vendor sales dashboard
- [ ] Top products
- [ ] Order metrics
- [ ] Performance tracking
- [ ] Admin B2C analytics

**Communication:**
- [ ] Email notifications (approval, orders, payouts)
- [ ] In-app notifications
- [ ] SMS notifications (optional)

---

**END OF PART 2 - B2C/VENDOR FLOW**

**Next:** [COMPLETEFLOW_3_B2B.md](./COMPLETEFLOW_3_B2B.md) - B2B/Business Services Flow

# 🏢 COMPLETE FLOW - B2B (Business-to-Business Services)

> **Part 3 of 5** - Detailed flow for business service providers, subscriptions, and lead management  
> Last Updated: October 10, 2025

---

## 📋 OVERVIEW

**B2B Model:** Business service providers (accountants, lawyers, designers, consultants, etc.) list their services on Grap Deal to get leads from other businesses.

**Key Characteristics:**
- ✅ Businesses register as service providers
- ✅ Subscription-based model (monthly/yearly plans)
- ✅ Service directory listing
- ✅ Lead generation system
- ✅ Optional: Banner ads for premium visibility
- ✅ Contact requests tracked as "leads"
- ✅ Recurring revenue from subscriptions

**Revenue Model:**
- Monthly/Yearly subscription fees
- Premium listing upgrades
- Banner ad placements
- Featured listings

---

## 🎯 BUSINESS JOURNEY MAP

```
Registration → Subscription → Service Listing → Directory Approval 
  → Goes Live → Lead Receives → Contact Exchange 
  → Subscription Renewal/Upgrade
```

---

## 💼 SUBSCRIPTION PLANS

### **Plan Structure:**

```javascript
const SUBSCRIPTION_PLANS = [
  {
    id: "plan_basic",
    name: "Basic",
    price: 999, // per month
    billingCycle: "MONTHLY",
    features: [
      "List up to 3 services",
      "Basic profile page",
      "Lead notifications via email",
      "Response within 24 hours",
      "Standard support"
    ],
    maxServices: 3,
    isFeatured: false,
    priorityListing: false
  },
  {
    id: "plan_pro",
    name: "Professional",
    price: 2499, // per month
    billingCycle: "MONTHLY",
    features: [
      "List up to 10 services",
      "Enhanced profile with gallery",
      "Instant lead notifications (email + SMS)",
      "Priority in search results",
      "Response within 12 hours",
      "Priority support",
      "Monthly analytics report"
    ],
    maxServices: 10,
    isFeatured: false,
    priorityListing: true
  },
  {
    id: "plan_enterprise",
    name: "Enterprise",
    price: 4999, // per month
    billingCycle: "MONTHLY",
    features: [
      "Unlimited service listings",
      "Premium profile with video",
      "Featured in homepage carousel",
      "Instant notifications (email + SMS + WhatsApp)",
      "Top search ranking",
      "Dedicated account manager",
      "Advanced analytics dashboard",
      "Custom banner ad placement",
      "24/7 priority support"
    ],
    maxServices: -1, // unlimited
    isFeatured: true,
    priorityListing: true,
    bannerAd: true
  },
  {
    id: "plan_yearly_basic",
    name: "Basic (Yearly)",
    price: 9999, // per year (2 months free)
    billingCycle: "YEARLY",
    features: ["All Basic features", "2 months free"],
    maxServices: 3
  },
  {
    id: "plan_yearly_pro",
    name: "Professional (Yearly)",
    price: 24999, // per year
    billingCycle: "YEARLY",
    features: ["All Pro features", "2 months free"],
    maxServices: 10,
    priorityListing: true
  },
  {
    id: "plan_yearly_enterprise",
    name: "Enterprise (Yearly)",
    price: 49999, // per year
    billingCycle: "YEARLY",
    features: ["All Enterprise features", "2 months free"],
    maxServices: -1,
    isFeatured: true,
    priorityListing: true,
    bannerAd: true
  }
];
```

---

## 📄 DETAILED PAGE-BY-PAGE FLOW

---

### **PHASE 1: BUSINESS REGISTRATION & SUBSCRIPTION**

---

### **PAGE 1: B2B LANDING PAGE**

**URL:** `/services/for-businesses`

#### **UI Elements:**
- Hero: "Grow Your Business with Qualified Leads"
- Value propositions:
  - Connect with potential clients
  - Get verified leads
  - Manage inquiries easily
- Subscription plans comparison table
- "Get Started" CTA buttons
- Testimonials from existing businesses
- FAQs

#### **User Actions:**
1. Browses plans
2. Clicks "Get Started" on a plan
3. Redirects to registration

---

### **PAGE 2: BUSINESS REGISTRATION**

**URL:** `/business/register`

#### **UI Elements:**
- Multi-step form:
  - **Step 1:** Business Information
  - **Step 2:** Contact Details
  - **Step 3:** Business Verification (KYC)
  - **Step 4:** Choose Plan & Payment

#### **Step 1: Business Information**

```javascript
{
  businessName: "ABC Accounting Services",
  businessType: "PROPRIETORSHIP" | "PARTNERSHIP" | "PVT_LTD" | "LLP" | "PUBLIC_LTD",
  industryCategory: "Accounting & Finance", // Dropdown
  subCategory: "Tax Consulting", // Based on category
  gstin: "27XXXXX1234X1ZX",
  panNumber: "ABCDE1234F",
  yearEstablished: 2015,
  numberOfEmployees: "1-10" | "11-50" | "51-200" | "201-500" | "500+",
  website: "https://abcaccounting.com",
  description: "Professional accounting and tax services for businesses...",
  businessAddress: {
    address1: "123 Business Park",
    address2: "Floor 2",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400001",
    country: "India"
  }
}
```

#### **Step 2: Contact Details**

```javascript
{
  contactPerson: {
    firstName: "Rajesh",
    lastName: "Kumar",
    designation: "Managing Partner",
    email: "rajesh@abcaccounting.com",
    phone: "+91-9876543210"
  },
  alternateContact: {
    email: "support@abcaccounting.com",
    phone: "+91-9876543211"
  }
}
```

#### **Step 3: Business Verification (KYC)**

**Upload Documents:**
- Business registration certificate
- GST certificate
- PAN card
- Address proof
- Authorized signatory ID

#### **Step 4: Choose Plan & Payment**

**UI:**
- Plan selection (radio buttons)
- Monthly vs Yearly toggle
- Price summary
- Payment via Razorpay

**API Call - Register & Subscribe:**

```javascript
POST /api/business/register

Request (multipart/form-data):
{
  // Step 1
  businessName: "ABC Accounting Services",
  businessType: "PROPRIETORSHIP",
  industryCategory: "Accounting & Finance",
  subCategory: "Tax Consulting",
  gstin: "27XXXXX1234X1ZX",
  panNumber: "ABCDE1234F",
  yearEstablished: 2015,
  numberOfEmployees: "1-10",
  website: "https://abcaccounting.com",
  description: "Professional accounting...",
  businessAddress: {...},
  
  // Step 2
  contactPerson: {...},
  alternateContact: {...},
  
  // Step 3 (files)
  businessCertificate: File,
  gstCertificate: File,
  panCard: File,
  addressProof: File,
  
  // Step 4
  planId: "plan_pro",
  billingCycle: "MONTHLY",
  password: "hashed_password"
}

// Backend:
async function registerBusiness(req, res) {
  const formData = req.body;
  const files = req.files;
  
  // 1. Create user account
  const user = await prisma.user.create({
    data: {
      email: formData.contactPerson.email,
      password: await bcrypt.hash(formData.password, 10),
      name: `${formData.contactPerson.firstName} ${formData.contactPerson.lastName}`,
      phone: formData.contactPerson.phone,
      role: 'BUSINESS_OWNER', // New role
      isActive: false // Pending approval
    }
  });
  
  // 2. Upload documents
  const businessCertUrl = await uploadImageLocally(files.businessCertificate, 'kyc');
  const gstUrl = await uploadImageLocally(files.gstCertificate, 'kyc');
  
  // 3. Create business profile
  const business = await prisma.businessProfile.create({
    data: {
      userId: user.id,
      businessName: formData.businessName,
      businessType: formData.businessType,
      industryCategory: formData.industryCategory,
      subCategory: formData.subCategory,
      gstin: formData.gstin,
      panNumber: formData.panNumber,
      yearEstablished: formData.yearEstablished,
      numberOfEmployees: formData.numberOfEmployees,
      website: formData.website,
      description: formData.description,
      businessAddress: formData.businessAddress,
      contactPerson: formData.contactPerson,
      alternateContact: formData.alternateContact,
      status: 'PENDING', // Approval needed
      profileViews: 0,
      leadCount: 0
    }
  });
  
  // 4. Create KYC records
  await prisma.kYCDocument.createMany({
    data: [
      {
        userId: user.id,
        documentType: 'BUSINESS_REGISTRATION',
        documentUrl: businessCertUrl,
        status: 'PENDING'
      },
      {
        userId: user.id,
        documentType: 'GST_CERTIFICATE',
        documentNumber: formData.gstin,
        documentUrl: gstUrl,
        status: 'PENDING'
      }
    ]
  });
  
  // 5. Create subscription (with trial or pending payment)
  const plan = SUBSCRIPTION_PLANS.find(p => p.id === formData.planId);
  
  const subscription = await prisma.subscription.create({
    data: {
      businessId: business.id,
      planId: plan.id,
      planName: plan.name,
      amount: plan.price,
      billingCycle: plan.billingCycle,
      status: 'PENDING_PAYMENT',
      maxServices: plan.maxServices,
      features: plan.features
    }
  });
  
  // 6. Create Razorpay subscription/order
  const razorpayOrder = await razorpay.orders.create({
    amount: plan.price * 100,
    currency: 'INR',
    receipt: `SUB_${subscription.id}`,
    notes: {
      businessId: business.id,
      subscriptionId: subscription.id
    }
  });
  
  // 7. Notify admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'BUSINESS_REGISTRATION',
      title: 'New Business Registration',
      message: `${formData.businessName} registered for ${plan.name} plan`,
      link: `/admin/businesses/${business.id}`
    }
  });
  
  return res.json({
    success: true,
    businessId: business.id,
    subscriptionId: subscription.id,
    razorpayOrderId: razorpayOrder.id,
    amount: plan.price
  });
}

Response:
{
  success: true,
  businessId: "biz_123",
  subscriptionId: "sub_456",
  razorpayOrderId: "order_razorpay_xyz",
  amount: 2499
}
```

#### **Frontend - Process Payment:**

```javascript
const handlePayment = async () => {
  const { razorpayOrderId, amount } = registrationResponse;
  
  const options = {
    key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
    amount: amount * 100,
    currency: 'INR',
    name: 'Grap Deal - B2B Services',
    description: 'Subscription Payment',
    order_id: razorpayOrderId,
    handler: async function(response) {
      // Verify payment
      await fetch('/api/business/subscription/verify', {
        method: 'POST',
        body: JSON.stringify({
          subscriptionId: subscriptionId,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature
        })
      });
      
      router.push('/business/onboarding-success');
    }
  };
  
  const razorpay = new Razorpay(options);
  razorpay.open();
};
```

**Backend - Verify Payment:**

```javascript
POST /api/business/subscription/verify

Request:
{
  subscriptionId: "sub_456",
  razorpayPaymentId: "pay_xyz",
  razorpayOrderId: "order_razorpay_xyz",
  razorpaySignature: "signature_hash"
}

// Backend:
async function verifySubscriptionPayment(req, res) {
  const { subscriptionId, razorpayPaymentId, razorpayOrderId, razorpaySignature } = req.body;
  
  // 1. Verify signature
  const crypto = require('crypto');
  const secret = process.env.RAZORPAY_KEY_SECRET;
  const generatedSignature = crypto
    .createHmac('sha256', secret)
    .update(razorpayOrderId + '|' + razorpayPaymentId)
    .digest('hex');
  
  if (generatedSignature !== razorpaySignature) {
    return res.status(400).json({ error: 'Invalid signature' });
  }
  
  // 2. Update subscription
  const subscription = await prisma.subscription.update({
    where: { id: subscriptionId },
    data: {
      status: 'ACTIVE',
      startDate: new Date(),
      endDate: billingCycle === 'MONTHLY' ? 
        addMonths(new Date(), 1) : addYears(new Date(), 1),
      paymentId: razorpayPaymentId
    },
    include: { business: true }
  });
  
  // 3. Create payment record
  await prisma.payment.create({
    data: {
      userId: subscription.business.userId,
      amount: subscription.amount,
      currency: 'INR',
      paymentMethod: 'CREDIT_CARD',
      status: 'COMPLETED',
      gatewayId: razorpayPaymentId,
      type: 'SUBSCRIPTION',
      subscriptionId: subscription.id
    }
  });
  
  // 4. Mark business as active (still needs KYC approval)
  // But allow service creation
  
  return res.json({ success: true });
}

Response:
{
  success: true
}
```

---

### **PAGE 3: ONBOARDING SUCCESS**

**URL:** `/business/onboarding-success`

#### **UI Elements:**
- Success animation
- "Subscription Activated!" message
- Next steps:
  - ✅ Payment confirmed
  - ⏳ KYC verification in progress (24-48 hours)
  - 📝 Meanwhile, you can start adding services
- "Go to Dashboard" button

---

### **ADMIN SIDE: BUSINESS APPROVAL**

**URL:** `/admin/b2b/applications`

**Similar to vendor approval:**
- Admin reviews business details
- Verifies documents
- Approves/Rejects

**API Call - Approve:**
```javascript
PUT /api/admin/businesses/biz_123/approve

// Backend:
await prisma.businessProfile.update({
  where: { id: businessId },
  data: {
    status: 'APPROVED',
    approvedAt: new Date(),
    isActive: true
  }
});

await prisma.user.update({
  where: { id: business.userId },
  data: { isActive: true }
});

// Notify business
await prisma.notification.create({
  data: {
    userId: business.userId,
    type: 'BUSINESS_APPROVED',
    title: 'Business Profile Approved!',
    message: 'Your business profile is now live. Start adding services.',
    link: '/business/dashboard'
  }
});
```

---

### **PHASE 2: SERVICE DIRECTORY MANAGEMENT**

---

### **PAGE 4: BUSINESS DASHBOARD**

**URL:** `/business/dashboard`

#### **UI Elements:**
- Welcome header with business name
- Subscription card:
  - Current plan
  - Expiry date
  - "Upgrade" button
  - "Manage Subscription" button
- Stats cards:
  - Total Services Listed
  - Profile Views (this month)
  - Leads Received (total)
  - New Leads (pending response)
- Quick actions:
  - Add New Service
  - View Leads
  - Edit Profile
- Recent leads table
- Analytics chart (lead trends)

#### **API Call:**
```javascript
GET /api/business/dashboard/stats

Response:
{
  business: {
    id: "biz_123",
    businessName: "ABC Accounting Services",
    profileViews: 345,
    status: "APPROVED"
  },
  
  subscription: {
    id: "sub_456",
    planName: "Professional",
    status: "ACTIVE",
    startDate: "2025-10-01",
    endDate: "2025-11-01",
    daysRemaining: 22,
    maxServices: 10,
    currentServices: 5,
    autoRenew: true
  },
  
  stats: {
    totalServices: 5,
    activeServices: 4,
    pendingServices: 1,
    profileViews: 345, // This month
    totalLeads: 28,
    newLeads: 3, // Not contacted yet
    convertedLeads: 12
  },
  
  recentLeads: [
    {
      id: "lead_789",
      service: {name: "Tax Filing Services"},
      requester: {
        name: "XYZ Pvt Ltd",
        contact: "contact@xyz.com" // Revealed after accepting lead
      },
      message: "Need help with GST filing for Q2",
      createdAt: "2025-10-10T09:00:00Z",
      status: "NEW"
    }
  ]
}
```

---

### **PAGE 5: ADD SERVICE**

**URL:** `/business/services/add`

#### **UI Elements:**
- Service creation form

#### **Form Fields:**

```javascript
{
  serviceName: "GST Tax Filing",
  serviceCategory: "Tax Consulting", // From profile category
  shortDescription: "Professional GST return filing services",
  detailedDescription: "We provide comprehensive GST filing services including...",
  
  pricing: {
    type: "FIXED" | "HOURLY" | "PROJECT_BASED" | "CUSTOM",
    startingPrice: 5000, // If fixed/starting
    priceUnit: "per filing" | "per hour" | "per project",
    displayPrice: "Starting from ₹5,000"
  },
  
  serviceDelivery: {
    deliveryTime: "3-5 business days",
    deliveryMode: "ONLINE" | "ONSITE" | "HYBRID"
  },
  
  serviceArea: {
    type: "LOCAL" | "REGIONAL" | "NATIONAL" | "INTERNATIONAL",
    cities: ["Mumbai", "Pune"], // If LOCAL/REGIONAL
    states: ["Maharashtra"], // If REGIONAL
  },
  
  images: [File, File], // Service images/portfolio
  
  tags: ["GST", "Tax Filing", "Compliance", "Returns"],
  
  faqs: [
    {
      question: "What documents do I need?",
      answer: "You need invoices, purchase bills, and bank statements"
    }
  ]
}
```

#### **API Call - Create Service:**

```javascript
POST /api/business/services

Request:
{
  serviceName: "GST Tax Filing",
  serviceCategory: "Tax Consulting",
  shortDescription: "Professional GST filing",
  detailedDescription: "We provide...",
  pricing: {...},
  serviceDelivery: {...},
  serviceArea: {...},
  tags: ["GST", "Tax Filing"],
  faqs: [...],
  images: [File, File]
}

// Backend:
async function createBusinessService(req, res) {
  const { userId } = req.user;
  const formData = req.body;
  const files = req.files;
  
  // 1. Get business profile
  const business = await prisma.businessProfile.findUnique({
    where: { userId },
    include: { subscription: true }
  });
  
  if (business.status !== 'APPROVED') {
    return res.status(403).json({ error: 'Business not approved yet' });
  }
  
  // 2. Check subscription limits
  const existingServices = await prisma.businessService.count({
    where: { businessId: business.id, isActive: true }
  });
  
  if (business.subscription.maxServices !== -1 && 
      existingServices >= business.subscription.maxServices) {
    return res.status(403).json({ 
      error: 'Service limit reached. Please upgrade your plan.' 
    });
  }
  
  // 3. Upload images
  const imageUrls = [];
  for (const file of files) {
    const url = await uploadImageLocally(file, 'services');
    imageUrls.push(url);
  }
  
  // 4. Create service
  const service = await prisma.businessService.create({
    data: {
      businessId: business.id,
      serviceName: formData.serviceName,
      serviceCategory: formData.serviceCategory,
      shortDescription: formData.shortDescription,
      detailedDescription: formData.detailedDescription,
      pricing: formData.pricing,
      serviceDelivery: formData.serviceDelivery,
      serviceArea: formData.serviceArea,
      tags: formData.tags,
      faqs: formData.faqs,
      images: imageUrls,
      status: 'PENDING', // Admin approval
      isActive: false,
      views: 0,
      leadCount: 0
    }
  });
  
  // 5. Notify admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'SERVICE_SUBMITTED',
      title: 'New Service for Review',
      message: `${business.businessName} added "${formData.serviceName}"`,
      link: `/admin/b2b/services/${service.id}`
    }
  });
  
  return res.json({
    success: true,
    service: service
  });
}

Response:
{
  success: true,
  service: {
    id: "service_111",
    serviceName: "GST Tax Filing",
    status: "PENDING",
    message: "Service submitted for review. Will be live within 24 hours."
  }
}
```

---

### **ADMIN SIDE: SERVICE APPROVAL**

**URL:** `/admin/b2b/services/pending`

**Approval Flow (similar to products):**
```javascript
PUT /api/admin/services/service_111/approve

// Backend:
await prisma.businessService.update({
  where: { id: serviceId },
  data: {
    status: 'ACTIVE',
    isActive: true,
    approvedAt: new Date()
  }
});
```

---

### **PHASE 3: SERVICE DIRECTORY (CUSTOMER SIDE)**

---

### **PAGE 6: SERVICE DIRECTORY LISTING**

**URL:** `/services` or `/services/accounting-finance`

#### **UI Elements:**
- Page title: "Find Business Services"
- Search bar
- Filters sidebar:
  - Category
  - Location (city/state/national)
  - Price range
  - Service type (online/onsite)
  - Rating
- Service cards grid:
  - Business logo
  - Service name
  - Business name
  - Starting price
  - Location
  - Rating & reviews
  - "View Details" button
- Featured listings at top (for Enterprise plan businesses)
- Pagination

#### **API Call:**
```javascript
GET /api/services?category=tax-consulting&location=mumbai&page=1&limit=12

Response:
{
  services: [
    {
      id: "service_111",
      serviceName: "GST Tax Filing",
      shortDescription: "Professional GST filing",
      pricing: {displayPrice: "Starting from ₹5,000"},
      business: {
        id: "biz_123",
        businessName: "ABC Accounting Services",
        logo: "/uploads/...",
        city: "Mumbai",
        rating: 4.5,
        reviewCount: 23
      },
      serviceArea: {type: "REGIONAL", cities: ["Mumbai", "Pune"]},
      isFeatured: false
    }
  ],
  totalCount: 45,
  page: 1,
  totalPages: 4,
  featuredServices: [
    // Enterprise plan services shown at top
  ]
}
```

---

### **PAGE 7: SERVICE DETAIL PAGE**

**URL:** `/services/[serviceId]/gst-tax-filing`

#### **UI Elements:**
- Breadcrumb: Home > Services > Tax Consulting > GST Tax Filing
- Service header:
  - Service name
  - Business name with link
  - Location
  - Rating & reviews
- Service images gallery
- About this service (detailed description)
- Pricing section
- Service delivery details
- Coverage area
- FAQs
- Reviews section
- Business info card (sidebar):
  - Logo
  - Name
  - Year established
  - Other services
  - "Contact for Quote" button (main CTA)

#### **User Actions:**
1. Views service details
2. Scrolls through information
3. Clicks "Contact for Quote" → Opens lead form

---

### **PAGE 8: LEAD FORM (MODAL/PAGE)**

**URL:** Modal or `/services/[serviceId]/contact`

#### **UI Elements:**
- "Request a Quote" title
- Form fields:
  - Name
  - Email
  - Phone
  - Company name
  - Message/Requirements
  - Budget range (optional)
- "Submit Request" button

**For Logged-in Users:**
- Pre-fills name, email, phone from profile

**For Guest Users:**
- Required to create account or login

#### **API Call - Submit Lead:**

```javascript
POST /api/services/service_111/lead

Request:
{
  name: "Amit Sharma",
  email: "amit@xyzcompany.com",
  phone: "+91-9988776655",
  companyName: "XYZ Pvt Ltd",
  message: "Need help with GST filing for Q2. We have 50+ invoices.",
  budget: "5000-10000"
}

// Backend:
async function createLead(req, res) {
  const { serviceId } = req.params;
  const leadData = req.body;
  const userId = req.user?.id; // May be guest
  
  // 1. Get service & business
  const service = await prisma.businessService.findUnique({
    where: { id: serviceId },
    include: { business: true }
  });
  
  // 2. Create lead
  const lead = await prisma.businessLead.create({
    data: {
      serviceId: service.id,
      businessId: service.businessId,
      userId: userId || null,
      requesterName: leadData.name,
      requesterEmail: leadData.email,
      requesterPhone: leadData.phone,
      companyName: leadData.companyName,
      message: leadData.message,
      budget: leadData.budget,
      status: 'NEW',
      source: 'WEBSITE'
    }
  });
  
  // 3. Increment lead count
  await prisma.businessService.update({
    where: { id: serviceId },
    data: { leadCount: { increment: 1 } }
  });
  
  await prisma.businessProfile.update({
    where: { id: service.businessId },
    data: { leadCount: { increment: 1 } }
  });
  
  // 4. Notify business
  await prisma.notification.create({
    data: {
      userId: service.business.userId,
      type: 'NEW_LEAD',
      title: 'New Lead Received!',
      message: `${leadData.companyName} inquired about "${service.serviceName}"`,
      link: `/business/leads/${lead.id}`
    }
  });
  
  // 5. Send email to business
  await sendNewLeadEmail(service.business.contactPerson.email, {
    serviceName: service.serviceName,
    requesterName: leadData.name,
    companyName: leadData.companyName,
    message: leadData.message,
    leadUrl: `https://grapdeal.com/business/leads/${lead.id}`
  });
  
  // 6. Send confirmation to requester
  await sendLeadConfirmationEmail(leadData.email, {
    serviceName: service.serviceName,
    businessName: service.business.businessName
  });
  
  return res.json({
    success: true,
    leadId: lead.id,
    message: "Your request has been sent. The business will contact you shortly."
  });
}

Response:
{
  success: true,
  leadId: "lead_789",
  message: "Your request has been sent..."
}
```

---

### **PHASE 4: LEAD MANAGEMENT (BUSINESS SIDE)**

---

### **PAGE 9: LEADS PAGE**

**URL:** `/business/leads`

#### **UI Elements:**
- Tabs: All, New, In Progress, Converted, Lost
- Leads table/cards:
  - Requester info (name, company)
  - Service requested
  - Date received
  - Status badge
  - Message preview
  - Actions: View, Mark as Contacted, Archive
- Filters: Service, Date range, Status

#### **API Call:**
```javascript
GET /api/business/leads?status=NEW&page=1

Response:
{
  leads: [
    {
      id: "lead_789",
      requesterName: "Amit Sharma",
      requesterEmail: "amit@xyzcompany.com",
      requesterPhone: "+91-9988776655",
      companyName: "XYZ Pvt Ltd",
      service: {
        id: "service_111",
        serviceName: "GST Tax Filing"
      },
      message: "Need help with GST filing...",
      budget: "5000-10000",
      createdAt: "2025-10-10T09:00:00Z",
      status: "NEW"
    }
  ],
  totalCount: 28,
  page: 1,
  totalPages: 3
}
```

---

### **PAGE 10: LEAD DETAIL**

**URL:** `/business/leads/[leadId]`

#### **UI Elements:**
- Lead information card:
  - Requester name
  - Company name
  - Contact details (email, phone)
  - Service requested
  - Message
  - Budget
  - Received date
- Status update dropdown
- Notes section (internal)
- Activity timeline
- Actions:
  - Call (opens phone)
  - Email (opens email client)
  - Mark as Converted
  - Mark as Lost

#### **API Call - Update Lead Status:**

```javascript
PUT /api/business/leads/lead_789

Request:
{
  status: "IN_PROGRESS",
  notes: "Called the client. They're interested. Sending quotation."
}

// Backend:
await prisma.businessLead.update({
  where: { id: leadId },
  data: {
    status: req.body.status,
    notes: req.body.notes,
    updatedAt: new Date()
  }
});

// Create activity log
await prisma.leadActivity.create({
  data: {
    leadId,
    activityType: 'STATUS_CHANGE',
    description: `Status changed to ${req.body.status}`,
    notes: req.body.notes
  }
});

Response:
{
  success: true
}
```

---

### **PHASE 5: SUBSCRIPTION MANAGEMENT**

---

### **PAGE 11: SUBSCRIPTION SETTINGS**

**URL:** `/business/subscription`

#### **UI Elements:**
- Current plan card:
  - Plan name
  - Price
  - Billing cycle
  - Renewal date
  - Auto-renew toggle
- Usage stats:
  - Services: 5/10
  - Profile views: 345 this month
  - Leads: 28 total
- Plan comparison table
- "Upgrade Plan" button
- "Cancel Subscription" link
- Billing history table

#### **API Call:**
```javascript
GET /api/business/subscription

Response:
{
  subscription: {
    id: "sub_456",
    planId: "plan_pro",
    planName: "Professional",
    amount: 2499,
    billingCycle: "MONTHLY",
    status: "ACTIVE",
    startDate: "2025-10-01",
    endDate: "2025-11-01",
    autoRenew: true,
    paymentMethod: "CREDIT_CARD"
  },
  usage: {
    servicesUsed: 5,
    servicesAllowed: 10,
    profileViews: 345,
    leadsReceived: 28
  },
  billingHistory: [
    {
      date: "2025-10-01",
      amount: 2499,
      status: "PAID",
      invoiceUrl: "/invoices/INV-001.pdf"
    }
  ]
}
```

---

### **AUTO-RENEWAL FLOW**

**Cron Job (runs daily):**

```javascript
// Check subscriptions expiring in next 3 days
const expiringSubscriptions = await prisma.subscription.findMany({
  where: {
    status: 'ACTIVE',
    autoRenew: true,
    endDate: {
      lte: addDays(new Date(), 3),
      gte: new Date()
    }
  },
  include: { business: true }
});

for (const subscription of expiringSubscriptions) {
  // Create Razorpay order for renewal
  const razorpayOrder = await razorpay.orders.create({
    amount: subscription.amount * 100,
    currency: 'INR',
    receipt: `RENEWAL_${subscription.id}`,
    notes: {
      subscriptionId: subscription.id,
      type: 'RENEWAL'
    }
  });
  
  // Charge saved payment method
  const payment = await razorpay.payments.create({
    amount: subscription.amount * 100,
    currency: 'INR',
    order_id: razorpayOrder.id,
    customer_id: subscription.business.razorpayCustomerId, // Saved
    method: 'card',
    card: {
      token: subscription.business.savedCardToken // Saved
    }
  });
  
  if (payment.status === 'captured') {
    // Renew subscription
    await prisma.subscription.update({
      where: { id: subscription.id },
      data: {
        endDate: subscription.billingCycle === 'MONTHLY' ?
          addMonths(subscription.endDate, 1) :
          addYears(subscription.endDate, 1),
        paymentId: payment.id
      }
    });
    
    // Create payment record
    await prisma.payment.create({
      data: {
        userId: subscription.business.userId,
        amount: subscription.amount,
        status: 'COMPLETED',
        gatewayId: payment.id,
        type: 'SUBSCRIPTION_RENEWAL',
        subscriptionId: subscription.id
      }
    });
    
    // Send renewal confirmation
    await sendSubscriptionRenewalEmail(subscription.business.contactPerson.email);
  }
}
```

---

### **UPGRADE PLAN FLOW**

**API Call:**
```javascript
POST /api/business/subscription/upgrade

Request:
{
  newPlanId: "plan_enterprise"
}

// Backend:
async function upgradeSubscription(req, res) {
  const { userId } = req.user;
  const { newPlanId } = req.body;
  
  const business = await prisma.businessProfile.findUnique({
    where: { userId },
    include: { subscription: true }
  });
  
  const currentPlan = SUBSCRIPTION_PLANS.find(p => p.id === business.subscription.planId);
  const newPlan = SUBSCRIPTION_PLANS.find(p => p.id === newPlanId);
  
  // Calculate prorated amount
  const daysRemaining = Math.ceil(
    (new Date(business.subscription.endDate) - new Date()) / (1000 * 60 * 60 * 24)
  );
  
  const daysInCycle = currentPlan.billingCycle === 'MONTHLY' ? 30 : 365;
  const unusedAmount = (currentPlan.price / daysInCycle) * daysRemaining;
  const proratedAmount = newPlan.price - unusedAmount;
  
  // Create Razorpay order for prorated amount
  const razorpayOrder = await razorpay.orders.create({
    amount: proratedAmount * 100,
    currency: 'INR',
    receipt: `UPGRADE_${business.subscription.id}`
  });
  
  return res.json({
    success: true,
    razorpayOrderId: razorpayOrder.id,
    proratedAmount,
    message: `You'll be charged ₹${proratedAmount} for the upgrade.`
  });
}
```

---

## 📊 B2B ANALYTICS

### **Business Analytics:**

**API Call:**
```javascript
GET /api/business/analytics?period=month

Response:
{
  profileViews: {
    total: 345,
    trend: +15 // % compared to last month
  },
  
  leads: {
    total: 28,
    new: 3,
    inProgress: 8,
    converted: 12,
    lost: 5,
    conversionRate: 42.8 // %
  },
  
  topServices: [
    {
      serviceName: "GST Tax Filing",
      views: 156,
      leads: 12,
      conversionRate: 50
    }
  ],
  
  leadsBySource: {
    website: 22,
    referral: 4,
    direct: 2
  }
}
```

### **Admin B2B Analytics:**

**API Call:**
```javascript
GET /api/admin/analytics/b2b?period=month

Response:
{
  revenue: {
    subscriptions: 312500, // Total subscription revenue
    renewals: 187500,
    newSignups: 125000
  },
  
  businesses: {
    total: 125,
    active: 98, // With active subscription
    pending: 12,
    cancelled: 5
  },
  
  subscriptionsByPlan: {
    basic: 45,
    professional: 62,
    enterprise: 18
  },
  
  services: {
    totalListed: 450,
    active: 398,
    pending: 24,
    inactive: 28
  },
  
  leads: {
    totalGenerated: 3456,
    averagePerBusiness: 35
  },
  
  churnRate: 4 // %
}
```

---

## ✅ B2B CHECKLIST

**Business Onboarding:**
- [ ] Registration with KYC
- [ ] Subscription plan selection
- [ ] Payment integration (Razorpay)
- [ ] Admin approval workflow

**Service Management:**
- [ ] Add service form
- [ ] Service approval by admin
- [ ] Edit/delete services
- [ ] Service analytics

**Lead Generation:**
- [ ] Service directory listing
- [ ] Search & filters
- [ ] Lead capture form
- [ ] Lead notifications
- [ ] Lead management dashboard

**Subscription Management:**
- [ ] Auto-renewal system
- [ ] Upgrade/downgrade plans
- [ ] Prorated billing
- [ ] Payment history
- [ ] Invoices

**Analytics:**
- [ ] Profile views tracking
- [ ] Lead tracking
- [ ] Conversion metrics
- [ ] Service performance

---

**END OF PART 3 - B2B FLOW**

**Next:** [COMPLETEFLOW_4_C2C.md](./COMPLETEFLOW_4_C2C.md) - C2C Marketplace Flow


# 🤝 COMPLETE FLOW - C2C (Customer-to-Customer Marketplace)

> **Part 4 of 5** - Detailed flow for customer listings, marketplace, and reveal fee system  
> Last Updated: October 10, 2025

---

## 📋 OVERVIEW

**C2C Model:** Customers can create listings to sell products or services to other customers. Think OLX/Quikr model.

**Key Characteristics:**
- ✅ Customers create listings (products/services)
- ✅ Free to browse, but pay to reveal contact info
- ✅ Admin approval required for all listings
- ✅ Reveal fee charged per listing (e.g., ₹20-50)
- ✅ Direct communication between buyers/sellers
- ✅ Platform doesn't handle transactions
- ✅ Revenue from reveal fees

**Revenue Model:**
- Reveal Fee: ₹20-50 per contact reveal
- Featured Listing Fee: ₹100-500 (optional)
- Premium Badge: ₹200/month (verified seller badge)

---

## 🎯 USER JOURNEY MAP

### **Seller Journey:**
```
Create Listing → Upload Photos → Submit → Admin Approval 
  → Goes Live → Receives Interests → Views Interested Buyers 
  → Direct Communication
```

### **Buyer Journey:**
```
Browse Listings → Apply Filters → View Details → Interested 
  → Pay Reveal Fee → Get Seller Contact → Direct Communication
```

---

## 💰 PRICING STRUCTURE

```javascript
const C2C_PRICING = {
  revealFee: {
    default: 20, // ₹20 per reveal
    bulk: [
      { reveals: 5, price: 90, perReveal: 18 }, // Buy 5 reveals for ₹90
      { reveals: 10, price: 160, perReveal: 16 }, // Buy 10 for ₹160
      { reveals: 20, price: 300, perReveal: 15 }  // Buy 20 for ₹300
    ]
  },
  
  featuredListing: {
    duration: [
      { days: 7, price: 199 },
      { days: 15, price: 349 },
      { days: 30, price: 599 }
    ]
  },
  
  premiumBadge: {
    monthly: 199,
    yearly: 1999 // 2 months free
  }
};
```

---

## 📄 DETAILED PAGE-BY-PAGE FLOW

---

### **PHASE 1: CREATE LISTING (SELLER SIDE)**

---

### **PAGE 1: C2C MARKETPLACE HOME**

**URL:** `/marketplace`

#### **UI Elements:**
- Hero banner: "Buy & Sell Anything"
- "Post Free Ad" button (prominent CTA)
- Category grid (Electronics, Vehicles, Real Estate, Jobs, Services, etc.)
- Recent listings
- Search bar
- Featured listings carousel

---

### **PAGE 2: CREATE LISTING**

**URL:** `/marketplace/post-ad`

**Access Control:**
- Must be logged in
- Account must be verified (email/phone)

#### **UI Elements:**
- Multi-step form:
  - **Step 1:** Choose Category
  - **Step 2:** Add Details
  - **Step 3:** Upload Photos
  - **Step 4:** Set Price & Location
  - **Step 5:** Contact Information

---

#### **Step 1: Choose Category**

**UI:**
- Category cards with icons
- Categories:
  - Electronics & Gadgets
  - Vehicles (Cars, Bikes, Scooters)
  - Real Estate (Rent, Sale, PG)
  - Jobs & Services
  - Home & Furniture
  - Fashion & Accessories
  - Hobbies & Sports
  - Other

**Subcategories (example for Electronics):**
- Mobile Phones
- Laptops & Computers
- Cameras
- TVs & Audio
- Other Electronics

---

#### **Step 2: Add Details**

**Form varies by category. Example for "Mobile Phone":**

```javascript
{
  title: "iPhone 13 Pro - 128GB - Excellent Condition",
  
  // Category-specific fields
  brand: "Apple",
  model: "iPhone 13 Pro",
  storage: "128GB",
  color: "Graphite",
  condition: "EXCELLENT" | "GOOD" | "FAIR" | "LIKE_NEW",
  
  // Common fields
  description: "Selling my iPhone 13 Pro in excellent condition. No scratches, all accessories included. Battery health 95%. Box and charger included.",
  
  accessories: ["Original Box", "Charger", "Case", "Screen Protector"],
  
  warranty: {
    hasWarranty: true,
    validUntil: "2024-12-31"
  },
  
  reasonForSelling: "Upgraded to newer model" // Optional
}
```

**Example for "Car":**

```javascript
{
  title: "Maruti Swift 2018 - VXI - Well Maintained",
  
  brand: "Maruti Suzuki",
  model: "Swift",
  variant: "VXI",
  year: 2018,
  fuelType: "PETROL" | "DIESEL" | "CNG" | "ELECTRIC",
  transmission: "MANUAL" | "AUTOMATIC",
  kmsDriven: 35000,
  owners: "FIRST" | "SECOND" | "THIRD" | "FOURTH_OR_MORE",
  color: "White",
  
  description: "Well maintained Swift in excellent condition...",
  
  features: ["Power Steering", "Power Windows", "AC", "Music System"],
  
  documents: {
    rcAvailable: true,
    insurance: "COMPREHENSIVE",
    insuranceValid: "2024-06-30",
    pollutionCert: true
  }
}
```

**Example for "Flat for Rent":**

```javascript
{
  title: "2BHK Apartment in Andheri - Fully Furnished",
  
  propertyType: "APARTMENT" | "VILLA" | "INDEPENDENT_HOUSE",
  bhk: "2BHK",
  furnished: "FULLY_FURNISHED" | "SEMI_FURNISHED" | "UNFURNISHED",
  carpetArea: 850, // sq ft
  floor: 5,
  totalFloors: 12,
  
  amenities: ["Parking", "Lift", "Security", "Gym", "Swimming Pool"],
  
  preferredTenant: "FAMILY" | "BACHELOR" | "COMPANY" | "ANY",
  
  description: "Spacious 2BHK apartment with modern amenities..."
}
```

---

#### **Step 3: Upload Photos**

**UI:**
- Drag-and-drop upload area
- Or click to browse
- Preview thumbnails
- Reorder photos (first = primary)
- Max 10 photos
- Recommended: 800x600px minimum

**Requirements:**
- At least 1 photo required
- Max 10 photos
- Max 5MB per photo
- JPG, PNG formats only
- Clear, well-lit photos

---

#### **Step 4: Set Price & Location**

**Price:**
```javascript
{
  priceType: "FIXED" | "NEGOTIABLE" | "ON_REQUEST",
  price: 45000, // If FIXED or NEGOTIABLE
  
  // For rentals
  depositAmount: 90000, // If property
  
  // For free items
  isFree: false
}
```

**Location:**
```javascript
{
  address: {
    area: "Andheri West",
    city: "Mumbai",
    state: "Maharashtra",
    zipCode: "400058"
  },
  
  hideExactLocation: true, // Show only city/area, not full address
  
  // Optional: Allow user to mark on map
  coordinates: {
    lat: 19.1136,
    lng: 72.8697
  }
}
```

---

#### **Step 5: Contact Information**

**UI:**
- Name (pre-filled from profile)
- Phone (pre-filled, can edit)
- Alternate phone (optional)
- Email (pre-filled)
- Preferred contact method: Phone, Email, Both

**Important:**
- Contact info NOT shown in listing
- Only visible after buyer pays reveal fee
- Phone number verified via OTP

---

#### **Step 6: Review & Submit**

**UI:**
- Preview of listing (how it will appear)
- Edit buttons for each section
- Terms & Conditions checkbox:
  - "I own this item and have the right to sell it"
  - "Information provided is accurate"
  - "I understand admin approval is required"
- "Submit for Review" button

---

#### **API Call - Submit Listing:**

```javascript
POST /api/marketplace/listings

Request (multipart/form-data):
{
  categoryId: "cat_electronics_mobile",
  title: "iPhone 13 Pro - 128GB - Excellent Condition",
  
  // Category-specific fields
  attributes: {
    brand: "Apple",
    model: "iPhone 13 Pro",
    storage: "128GB",
    color: "Graphite",
    condition: "EXCELLENT"
  },
  
  description: "Selling my iPhone...",
  accessories: ["Original Box", "Charger"],
  warranty: {...},
  
  // Pricing
  priceType: "NEGOTIABLE",
  price: 45000,
  
  // Location
  area: "Andheri West",
  city: "Mumbai",
  state: "Maharashtra",
  zipCode: "400058",
  hideExactLocation: true,
  coordinates: {lat: 19.1136, lng: 72.8697},
  
  // Contact
  contactName: "Rahul Sharma",
  contactPhone: "+91-9876543210",
  alternatePhone: "+91-9876543211",
  contactEmail: "rahul@example.com",
  preferredContact: "PHONE",
  
  // Photos
  images: [File, File, File]
}

// Backend:
async function createC2CListing(req, res) {
  const { userId } = req.user;
  const formData = req.body;
  const files = req.files;
  
  // 1. Verify phone number
  if (!user.phoneVerified) {
    return res.status(403).json({ 
      error: 'Please verify your phone number first' 
    });
  }
  
  // 2. Check if user has any pending/rejected listings (spam prevention)
  const recentListings = await prisma.c2CListing.count({
    where: {
      userId,
      status: { in: ['PENDING', 'REJECTED'] },
      createdAt: { gte: new Date(Date.now() - 24 * 60 * 60 * 1000) } // Last 24 hours
    }
  });
  
  if (recentListings >= 5) {
    return res.status(429).json({ 
      error: 'You can only create 5 listings per day. Please wait.' 
    });
  }
  
  // 3. Upload images
  const imageUrls = [];
  for (let i = 0; i < files.length; i++) {
    const url = await uploadImageLocally(files[i], 'c2c-listings');
    imageUrls.push({
      url,
      isPrimary: i === 0,
      order: i
    });
  }
  
  // 4. Create listing
  const listing = await prisma.c2CListing.create({
    data: {
      userId,
      categoryId: formData.categoryId,
      title: formData.title,
      description: formData.description,
      attributes: formData.attributes,
      
      priceType: formData.priceType,
      price: parseFloat(formData.price),
      depositAmount: formData.depositAmount ? parseFloat(formData.depositAmount) : null,
      
      area: formData.area,
      city: formData.city,
      state: formData.state,
      zipCode: formData.zipCode,
      hideExactLocation: formData.hideExactLocation,
      coordinates: formData.coordinates,
      
      contactName: formData.contactName,
      contactPhone: formData.contactPhone,
      alternatePhone: formData.alternatePhone,
      contactEmail: formData.contactEmail,
      preferredContact: formData.preferredContact,
      
      images: {
        create: imageUrls
      },
      
      status: 'PENDING', // Admin approval
      isActive: false,
      views: 0,
      interestCount: 0
    }
  });
  
  // 5. Notify admin
  await prisma.notification.create({
    data: {
      userId: 'admin',
      type: 'C2C_LISTING_SUBMITTED',
      title: 'New C2C Listing for Review',
      message: `${user.name} posted "${formData.title}"`,
      link: `/admin/c2c/listings/${listing.id}`
    }
  });
  
  return res.json({
    success: true,
    listing: listing
  });
}

Response:
{
  success: true,
  listing: {
    id: "c2c_listing_123",
    title: "iPhone 13 Pro...",
    status: "PENDING",
    message: "Your ad is under review. It will be live within 24 hours."
  }
}
```

---

### **PAGE 3: LISTING SUBMITTED**

**URL:** `/marketplace/listing-submitted/[listingId]`

#### **UI Elements:**
- Success animation
- "Ad Submitted Successfully!" message
- Timeline:
  - ✅ Ad Created
  - ⏳ Under Review (usually 24 hours)
  - ⏳ Goes Live
- "View My Ads" button
- "Post Another Ad" button

---

### **ADMIN SIDE: LISTING APPROVAL**

**URL:** `/admin/c2c/listings/pending`

#### **Admin Reviews Listing:**

**API Call:**
```javascript
GET /api/admin/c2c/listings?status=PENDING

Response:
{
  listings: [
    {
      id: "c2c_listing_123",
      title: "iPhone 13 Pro - 128GB",
      category: {name: "Mobile Phones"},
      user: {name: "Rahul Sharma", phone: "+91-9876543210"},
      price: 45000,
      location: "Mumbai, Maharashtra",
      images: [{url: "...", isPrimary: true}],
      submittedAt: "2025-10-10T14:00:00Z",
      status: "PENDING"
    }
  ]
}
```

#### **Admin Checks:**
1. Photos are appropriate (no blurry, stock, or inappropriate images)
2. Title & description are clear
3. Price seems reasonable
4. Contact info is valid
5. Not spam/duplicate

#### **Admin Approves/Rejects:**

**API Call - Approve:**
```javascript
PUT /api/admin/c2c/listings/c2c_listing_123/approve

Request:
{
  status: "APPROVED",
  expiryDays: 30, // Auto-deactivate after 30 days
  notes: "Listing approved"
}

// Backend:
await prisma.c2CListing.update({
  where: { id: listingId },
  data: {
    status: 'ACTIVE',
    isActive: true,
    approvedAt: new Date(),
    approvedBy: adminId,
    expiresAt: addDays(new Date(), 30)
  }
});

// Notify user
await prisma.notification.create({
  data: {
    userId: listing.userId,
    type: 'C2C_LISTING_APPROVED',
    title: 'Your Ad is Now Live!',
    message: `Your ad "${listing.title}" has been approved and is now visible to buyers.`,
    link: `/marketplace/my-ads/${listing.id}`
  }
});

// Send email
await sendListingApprovedEmail(listing);

Response:
{
  success: true
}
```

**API Call - Reject:**
```javascript
PUT /api/admin/c2c/listings/c2c_listing_123/reject

Request:
{
  status: "REJECTED",
  rejectionReason: "Inappropriate images. Please upload clear photos of the actual product."
}

// Backend:
await prisma.c2CListing.update({
  where: { id: listingId },
  data: {
    status: 'REJECTED',
    rejectionReason: req.body.rejectionReason
  }
});

// Notify user
await prisma.notification.create({
  data: {
    userId: listing.userId,
    type: 'C2C_LISTING_REJECTED',
    title: 'Ad Not Approved',
    message: req.body.rejectionReason,
    link: `/marketplace/my-ads/${listing.id}`
  }
});
```

---

### **PHASE 2: MARKETPLACE BROWSING (BUYER SIDE)**

---

### **PAGE 4: MARKETPLACE LISTING PAGE**

**URL:** `/marketplace` or `/marketplace/[category]`

#### **UI Elements:**
- Breadcrumb: Home > Marketplace > Mobile Phones
- Search bar
- Filters (sidebar):
  - Price range
  - Location (city)
  - Condition
  - Brand (category-specific)
  - Posted date (Today, This week, This month)
  - Sort by (Newest, Price: Low to High, Price: High to Low)
- Listing cards grid:
  - Primary image
  - Title
  - Price
  - Location (city, area)
  - Posted date
  - "Featured" badge (if featured)
  - Heart icon (save for later)
- Pagination

#### **API Call:**
```javascript
GET /api/marketplace/listings?category=mobile-phones&city=mumbai&minPrice=20000&maxPrice=50000&condition=EXCELLENT&page=1&limit=20

Response:
{
  listings: [
    {
      id: "c2c_listing_123",
      title: "iPhone 13 Pro - 128GB - Excellent Condition",
      slug: "iphone-13-pro-128gb-excellent-condition",
      price: 45000,
      priceType: "NEGOTIABLE",
      primaryImage: "/uploads/c2c-listings/img1.jpg",
      location: {
        city: "Mumbai",
        area: "Andheri West"
      },
      condition: "EXCELLENT",
      postedDate: "2025-10-10T15:00:00Z",
      views: 23,
      isFeatured: false
    }
  ],
  totalCount: 145,
  page: 1,
  totalPages: 8,
  featuredListings: [
    // Featured listings shown at top
  ]
}
```

---

### **PAGE 5: LISTING DETAIL PAGE**

**URL:** `/marketplace/[listingId]/[slug]`

**Example:** `/marketplace/c2c_listing_123/iphone-13-pro-128gb`

#### **UI Elements:**

**Left Section:**
- Image gallery (primary + thumbnails, click to enlarge)
- Zoom on hover
- Lightbox for full-screen view

**Right Section:**
- Title
- Price (large, bold)
- "Negotiable" badge (if applicable)
- Posted date & location
- "Report" link

**Seller Info Card (limited):**
- Avatar (or initials)
- Name (first name only or "Seller")
- Member since
- Total ads posted
- "Verified Phone" badge (if verified)
- **Contact info HIDDEN** (blurred or replaced with "Pay ₹20 to reveal")

**CTA Buttons:**
- **"Show Contact Details" (primary)** → Pay reveal fee
- "Send Message" (if messaging enabled)
- "Save Ad" (heart icon)
- "Share" (social sharing)

**Description Section:**
- Full description
- Specifications table (if applicable)
- Accessories included
- Warranty info
- Reason for selling

**Similar Listings Section:**
- 4-6 similar ads

---

### **PAGE 6: REVEAL CONTACT FLOW**

**When user clicks "Show Contact Details":**

#### **Option 1: User has no reveal credits**

**Modal Opens:**
- "Unlock Contact Details"
- "To view seller's contact information, purchase reveal credits"
- Pricing options:
  - 1 Reveal: ₹20
  - 5 Reveals: ₹90 (Save ₹10)
  - 10 Reveals: ₹160 (Save ₹40)
- "Buy Now" button → Razorpay payment

**API Call - Purchase Reveals:**

```javascript
POST /api/marketplace/reveals/purchase

Request:
{
  package: "5_REVEALS" // or "1_REVEAL", "10_REVEALS"
}

// Backend:
async function purchaseReveals(req, res) {
  const { userId } = req.user;
  const { package } = req.body;
  
  const packages = {
    "1_REVEAL": { reveals: 1, price: 20 },
    "5_REVEALS": { reveals: 5, price: 90 },
    "10_REVEALS": { reveals: 10, price: 160 }
  };
  
  const selectedPackage = packages[package];
  
  // Create Razorpay order
  const razorpayOrder = await razorpay.orders.create({
    amount: selectedPackage.price * 100,
    currency: 'INR',
    receipt: `REVEAL_${userId}_${Date.now()}`
  });
  
  return res.json({
    razorpayOrderId: razorpayOrder.id,
    amount: selectedPackage.price,
    reveals: selectedPackage.reveals
  });
}

Response:
{
  razorpayOrderId: "order_xyz",
  amount: 90,
  reveals: 5
}
```

**After Payment Verified:**

```javascript
POST /api/marketplace/reveals/verify-payment

Request:
{
  razorpayPaymentId: "pay_xyz",
  razorpayOrderId: "order_xyz",
  razorpaySignature: "signature",
  package: "5_REVEALS"
}

// Backend:
async function verifyRevealPayment(req, res) {
  // 1. Verify signature (same as before)
  
  // 2. Credit reveals to user
  const user = await prisma.user.update({
    where: { id: userId },
    data: {
      revealCredits: {
        increment: reveals
      }
    }
  });
  
  // 3. Create payment record
  await prisma.payment.create({
    data: {
      userId,
      amount: selectedPackage.price,
      status: 'COMPLETED',
      gatewayId: razorpayPaymentId,
      type: 'REVEAL_CREDITS'
    }
  });
  
  return res.json({
    success: true,
    revealCredits: user.revealCredits
  });
}
```

---

#### **Option 2: User has reveal credits**

**Modal Opens:**
- "Unlock Contact Details"
- "You have 4 reveal credits remaining"
- "Use 1 credit to view seller's contact information?"
- "Confirm" button
- "Buy more credits" link

**API Call - Use Reveal Credit:**

```javascript
POST /api/marketplace/listings/c2c_listing_123/reveal

// Backend:
async function revealContact(req, res) {
  const { userId } = req.user;
  const { listingId } = req.params;
  
  // 1. Check if user has credits
  const user = await prisma.user.findUnique({ where: { id: userId } });
  
  if (user.revealCredits < 1) {
    return res.status(402).json({ error: 'Insufficient credits' });
  }
  
  // 2. Check if already revealed
  const existingReveal = await prisma.c2CInterest.findUnique({
    where: {
      userId_listingId: { userId, listingId }
    }
  });
  
  if (existingReveal) {
    // Already revealed, return contact info
    const listing = await prisma.c2CListing.findUnique({
      where: { id: listingId },
      select: {
        contactName: true,
        contactPhone: true,
        alternatePhone: true,
        contactEmail: true,
        preferredContact: true
      }
    });
    
    return res.json({
      success: true,
      contact: listing
    });
  }
  
  // 3. Deduct credit
  await prisma.user.update({
    where: { id: userId },
    data: {
      revealCredits: {
        decrement: 1
      }
    }
  });
  
  // 4. Create interest record (tracks who viewed contact)
  const interest = await prisma.c2CInterest.create({
    data: {
      userId,
      listingId,
      status: 'INTERESTED',
      revealedAt: new Date()
    }
  });
  
  // 5. Increment listing interest count
  await prisma.c2CListing.update({
    where: { id: listingId },
    data: {
      interestCount: { increment: 1 }
    }
  });
  
  // 6. Notify seller
  const listing = await prisma.c2CListing.findUnique({
    where: { id: listingId },
    include: { user: true }
  });
  
  await prisma.notification.create({
    data: {
      userId: listing.userId,
      type: 'C2C_INTEREST_RECEIVED',
      title: 'Someone is interested in your ad!',
      message: `${user.name} viewed contact details for "${listing.title}"`,
      link: `/marketplace/my-ads/${listing.id}/interests`
    }
  });
  
  // 7. Return contact info
  return res.json({
    success: true,
    contact: {
      contactName: listing.contactName,
      contactPhone: listing.contactPhone,
      alternatePhone: listing.alternatePhone,
      contactEmail: listing.contactEmail,
      preferredContact: listing.preferredContact
    }
  });
}

Response:
{
  success: true,
  contact: {
    contactName: "Rahul Sharma",
    contactPhone: "+91-9876543210",
    alternatePhone: "+91-9876543211",
    contactEmail: "rahul@example.com",
    preferredContact: "PHONE"
  }
}
```

---

**After Reveal:**

**UI Updates:**
- Contact info now visible (no longer blurred)
- Call button (opens phone dialer)
- WhatsApp button (opens WhatsApp chat)
- Email button (opens email client)
- "Mark as Contacted" button

---

### **PHASE 3: MANAGE LISTINGS (SELLER SIDE)**

---

### **PAGE 7: MY ADS**

**URL:** `/marketplace/my-ads`

#### **UI Elements:**
- Tabs: Active, Pending, Expired, Sold, Rejected
- Ad cards showing:
  - Image, title, price
  - Status badge
  - Views count
  - Interests count
  - Posted date
  - Actions: Edit, Mark as Sold, Renew, Delete
- "Post New Ad" button

#### **API Call:**
```javascript
GET /api/marketplace/my-ads?status=ACTIVE

Response:
{
  listings: [
    {
      id: "c2c_listing_123",
      title: "iPhone 13 Pro...",
      price: 45000,
      status: "ACTIVE",
      views: 156,
      interestCount: 8,
      postedDate: "2025-10-01",
      expiresAt: "2025-10-31",
      primaryImage: "/uploads/..."
    }
  ]
}
```

---

### **PAGE 8: AD INTERESTS**

**URL:** `/marketplace/my-ads/[listingId]/interests`

#### **UI Elements:**
- Ad info at top (title, price, image)
- List of interested buyers:
  - Name
  - When they viewed contact
  - Status (Contacted, Not Contacted)
- Total interests count

#### **API Call:**
```javascript
GET /api/marketplace/listings/c2c_listing_123/interests

Response:
{
  listing: {
    id: "c2c_listing_123",
    title: "iPhone 13 Pro...",
    interestCount: 8
  },
  interests: [
    {
      id: "interest_456",
      user: {
        name: "Amit Kumar",
        phone: "+91-9988776655" // Hidden from seller
      },
      revealedAt: "2025-10-10T15:30:00Z",
      status: "INTERESTED"
    }
  ]
}
```

---

### **PAGE 9: EDIT LISTING**

**URL:** `/marketplace/my-ads/[listingId]/edit`

**Same form as create listing, pre-filled with existing data**

**API Call:**
```javascript
PUT /api/marketplace/listings/c2c_listing_123

// Similar to create, but updates existing listing
// If significant changes (price, title), may require re-approval
```

---

### **MARK AS SOLD**

**API Call:**
```javascript
PUT /api/marketplace/listings/c2c_listing_123/mark-sold

// Backend:
await prisma.c2CListing.update({
  where: { id: listingId },
  data: {
    status: 'SOLD',
    isActive: false,
    soldAt: new Date()
  }
});

Response:
{
  success: true,
  message: "Ad marked as sold and removed from listings"
}
```

---

### **RENEW EXPIRED LISTING**

**API Call:**
```javascript
POST /api/marketplace/listings/c2c_listing_123/renew

// Backend:
await prisma.c2CListing.update({
  where: { id: listingId },
  data: {
    status: 'ACTIVE',
    isActive: true,
    expiresAt: addDays(new Date(), 30),
    renewedAt: new Date()
  }
});

Response:
{
  success: true,
  message: "Ad renewed for 30 days"
}
```

---

### **PHASE 4: FEATURED LISTINGS**

---

### **FEATURE LISTING (OPTIONAL)**

**URL:** `/marketplace/my-ads/[listingId]/promote`

#### **UI Elements:**
- "Boost Your Ad" title
- Benefits:
  - Appear at top of listings
  - Highlighted with badge
  - More visibility
- Duration options:
  - 7 days - ₹199
  - 15 days - ₹349
  - 30 days - ₹599
- "Promote Now" button

#### **API Call:**

```javascript
POST /api/marketplace/listings/c2c_listing_123/promote

Request:
{
  duration: 15 // days
}

// Backend:
const pricing = {
  7: 199,
  15: 349,
  30: 599
};

const amount = pricing[duration];

// Create Razorpay order
const razorpayOrder = await razorpay.orders.create({
  amount: amount * 100,
  currency: 'INR',
  receipt: `FEATURED_${listingId}`
});

// After payment verified:
await prisma.c2CListing.update({
  where: { id: listingId },
  data: {
    isFeatured: true,
    featuredUntil: addDays(new Date(), duration)
  }
});

await prisma.payment.create({
  data: {
    userId,
    amount,
    status: 'COMPLETED',
    type: 'FEATURED_LISTING',
    listingId
  }
});
```

---

### **AUTO-EXPIRY (CRON JOB)**

**Runs daily:**

```javascript
// Expire listings after 30 days
const expiredListings = await prisma.c2CListing.updateMany({
  where: {
    status: 'ACTIVE',
    expiresAt: {
      lte: new Date()
    }
  },
  data: {
    status: 'EXPIRED',
    isActive: false
  }
});

// Notify sellers
for (const listing of expiredListings) {
  await prisma.notification.create({
    data: {
      userId: listing.userId,
      type: 'C2C_LISTING_EXPIRED',
      title: 'Your Ad Has Expired',
      message: `Your ad "${listing.title}" has expired. Renew it to make it live again.`,
      link: `/marketplace/my-ads/${listing.id}`
    }
  });
}
```

---

## 📊 C2C ANALYTICS

### **User Analytics (My Ads):**

**API Call:**
```javascript
GET /api/marketplace/my-ads/analytics

Response:
{
  totalListings: 5,
  activeListings: 3,
  soldListings: 8,
  totalViews: 456,
  totalInterests: 34,
  
  topPerforming: {
    listing: {
      title: "iPhone 13 Pro...",
      views: 156,
      interests: 12
    }
  },
  
  averageTimeToSell: 12 // days
}
```

### **Admin C2C Analytics:**

**API Call:**
```javascript
GET /api/admin/analytics/c2c?period=month

Response:
{
  revenue: {
    revealFees: 45600, // Total from reveal purchases
    featuredListings: 12400,
    total: 58000
  },
  
  listings: {
    total: 2456,
    active: 1890,
    pending: 145,
    expired: 321,
    sold: 567
  },
  
  reveals: {
    totalPurchased: 2280,
    totalUsed: 1845,
    unused: 435
  },
  
  topCategories: [
    {category: "Mobile Phones", listings: 456, revenue: 12400},
    {category: "Vehicles", listings: 234, revenue: 8900}
  ],
  
  userEngagement: {
    averageViewsPerListing: 45,
    averageInterestsPerListing: 3.2,
    conversionRate: 23 // % of listings marked sold
  }
}
```

---

## 💾 COMPLETE DATABASE FLOW

### **C2C Lifecycle:**

```sql
-- 1. User creates listing
INSERT INTO c2c_listings (
  user_id, category_id, title, description, 
  price, location, contact_phone, status
)
INSERT INTO c2c_listing_images (listing_id, url, is_primary)

-- 2. Admin approves
UPDATE c2c_listings 
SET status = 'ACTIVE', is_active = TRUE, approved_at = NOW()

-- 3. Buyer views listing
UPDATE c2c_listings SET views = views + 1

-- 4. Buyer purchases reveals
UPDATE users SET reveal_credits = reveal_credits + 5
INSERT INTO payments (user_id, amount, type, status)

-- 5. Buyer reveals contact
UPDATE users SET reveal_credits = reveal_credits - 1
INSERT INTO c2c_interests (user_id, listing_id, status, revealed_at)
UPDATE c2c_listings SET interest_count = interest_count + 1

-- 6. Seller marks as sold
UPDATE c2c_listings 
SET status = 'SOLD', is_active = FALSE, sold_at = NOW()

-- 7. Listing expires (cron job)
UPDATE c2c_listings 
SET status = 'EXPIRED', is_active = FALSE
WHERE expires_at <= NOW() AND status = 'ACTIVE'
```

---

## ✅ C2C CHECKLIST

**Seller Features:**
- [ ] Create listing form (category-specific)
- [ ] Photo upload (max 10)
- [ ] Admin approval workflow
- [ ] My Ads dashboard
- [ ] Edit listing
- [ ] Mark as sold
- [ ] Renew expired listings
- [ ] View interested buyers
- [ ] Featured listing promotion

**Buyer Features:**
- [ ] Browse marketplace
- [ ] Search & filters
- [ ] View listing details
- [ ] Purchase reveal credits
- [ ] Reveal contact info
- [ ] Save ads (favorites)
- [ ] Report inappropriate ads

**Admin Features:**
- [ ] Approve/reject listings
- [ ] Monitor spam
- [ ] View analytics
- [ ] Manage categories
- [ ] Set pricing (reveal fees, featured costs)

**Revenue:**
- [ ] Reveal fee payment
- [ ] Bulk reveal packages
- [ ] Featured listing fee
- [ ] Premium badge (optional)

**Technical:**
- [ ] Auto-expiry cron job
- [ ] Spam prevention (rate limiting)
- [ ] Phone verification
- [ ] Image moderation
- [ ] Payment integration
- [ ] Notification system

---

**END OF PART 4 - C2C MARKETPLACE FLOW**

**Next:** [COMPLETEFLOW_5_ADMIN.md](./COMPLETEFLOW_5_ADMIN.md) - Complete Admin Panel Workflows


# 🎛️ COMPLETE FLOW - ADMIN PANEL (All Business Models)

> **Part 5 of 5** - Comprehensive admin panel workflows for E-Commerce, B2C, B2B, and C2C  
> Last Updated: October 10, 2025

---

## 📋 OVERVIEW

**Admin Panel Purpose:** Centralized control center for managing all four business models on the Grap Deal platform.

**Key Responsibilities:**
- ✅ Approve/reject applications (vendors, businesses, listings)
- ✅ Manage orders across all models
- ✅ Process payouts (vendors, businesses)
- ✅ Monitor platform analytics
- ✅ Handle customer support
- ✅ Configure platform settings
- ✅ Manage users & roles
- ✅ Content moderation

---

## 🏗️ ADMIN PANEL STRUCTURE

```
/admin
├── /dashboard (Overview)
├── /ecommerce
│   ├── /products
│   ├── /inventory
│   ├── /orders
│   └── /analytics
├── /b2c
│   ├── /vendor-applications
│   ├── /vendors (approved)
│   ├── /products (pending approval)
│   ├── /orders
│   ├── /payouts
│   └── /analytics
├── /b2b
│   ├── /business-applications
│   ├── /businesses (approved)
│   ├── /services (pending approval)
│   ├── /subscriptions
│   ├── /leads
│   └── /analytics
├── /c2c
│   ├── /listings (pending, active, reported)
│   ├── /users
│   ├── /reveals
│   └── /analytics
├── /customers
│   ├── /users (all customers)
│   ├── /kyc
│   └── /reviews
├── /content
│   ├── /categories
│   ├── /banners
│   ├── /pages
│   └── /faqs
├── /reports
│   ├── /sales
│   ├── /revenue
│   ├── /payouts
│   └── /user-activity
├── /settings
│   ├── /general
│   ├── /payment
│   ├── /logistics
│   ├── /notifications
│   └── /roles
└── /support
    ├── /tickets
    ├── /chat
    └── /feedback
```

---

## 📄 DETAILED PAGE-BY-PAGE FLOW

---

## 1. ADMIN DASHBOARD (OVERVIEW)

**URL:** `/admin/dashboard`

### **UI Elements:**

**Top Stats Cards (All Models Combined):**
```javascript
{
  revenue: {
    today: 45670,
    thisMonth: 1245600,
    growth: +12.5 // % vs last month
  },
  
  orders: {
    pending: 23,
    processing: 45,
    shipped: 67,
    total: 1245 // this month
  },
  
  users: {
    total: 12456,
    new: 234, // this month
    active: 8945 // last 30 days
  },
  
  pendingApprovals: {
    vendors: 8,
    businesses: 5,
    products: 34,
    services: 12,
    c2cListings: 67
  }
}
```

**Revenue Chart:**
- Line/Bar chart showing revenue by business model
- Filters: Today, This Week, This Month, This Year

**Quick Actions:**
- "Approve Vendor Applications (8)" → Takes to B2C vendor applications
- "Approve Products (34)" → B2C/E-Commerce pending products
- "Process Payouts (12)" → Vendor payouts page
- "Review C2C Listings (67)" → C2C pending listings

**Recent Orders Table:**
- Shows last 10 orders across all models
- Columns: Order #, Type (E-Commerce/B2C/etc), Customer, Amount, Status, Date
- Click to view details

**Notifications Panel:**
- Real-time notifications
- New applications, orders, support tickets, etc.

### **API Call:**

```javascript
GET /api/admin/dashboard

Response:
{
  stats: {
    revenue: {...},
    orders: {...},
    users: {...},
    pendingApprovals: {...}
  },
  
  revenueByModel: {
    labels: ['E-Commerce', 'B2C', 'B2B', 'C2C'],
    data: [456000, 234500, 312500, 45600]
  },
  
  recentOrders: [
    {
      id: "order_123",
      orderNumber: "EC1728563421",
      type: "E_COMMERCE",
      customer: {name: "John Doe"},
      total: 6048,
      status: "PENDING",
      orderDate: "2025-10-10T10:30:00Z"
    }
  ],
  
  notifications: [
    {
      id: "notif_1",
      type: "VENDOR_APPLICATION",
      message: "New vendor application from ABC Electronics",
      link: "/admin/b2c/vendor-applications/vendor_123",
      createdAt: "2025-10-10T11:00:00Z",
      isRead: false
    }
  ]
}
```

---

## 2. E-COMMERCE MANAGEMENT

---

### **2.1 E-COMMERCE PRODUCTS**

**URL:** `/admin/ecommerce/products`

**Tabs:** All, Active, Inactive, Out of Stock

#### **Products Table:**
- Columns: Image, Name, SKU, Price, Stock, Status, Actions
- Filters: Category, Price range, Stock status
- Search by name/SKU
- Bulk actions: Activate, Deactivate, Delete

#### **Actions:**
- "Add New Product" button
- Edit product
- View product analytics
- Manage inventory

#### **API Call:**
```javascript
GET /api/admin/ecommerce/products?status=ACTIVE&page=1&limit=20

Response:
{
  products: [
    {
      id: "prod_123",
      name: "Premium Headphones",
      sku: "EC-HEAD-001",
      basePrice: 2999,
      comparePrice: 3999,
      category: {name: "Electronics"},
      inventory: {quantity: 50, reservedQty: 5},
      status: "ACTIVE",
      images: [{url: "...", isPrimary: true}]
    }
  ],
  totalCount: 145,
  page: 1,
  totalPages: 8
}
```

---

### **2.2 E-COMMERCE INVENTORY**

**URL:** `/admin/ecommerce/inventory`

#### **UI Elements:**
- Inventory table:
  - Product name, SKU
  - Available stock
  - Reserved stock
  - Min stock level
  - Status (In Stock, Low Stock, Out of Stock)
- "Low Stock Alert" filter
- "Bulk Update Stock" button

#### **Low Stock Alerts:**

**API Call:**
```javascript
GET /api/admin/ecommerce/inventory/low-stock

Response:
{
  lowStockProducts: [
    {
      product: {
        id: "prod_123",
        name: "Wireless Mouse",
        sku: "EC-MOUSE-001"
      },
      quantity: 5,
      minStockLevel: 20,
      reserved: 2,
      available: 3
    }
  ]
}
```

#### **Update Stock:**

**API Call:**
```javascript
PUT /api/admin/ecommerce/inventory/prod_123

Request:
{
  quantity: 50,
  minStockLevel: 20
}

Response:
{
  success: true
}
```

---

### **2.3 E-COMMERCE ORDERS**

**URL:** `/admin/ecommerce/orders`

**Tabs:** All, Pending, Processing, Shipped, Delivered, Cancelled

#### **Orders Table:**
- Order #, Customer, Items, Amount, Status, Date, Actions
- Search by order number/customer name
- Filters: Status, Date range

#### **Order Actions:**
- View details
- Assign delivery partner
- Mark as shipped
- Cancel order
- Download invoice

**(Detailed order flow covered in COMPLETEFLOW_1_ECOMMERCE.md)**

---

### **2.4 E-COMMERCE ANALYTICS**

**URL:** `/admin/ecommerce/analytics`

#### **Metrics:**
- Total sales (graph)
- Top selling products
- Category performance
- Revenue by day/week/month
- Average order value
- Fulfillment metrics (time to ship, delivery rate)

**API Call:**
```javascript
GET /api/admin/ecommerce/analytics?period=month

Response:
{
  sales: {
    totalOrders: 456,
    totalRevenue: 567800,
    averageOrderValue: 1245,
    growth: +15.2
  },
  
  topProducts: [
    {
      product: {name: "Premium Headphones", id: "prod_123"},
      unitsSold: 89,
      revenue: 266911
    }
  ],
  
  categoryPerformance: [
    {category: "Electronics", revenue: 345600, orders: 234}
  ],
  
  fulfillmentMetrics: {
    averageProcessingTime: 1.5, // days
    averageDeliveryTime: 3.2, // days
    deliverySuccessRate: 98.5 // %
  }
}
```

---

## 3. B2C (VENDOR) MANAGEMENT

---

### **3.1 VENDOR APPLICATIONS**

**URL:** `/admin/b2c/vendor-applications`

**Tabs:** Pending, Approved, Rejected

#### **Applications Table:**
- Business name, Owner name, Email, Phone, Category, Applied date, Actions
- Search by name/email
- Filters: Category, Date range

#### **View Application:**

**URL:** `/admin/b2c/vendor-applications/[vendorId]`

**UI Elements:**
- Business details
- Contact information
- Bank details
- KYC documents (view/download)
- Verification checklist:
  - [ ] PAN verified
  - [ ] GST verified (if applicable)
  - [ ] Bank account verified
  - [ ] Documents clear and valid
- Commission rate input (default 15%)
- Approve/Reject buttons
- Notes field

**API Call:**
```javascript
GET /api/admin/vendor-applications/vendor_123

Response:
{
  vendor: {
    id: "vendor_123",
    businessName: "ABC Electronics",
    businessType: "PROPRIETORSHIP",
    owner: {name: "Rajesh Kumar", email: "...", phone: "..."},
    gstin: "27XXXXX1234X1ZX",
    panNumber: "ABCDE1234F",
    bankDetails: {...},
    kycDocuments: [
      {type: "PAN_CARD", url: "...", status: "PENDING"},
      {type: "GST_CERTIFICATE", url: "...", status: "PENDING"}
    ],
    appliedDate: "2025-10-10",
    status: "PENDING"
  }
}
```

#### **Approve Vendor:**

**API Call:**
```javascript
PUT /api/admin/vendor-applications/vendor_123/approve

Request:
{
  commissionRate: 15,
  notes: "All documents verified. Approved."
}

// (Implementation covered in COMPLETEFLOW_2_B2C.md)
```

---

### **3.2 APPROVED VENDORS**

**URL:** `/admin/b2c/vendors`

**Tabs:** Active, Inactive, Suspended

#### **Vendors Table:**
- Business name, Owner, Products, Orders, Revenue, Commission Earned, Status, Actions
- Search, filters

#### **Vendor Profile:**

**URL:** `/admin/b2c/vendors/[vendorId]`

**Tabs:**
- **Overview:** Stats, recent orders, products
- **Products:** All vendor products
- **Orders:** All orders for this vendor
- **Payouts:** Payout history
- **Settings:** Commission rate, status (active/suspended)

**API Call:**
```javascript
GET /api/admin/vendors/vendor_123

Response:
{
  vendor: {
    id: "vendor_123",
    businessName: "ABC Electronics",
    status: "APPROVED",
    commissionRate: 15,
    stats: {
      totalProducts: 24,
      activeProducts: 20,
      totalOrders: 156,
      totalRevenue: 456000,
      platformEarnings: 68400
    }
  }
}
```

---

### **3.3 B2C PRODUCT APPROVALS**

**URL:** `/admin/b2c/products/pending`

**Similar to vendor applications:**
- Review product details
- Check images
- Verify pricing
- Approve/Reject

**(Covered in COMPLETEFLOW_2_B2C.md)**

---

### **3.4 B2C ORDERS**

**URL:** `/admin/b2c/orders`

**Same as E-Commerce orders, but filtered to B2C model**

---

### **3.5 VENDOR PAYOUTS**

**URL:** `/admin/b2c/payouts`

**Tabs:** Pending, Processing, Completed

#### **Payout Requests Table:**
- Vendor name, Amount, Orders count, Bank details, Requested date, Actions
- Search by vendor name
- Filters: Amount range, Date

#### **Process Payout:**

**URL:** `/admin/b2c/payouts/[payoutRequestId]`

**UI Elements:**
- Vendor details
- Bank account info
- Order breakdown (list of orders in this payout)
- Total calculation:
  - Order amounts
  - Platform commission
  - Shipping charges (if platform logistics)
  - Net amount to vendor
- UTR number input
- "Mark as Processed" button

**API Call:**
```javascript
GET /api/admin/payouts/payout_req_123

Response:
{
  payoutRequest: {
    id: "payout_req_123",
    vendor: {businessName: "ABC Electronics", userId: "user_456"},
    amount: 125000,
    orderCount: 45,
    bankDetails: {...},
    requestedAt: "2025-10-05",
    status: "PENDING",
    orderBreakdown: [
      {
        orderId: "order_789",
        orderNumber: "B2C1728563500",
        orderAmount: 5000,
        commission: 750,
        shipping: 50,
        netVendorAmount: 4200
      }
    ]
  }
}
```

**(Process payout covered in COMPLETEFLOW_2_B2C.md)**

---

### **3.6 B2C ANALYTICS**

**URL:** `/admin/b2c/analytics`

**Metrics:**
- Total vendors (active, inactive)
- Total B2C revenue
- Platform commission earned
- Top vendors by revenue
- Payout metrics
- Average order value

**(Covered in COMPLETEFLOW_2_B2C.md)**

---

## 4. B2B (BUSINESS SERVICES) MANAGEMENT

---

### **4.1 BUSINESS APPLICATIONS**

**URL:** `/admin/b2b/applications`

**Similar to vendor applications:**
- Review business details
- Verify KYC documents
- Check subscription payment
- Approve/Reject

**(Covered in COMPLETEFLOW_3_B2B.md)**

---

### **4.2 APPROVED BUSINESSES**

**URL:** `/admin/b2b/businesses`

#### **Businesses Table:**
- Business name, Owner, Subscription plan, Services, Leads, Status, Actions

#### **Business Profile:**

**URL:** `/admin/b2b/businesses/[businessId]`

**Tabs:**
- **Overview:** Stats, subscription info
- **Services:** All services listed
- **Leads:** Leads received
- **Subscription:** Plan details, billing history
- **Settings:** Change plan, suspend account

**API Call:**
```javascript
GET /api/admin/businesses/biz_123

Response:
{
  business: {
    id: "biz_123",
    businessName: "XYZ Consulting",
    subscription: {
      planName: "Professional",
      status: "ACTIVE",
      startDate: "2025-09-01",
      endDate: "2025-10-01",
      autoRenew: true
    },
    stats: {
      totalServices: 8,
      profileViews: 456,
      leadsReceived: 34,
      conversionRate: 41.2
    }
  }
}
```

---

### **4.3 SERVICE APPROVALS**

**URL:** `/admin/b2b/services/pending`

**Service Review:**
- Business name
- Service name, description
- Pricing
- Images
- Approve/Reject

**(Covered in COMPLETEFLOW_3_B2B.md)**

---

### **4.4 SUBSCRIPTIONS**

**URL:** `/admin/b2b/subscriptions`

**Tabs:** Active, Expiring Soon, Expired, Cancelled

#### **Subscriptions Table:**
- Business name, Plan, Amount, Start date, End date, Auto-renew, Status, Actions

#### **Actions:**
- View details
- Change plan
- Cancel subscription
- Issue refund

**API Call:**
```javascript
GET /api/admin/subscriptions?status=ACTIVE

Response:
{
  subscriptions: [
    {
      id: "sub_456",
      business: {name: "XYZ Consulting", id: "biz_123"},
      planName: "Professional",
      amount: 2499,
      billingCycle: "MONTHLY",
      startDate: "2025-09-01",
      endDate: "2025-10-01",
      autoRenew: true,
      status: "ACTIVE"
    }
  ]
}
```

---

### **4.5 LEAD MANAGEMENT**

**URL:** `/admin/b2b/leads`

#### **Leads Overview:**
- Total leads generated (per month)
- Leads by service category
- Leads by business
- Conversion rate (if tracked)

**API Call:**
```javascript
GET /api/admin/b2b/leads?period=month

Response:
{
  stats: {
    totalLeads: 3456,
    leadsThisMonth: 456,
    averagePerBusiness: 12,
    topCategories: [
      {category: "Accounting", leads: 234},
      {category: "Legal", leads: 189}
    ]
  }
}
```

---

### **4.6 B2B ANALYTICS**

**URL:** `/admin/b2b/analytics`

**Metrics:**
- Subscription revenue (recurring)
- New signups vs cancellations
- Churn rate
- Average revenue per business
- Top service categories
- Lead conversion rates

**(Covered in COMPLETEFLOW_3_B2B.md)**

---

## 5. C2C (MARKETPLACE) MANAGEMENT

---

### **5.1 LISTING APPROVALS**

**URL:** `/admin/c2c/listings/pending`

**Tabs:** Pending, Approved, Rejected, Reported

#### **Listings Table:**
- Image, Title, Category, Seller, Price, Location, Posted date, Actions

#### **Review Listing:**

**URL:** `/admin/c2c/listings/[listingId]`

**UI Elements:**
- All listing details
- Images (full view)
- Seller info
- Approval checklist:
  - [ ] Images are clear and appropriate
  - [ ] Title is descriptive
  - [ ] Price is reasonable
  - [ ] Not spam/duplicate
  - [ ] Contact info valid
- Approve/Reject buttons
- Notes field

**API Call:**
```javascript
GET /api/admin/c2c/listings/c2c_listing_123

Response:
{
  listing: {
    id: "c2c_listing_123",
    title: "iPhone 13 Pro...",
    description: "...",
    price: 45000,
    category: {name: "Mobile Phones"},
    seller: {name: "Rahul Sharma", email: "...", phone: "..."},
    images: [{url: "...", isPrimary: true}],
    location: {city: "Mumbai", area: "Andheri West"},
    status: "PENDING",
    submittedAt: "2025-10-10T14:00:00Z"
  }
}
```

**(Approve/Reject covered in COMPLETEFLOW_4_C2C.md)**

---

### **5.2 ACTIVE LISTINGS**

**URL:** `/admin/c2c/listings/active`

**Monitor active listings:**
- Total active listings
- Views, interests
- Featured listings
- Expired listings

---

### **5.3 REPORTED LISTINGS**

**URL:** `/admin/c2c/listings/reported`

**When users report a listing:**

**Reports Table:**
- Listing title, Reporter, Reason, Date, Status, Actions

#### **View Report:**

**UI Elements:**
- Listing details
- Reporter info
- Reason for report (Spam, Inappropriate, Fraud, etc.)
- Additional comments
- Actions:
  - Dismiss report (listing is fine)
  - Remove listing (if violation)
  - Suspend user (if repeated violations)

**API Call:**
```javascript
GET /api/admin/c2c/reports

Response:
{
  reports: [
    {
      id: "report_789",
      listing: {
        id: "c2c_listing_456",
        title: "Fake iPhone listing"
      },
      reporter: {name: "Amit Kumar", id: "user_999"},
      reason: "FRAUD",
      comments: "This is a scam listing. Images are from internet.",
      reportedAt: "2025-10-10T16:00:00Z",
      status: "PENDING"
    }
  ]
}
```

#### **Take Action:**

```javascript
PUT /api/admin/c2c/reports/report_789/resolve

Request:
{
  action: "REMOVE_LISTING", // or "DISMISS" or "SUSPEND_USER"
  notes: "Listing removed. Fake product images."
}

// Backend:
if (action === 'REMOVE_LISTING') {
  await prisma.c2CListing.update({
    where: { id: listing.id },
    data: {
      status: 'REMOVED',
      isActive: false,
      removalReason: notes
    }
  });
  
  // Notify seller
  await prisma.notification.create({
    data: {
      userId: listing.userId,
      type: 'LISTING_REMOVED',
      title: 'Your listing has been removed',
      message: notes,
      link: '/marketplace/my-ads'
    }
  });
}

if (action === 'SUSPEND_USER') {
  await prisma.user.update({
    where: { id: listing.userId },
    data: { isActive: false }
  });
}

await prisma.c2CReport.update({
  where: { id: reportId },
  data: {
    status: 'RESOLVED',
    resolvedBy: adminId,
    resolvedAt: new Date(),
    resolution: notes
  }
});
```

---

### **5.4 C2C USERS**

**URL:** `/admin/c2c/users`

**Users Table:**
- Name, Email, Total listings, Sold items, Reveal credits, Status, Actions

#### **User Profile:**

**URL:** `/admin/c2c/users/[userId]`

**Tabs:**
- **Overview:** Stats, recent activity
- **Listings:** All listings (active, sold, expired)
- **Interests:** Listings where user revealed contact
- **Transactions:** Reveal purchases, featured listing purchases
- **Actions:** Suspend, Ban, Delete

**API Call:**
```javascript
GET /api/admin/c2c/users/user_456

Response:
{
  user: {
    id: "user_456",
    name: "Rahul Sharma",
    email: "rahul@example.com",
    phone: "+91-9876543210",
    phoneVerified: true,
    revealCredits: 3,
    stats: {
      totalListings: 12,
      activeListings: 5,
      soldListings: 6,
      expiredListings: 1,
      totalRevealPurchases: 4,
      totalSpent: 160
    },
    status: "ACTIVE",
    joinedAt: "2024-05-15"
  }
}
```

---

### **5.5 REVEAL ANALYTICS**

**URL:** `/admin/c2c/reveals`

**Metrics:**
- Total reveals purchased
- Total reveals used
- Unused credits
- Revenue from reveals
- Bulk package breakdown (1/5/10 reveals)

**API Call:**
```javascript
GET /api/admin/c2c/reveals/analytics?period=month

Response:
{
  reveals: {
    totalPurchased: 2280,
    totalUsed: 1845,
    unused: 435,
    revenue: 45600
  },
  
  packageBreakdown: {
    single: {count: 456, revenue: 9120},
    bulk5: {count: 189, revenue: 17010},
    bulk10: {count: 67, revenue: 10720}
  },
  
  topCategories: [
    {category: "Mobile Phones", reveals: 567},
    {category: "Vehicles", reveals: 234}
  ]
}
```

---

### **5.6 C2C ANALYTICS**

**URL:** `/admin/c2c/analytics`

**(Covered in COMPLETEFLOW_4_C2C.md)**

---

## 6. CUSTOMER MANAGEMENT

---

### **6.1 ALL USERS**

**URL:** `/admin/customers`

**Tabs:** All, Customers, Vendors, Business Owners

#### **Users Table:**
- Name, Email, Phone, Role, Status, Joined date, Total orders, Total spent, Actions

**Search & Filters:**
- Search by name/email/phone
- Filter by role, status, date range

**API Call:**
```javascript
GET /api/admin/users?role=USER&status=ACTIVE&page=1&limit=50

Response:
{
  users: [
    {
      id: "user_123",
      name: "John Doe",
      email: "john@example.com",
      phone: "+91-9876543210",
      role: "USER",
      status: "ACTIVE",
      emailVerified: true,
      phoneVerified: true,
      joinedAt: "2024-08-10",
      stats: {
        totalOrders: 12,
        totalSpent: 45600
      }
    }
  ],
  totalCount: 12456,
  page: 1,
  totalPages: 250
}
```

---

### **6.2 USER PROFILE**

**URL:** `/admin/customers/[userId]`

**Tabs:**
- **Overview:** Basic info, stats
- **Orders:** All orders placed
- **Addresses:** Saved addresses
- **Reviews:** Product/service reviews
- **Wallet:** Balance, transactions (if wallet feature exists)
- **Activity:** Login history, recent actions
- **Actions:** Suspend, Delete, Reset password

**API Call:**
```javascript
GET /api/admin/users/user_123

Response:
{
  user: {
    id: "user_123",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91-9876543210",
    role: "USER",
    status: "ACTIVE",
    avatar: "/uploads/...",
    joinedAt: "2024-08-10",
    lastLogin: "2025-10-10T09:00:00Z",
    stats: {
      totalOrders: 12,
      totalSpent: 45600,
      averageOrderValue: 3800,
      savedAddresses: 3,
      reviewsGiven: 5
    }
  },
  recentOrders: [...],
  addresses: [...]
}
```

---

### **6.3 KYC MANAGEMENT**

**URL:** `/admin/customers/kyc`

**Tabs:** Pending, Approved, Rejected

**KYC Requests Table:**
- User name, Document type, Status, Submitted date, Actions

**Review KYC:**

**URL:** `/admin/customers/kyc/[kycId]`

**UI Elements:**
- User info
- Document images (view/download)
- Document details (number, type)
- Verification checklist
- Approve/Reject buttons

**API Call:**
```javascript
GET /api/admin/kyc?status=PENDING

Response:
{
  kycDocuments: [
    {
      id: "kyc_789",
      user: {name: "Amit Kumar", id: "user_456"},
      documentType: "AADHAAR_CARD",
      documentUrl: "/uploads/kyc/aadhaar_456.jpg",
      documentNumber: "1234-5678-9012",
      status: "PENDING",
      submittedAt: "2025-10-10"
    }
  ]
}
```

---

### **6.4 REVIEWS & RATINGS**

**URL:** `/admin/customers/reviews`

**Tabs:** All, Pending Moderation, Reported

**Reviews Table:**
- Product/Service name, User, Rating, Comment, Date, Status, Actions

**Moderate Review:**
- Approve (if pending)
- Remove (if inappropriate)
- Reply (admin response)

**API Call:**
```javascript
GET /api/admin/reviews?status=PENDING

Response:
{
  reviews: [
    {
      id: "review_123",
      product: {name: "Premium Headphones", id: "prod_123"},
      user: {name: "Amit Kumar", id: "user_456"},
      rating: 5,
      comment: "Excellent product! Highly recommend.",
      images: ["/uploads/reviews/img1.jpg"],
      createdAt: "2025-10-10",
      status: "PENDING"
    }
  ]
}
```

---

## 7. CONTENT MANAGEMENT

---

### **7.1 CATEGORIES**

**URL:** `/admin/content/categories`

**Tabs:** All, E-Commerce, B2C, B2B, C2C

**Categories Table:**
- Name, Parent category, Products count, Status, Actions

**Add/Edit Category:**
- Name
- Slug
- Parent category (for subcategories)
- Icon/Image
- Description
- Business model (E-Commerce, B2C, etc.)
- Meta tags (SEO)

**API Call:**
```javascript
GET /api/admin/categories

Response:
{
  categories: [
    {
      id: "cat_1",
      name: "Electronics",
      slug: "electronics",
      parentId: null,
      businessModel: ["E_COMMERCE", "B2C", "C2C"],
      productsCount: 456,
      isActive: true,
      subcategories: [
        {id: "cat_2", name: "Mobile Phones", productsCount: 123}
      ]
    }
  ]
}
```

---

### **7.2 BANNERS**

**URL:** `/admin/content/banners`

**Banners Table:**
- Image, Title, Link, Location (Homepage, Category page, etc.), Active, Order, Actions

**Add/Edit Banner:**
- Title
- Image upload
- Link URL
- Display location (Homepage Hero, Category Hero, Sidebar, etc.)
- Target (New tab/Same tab)
- Active status
- Display order (priority)
- Start date, End date (optional, for campaigns)

**API Call:**
```javascript
GET /api/admin/banners

Response:
{
  banners: [
    {
      id: "banner_1",
      title: "Diwali Sale 2025",
      imageUrl: "/uploads/banners/diwali-sale.jpg",
      linkUrl: "/deals/diwali",
      location: "HOMEPAGE_HERO",
      isActive: true,
      displayOrder: 1,
      startDate: "2025-10-20",
      endDate: "2025-11-10"
    }
  ]
}
```

---

### **7.3 PAGES**

**URL:** `/admin/content/pages`

**Manage static pages:**
- About Us
- Terms & Conditions
- Privacy Policy
- Refund Policy
- Shipping Policy
- Contact Us
- FAQs

**Edit Page:**
- Title
- Slug (URL path)
- Content (Rich text editor)
- Meta description (SEO)
- Meta keywords

**API Call:**
```javascript
GET /api/admin/pages/about-us

Response:
{
  page: {
    id: "page_about",
    title: "About Us",
    slug: "about-us",
    content: "<p>Welcome to Grap Deal...</p>",
    metaDescription: "Learn about Grap Deal...",
    lastUpdated: "2025-09-01"
  }
}
```

---

### **7.4 FAQs**

**URL:** `/admin/content/faqs`

**FAQs Table:**
- Question, Category, Order, Active, Actions

**Add/Edit FAQ:**
- Question
- Answer (rich text)
- Category (General, Orders, Payments, Returns, etc.)
- Display order
- Active status

---

## 8. REPORTS & ANALYTICS

---

### **8.1 SALES REPORT**

**URL:** `/admin/reports/sales`

**Filters:**
- Date range
- Business model
- Category
- Export to CSV/Excel

**Metrics:**
- Total sales
- Number of orders
- Average order value
- Sales by category
- Sales by day/week/month
- Top selling products

**API Call:**
```javascript
GET /api/admin/reports/sales?startDate=2025-10-01&endDate=2025-10-31&model=ALL

Response:
{
  summary: {
    totalSales: 1245600,
    totalOrders: 1456,
    averageOrderValue: 855,
    growth: +12.5
  },
  
  salesByModel: {
    E_COMMERCE: 567800,
    B2C: 423500,
    B2B: 212300,
    C2C: 42000
  },
  
  salesByDay: [
    {date: "2025-10-01", sales: 45600, orders: 56},
    {date: "2025-10-02", sales: 38900, orders: 48}
  ],
  
  topProducts: [
    {product: {name: "Premium Headphones"}, revenue: 89000, units: 30}
  ]
}
```

---

### **8.2 REVENUE REPORT**

**URL:** `/admin/reports/revenue`

**Revenue Breakdown:**
- E-Commerce revenue (net profit)
- B2C commission earned
- B2B subscription revenue
- C2C reveal fees & featured listing fees
- Total platform revenue

**Charts:**
- Revenue by business model (pie chart)
- Revenue trend (line graph)
- Monthly comparison

**API Call:**
```javascript
GET /api/admin/reports/revenue?period=month

Response:
{
  totalRevenue: 345600,
  
  breakdown: {
    ecommerce: {
      sales: 567800,
      costs: 345000, // Product cost + logistics
      netProfit: 222800
    },
    b2c: {
      vendorSales: 423500,
      commission: 63525 // 15% average
    },
    b2b: {
      subscriptions: 312500
    },
    c2c: {
      revealFees: 45600,
      featuredListings: 12400,
      total: 58000
    }
  },
  
  totalPlatformRevenue: 656825 // Sum of net profits
}
```

---

### **8.3 PAYOUT REPORT**

**URL:** `/admin/reports/payouts`

**Payout Summary:**
- Total payouts processed (by period)
- Pending payouts
- Vendor-wise breakdown
- Business-wise breakdown (if B2B has payouts)

**API Call:**
```javascript
GET /api/admin/reports/payouts?period=month

Response:
{
  summary: {
    totalProcessed: 678900,
    totalPending: 125000,
    vendorCount: 45
  },
  
  payoutsByVendor: [
    {
      vendor: {businessName: "ABC Electronics", id: "vendor_123"},
      amount: 45600,
      orders: 23,
      commission: 6840
    }
  ]
}
```

---

### **8.4 USER ACTIVITY REPORT**

**URL:** `/admin/reports/user-activity`

**Metrics:**
- New registrations
- Active users (daily/weekly/monthly)
- User retention
- Churn rate
- User engagement (orders per user, avg session time)

**API Call:**
```javascript
GET /api/admin/reports/user-activity?period=month

Response:
{
  registrations: {
    total: 1234,
    byRole: {
      USER: 1000,
      VENDOR: 145,
      BUSINESS_OWNER: 89
    }
  },
  
  activeUsers: {
    daily: 3456,
    weekly: 8945,
    monthly: 12456
  },
  
  engagement: {
    averageOrdersPerUser: 2.3,
    averageSessionDuration: "12m 34s"
  },
  
  retention: {
    week1: 78, // % of users who returned in week 1
    week4: 45,
    month3: 28
  }
}
```

---

## 9. SETTINGS

---

### **9.1 GENERAL SETTINGS**

**URL:** `/admin/settings/general`

**Settings:**
- Site name
- Logo upload
- Favicon
- Contact email
- Contact phone
- Support email
- Address
- Social media links (Facebook, Instagram, Twitter, LinkedIn)
- Maintenance mode (Enable/Disable)

**API Call:**
```javascript
GET /api/admin/settings/general

Response:
{
  settings: {
    siteName: "Grap Deal",
    logo: "/uploads/logo.png",
    contactEmail: "support@grapdeal.com",
    contactPhone: "+91-1234567890",
    address: "123 Business Park, Mumbai",
    socialMedia: {
      facebook: "https://facebook.com/grapdeal",
      instagram: "https://instagram.com/grapdeal"
    },
    maintenanceMode: false
  }
}
```

---

### **9.2 PAYMENT SETTINGS**

**URL:** `/admin/settings/payment`

**Settings:**
- Razorpay Key ID
- Razorpay Secret Key (masked)
- Test mode (Enable/Disable)
- Payment methods enabled (Cards, UPI, Netbanking, Wallets, COD)
- COD settings:
  - Enable COD
  - COD limit (max order value)
  - COD charges
- Currency (INR)

**API Call:**
```javascript
GET /api/admin/settings/payment

Response:
{
  settings: {
    razorpayKeyId: "rzp_live_xxxxx",
    testMode: false,
    paymentMethods: {
      card: true,
      upi: true,
      netbanking: true,
      wallet: true,
      cod: true
    },
    codSettings: {
      enabled: true,
      maxOrderValue: 10000,
      charges: 50
    },
    currency: "INR"
  }
}
```

---

### **9.3 LOGISTICS SETTINGS**

**URL:** `/admin/settings/logistics`

**Settings:**
- Delivery partners (Shiprocket, Delhivery, Self)
- Shiprocket API key
- Delhivery API key
- Default delivery partner
- Shipping charges:
  - Fixed rate
  - Weight-based
  - Free shipping threshold
- Delivery time estimates (by location)

**API Call:**
```javascript
GET /api/admin/settings/logistics

Response:
{
  settings: {
    deliveryPartners: [
      {
        name: "Shiprocket",
        enabled: true,
        apiKey: "ship_xxxxx",
        isDefault: true
      },
      {
        name: "Delhivery",
        enabled: false
      }
    ],
    shippingCharges: {
      type: "WEIGHT_BASED",
      rates: [
        {weight: 0.5, charge: 50},
        {weight: 1, charge: 70},
        {weight: 2, charge: 100}
      ],
      freeShippingThreshold: 500
    }
  }
}
```

---

### **9.4 NOTIFICATION SETTINGS**

**URL:** `/admin/settings/notifications`

**Settings:**
- Email notifications:
  - Order confirmations
  - Shipping updates
  - Payout notifications
  - Application approvals
- SMS notifications:
  - Twilio/MSG91 API
  - OTP verification
  - Order updates
- Push notifications:
  - Firebase config
  - Web push
- Admin notifications:
  - Email for new orders
  - Email for new applications

**API Call:**
```javascript
GET /api/admin/settings/notifications

Response:
{
  settings: {
    email: {
      enabled: true,
      smtpHost: "smtp.gmail.com",
      smtpPort: 587,
      smtpUser: "noreply@grapdeal.com",
      notifications: {
        orderConfirmation: true,
        shippingUpdate: true,
        payoutNotification: true
      }
    },
    sms: {
      enabled: true,
      provider: "MSG91",
      apiKey: "msg91_xxxxx",
      notifications: {
        otpVerification: true,
        orderUpdates: true
      }
    }
  }
}
```

---

### **9.5 ROLES & PERMISSIONS**

**URL:** `/admin/settings/roles`

**Roles:**
- SUPER_ADMIN (all access)
- ADMIN (full access except settings)
- MANAGER (view reports, manage orders)
- SUPPORT (view tickets, respond to queries)

**Permissions Table:**
- View permissions by role
- Edit permissions
- Create new roles

**API Call:**
```javascript
GET /api/admin/settings/roles

Response:
{
  roles: [
    {
      name: "SUPER_ADMIN",
      permissions: ["all"]
    },
    {
      name: "ADMIN",
      permissions: [
        "view_dashboard",
        "manage_products",
        "manage_orders",
        "manage_vendors",
        "manage_businesses",
        "process_payouts",
        "view_reports"
      ]
    },
    {
      name: "MANAGER",
      permissions: [
        "view_dashboard",
        "manage_orders",
        "view_reports"
      ]
    }
  ]
}
```

---

## 10. SUPPORT & TICKETS

---

### **10.1 SUPPORT TICKETS**

**URL:** `/admin/support/tickets`

**Tabs:** Open, In Progress, Resolved, Closed

**Tickets Table:**
- Ticket #, Subject, User, Category, Priority, Status, Created, Last updated, Actions

**View Ticket:**

**URL:** `/admin/support/tickets/[ticketId]`

**UI Elements:**
- Ticket details (subject, description, category)
- User info
- Priority (Low, Medium, High, Urgent)
- Status (Open, In Progress, Resolved, Closed)
- Conversation thread
- Reply box (admin response)
- Assign to (dropdown to assign to support staff)
- Attachments

**API Call:**
```javascript
GET /api/admin/support/tickets/ticket_123

Response:
{
  ticket: {
    id: "ticket_123",
    ticketNumber: "TKT-001234",
    subject: "Issue with order delivery",
    category: "ORDER",
    priority: "HIGH",
    status: "OPEN",
    user: {name: "Amit Kumar", email: "amit@example.com"},
    createdAt: "2025-10-10T09:00:00Z",
    lastUpdated: "2025-10-10T11:30:00Z",
    messages: [
      {
        from: "USER",
        message: "My order hasn't arrived yet. Tracking shows delivered but I didn't receive it.",
        timestamp: "2025-10-10T09:00:00Z"
      },
      {
        from: "ADMIN",
        message: "We're looking into this issue. Can you please provide your order number?",
        timestamp: "2025-10-10T10:15:00Z",
        adminName: "Support Team"
      }
    ]
  }
}
```

---

### **10.2 LIVE CHAT**

**URL:** `/admin/support/chat`

**Real-time chat:**
- Active chats list
- Chat window
- Canned responses
- Transfer chat to another agent
- End chat

---

### **10.3 FEEDBACK**

**URL:** `/admin/support/feedback`

**Customer feedback:**
- Overall satisfaction ratings
- Feature requests
- Bug reports
- Testimonials

---

## 📊 ADMIN ROLE-BASED ACCESS

### **Access Control Matrix:**

```javascript
const PERMISSIONS = {
  SUPER_ADMIN: ['*'], // All permissions
  
  ADMIN: [
    'view_dashboard',
    'manage_ecommerce',
    'manage_b2c',
    'manage_b2b',
    'manage_c2c',
    'manage_orders',
    'process_payouts',
    'manage_users',
    'manage_content',
    'view_reports'
  ],
  
  MANAGER: [
    'view_dashboard',
    'manage_orders',
    'view_products',
    'view_vendors',
    'view_reports'
  ],
  
  SUPPORT: [
    'view_tickets',
    'reply_tickets',
    'view_orders',
    'view_users'
  ]
};
```

---

## ✅ ADMIN PANEL CHECKLIST

**Core Features:**
- [ ] Dashboard with overview stats
- [ ] Real-time notifications
- [ ] Search & filters across all modules

**E-Commerce:**
- [ ] Product management
- [ ] Inventory tracking
- [ ] Order management
- [ ] Logistics integration

**B2C:**
- [ ] Vendor approvals
- [ ] Product approvals
- [ ] Payout processing
- [ ] Commission tracking

**B2B:**
- [ ] Business approvals
- [ ] Service approvals
- [ ] Subscription management
- [ ] Lead tracking

**C2C:**
- [ ] Listing approvals
- [ ] Report handling
- [ ] User moderation
- [ ] Reveal analytics

**Users:**
- [ ] User management
- [ ] KYC approvals
- [ ] Review moderation
- [ ] Role management

**Content:**
- [ ] Category management
- [ ] Banner management
- [ ] Page editor
- [ ] FAQ management

**Reports:**
- [ ] Sales reports
- [ ] Revenue reports
- [ ] Payout reports
- [ ] User activity reports
- [ ] Export to CSV/Excel

**Settings:**
- [ ] General settings
- [ ] Payment gateway config
- [ ] Logistics config
- [ ] Notification config
- [ ] Roles & permissions

**Support:**
- [ ] Ticket system
- [ ] Live chat
- [ ] Feedback management

---

**END OF PART 5 - ADMIN PANEL**

**🎉 COMPLETE FLOW DOCUMENTATION SERIES FINISHED! 🎉**

**All 5 Parts:**
1. [COMPLETEFLOW_1_ECOMMERCE.md](./COMPLETEFLOW_1_ECOMMERCE.md) ✅
2. [COMPLETEFLOW_2_B2C.md](./COMPLETEFLOW_2_B2C.md) ✅
3. [COMPLETEFLOW_3_B2B.md](./COMPLETEFLOW_3_B2B.md) ✅
4. [COMPLETEFLOW_4_C2C.md](./COMPLETEFLOW_4_C2C.md) ✅
5. [COMPLETEFLOW_5_ADMIN.md](./COMPLETEFLOW_5_ADMIN.md) ✅

**Total Pages:** 500+ pages of detailed documentation covering every aspect of the Grap Deal platform!
