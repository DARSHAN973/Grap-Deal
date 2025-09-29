PROJECT DRAFT – Unified E-Commerce, B2B, B2C, C2C Platform

------------------------------------------------------------
1. PROJECT OVERVIEW
------------------------------------------------------------
The platform will be a unified website (web-first, mobile responsive)
where E-Commerce, B2B, B2C, and C2C models co-exist.

Key Business Models:
- E-Commerce (Company-managed marketplace with vendors and delivery)
- B2B (Paid banner ads + free business/service listings with leads)
- B2C (Commission-based vendor-to-customer sales)
- C2C (Customer-to-customer product listings with admin verification)

Technology Preference:
- Next.js Fullstack
- MySQL as primary DB
- Third-party logistics integration (Shiprocket, Delhivery, etc.)
- Payment gateway integration (Razorpay, Stripe, PayPal, etc.)

------------------------------------------------------------
2. USER ROLES
------------------------------------------------------------
1. Admin
   - Full system management (categories, vendors, customers, delivery, orders)
   - Verification of vendors, products, and C2C listings
   - Manage banners, advertisements, and services
   - Assign/track orders with logistics partners
   - Manage payments (release vendor payouts, pay logistics)

2. Vendor / Business
   - Register on platform (manual approval by Admin)
   - Add products (listed after Admin verification)
   - For B2C/E-Commerce: earn from product sales (paid via Admin after commission cut)
   - For B2B: purchase advertising/banner slots
   - For Services: list business details (contact number shown to customers)

3. Customer
   - Register and browse products/services
   - Place orders, make online/COD payments (all payments go to Company)
   - For C2C: list their own products (after Admin verification)
   - Contact businesses/services (via platform-provided numbers)

4. Delivery Partner (3rd Party Integrated)
   - Receive assigned orders from Admin/system
   - Pick, label, and deliver products
   - Payments for delivery go from Company → Logistics Provider

------------------------------------------------------------
3. BUSINESS MODEL & REVENUE STREAMS
------------------------------------------------------------
E-Commerce:
- Commission % on product sales
- Delivery charges collected from customers (settled with logistics providers)

B2C:
- Similar to E-Commerce, but strictly vendor-to-customer with company as intermediary
- Commission per product sale (fixed % or tiered slabs)

B2B:
- Banner advertisements (tiered plans: top banner, sidebar, featured listing)
- Free listing of businesses/services (company contact number shown, leads routed through platform)

C2C:
- Product listing free → Admin approval → Published
- Once buyer pays first transaction fee, seller’s contact info is revealed
- Commission or fixed fee charged per successful transaction

------------------------------------------------------------
4. SYSTEM FLOWS
------------------------------------------------------------

--- E-COMMERCE FLOW ---
1. Vendor registers → Admin verifies vendor
2. Vendor adds products → Admin verifies and publishes
3. Customer browses categories → places order
4. Payment: Customer → Company
5. Admin assigns order → Delivery partner (3rd party integration)
6. Delivery partner picks, labels, delivers
7. Post-delivery: Company settles payments → Vendor (after deducting commission) + Delivery Partner

--- B2C FLOW ---
1. Vendor registers → Admin approves
2. Vendor lists products → Admin verifies
3. Customer orders → Payment to Company
4. Delivery handled by integrated logistics
5. Company → Pays Vendor (after commission) + Delivery Partner

--- B2B FLOW ---
1. Business registers
2. Services listed free of cost (hospital, lawyers, etc.)
3. Contact info displayed (calls route directly to business)
4. For advertisements: Business purchases banner plan
5. Admin manages banners (publish, rotate, expire)

--- C2C FLOW ---
1. Customer registers as seller
2. Customer lists product → Admin verifies
3. Product published anonymously (contact hidden)
4. Buyer makes payment for first transaction
5. System reveals seller contact after payment
6. Company takes commission/transaction fee

------------------------------------------------------------
5. ADMIN PANEL FEATURES
------------------------------------------------------------
- Dashboard with KPIs (orders, revenue, active vendors, ads)
- User management (customers, vendors, delivery partners)
- Product management (approve/reject, enable/disable)
- Vendor/business verification
- Order management (assign to delivery partners, track logistics)
- B2B management (banners, service listings)
- C2C listing approvals and monitoring
- Payment management:
  - Collect from customers
  - Disburse to vendors
  - Pay logistics providers
- Reports & Analytics:
  - Sales, commissions, vendor performance, ad performance

------------------------------------------------------------
6. CUSTOMER FRONTEND FEATURES
------------------------------------------------------------
- Registration/Login
- Product browsing by categories
- Service directory (B2B services with contact info)
- Place orders (E-Commerce, B2C products)
- Online payment / Cash on Delivery
- Track orders (real-time logistics updates)
- For C2C: post product listings (pending approval)

------------------------------------------------------------
7. VENDOR/BUSINESS PANEL FEATURES
------------------------------------------------------------
- Registration (pending Admin approval)
- Manage products (add, edit, delete → subject to approval)
- Manage services (for B2B businesses)
- Purchase banner plans (self-serve or request via Admin)
- View sales reports, payouts, and commissions

------------------------------------------------------------
8. DELIVERY PARTNER PANEL (LIMITED FEATURES)
------------------------------------------------------------
- Login to view assigned orders
- Update status (picked, in-transit, delivered)
- Print/download shipping label
- Real-time sync with Admin and Customer

------------------------------------------------------------
9. PAYMENT & SETTLEMENT FLOW
------------------------------------------------------------
- All payments routed through Company account
- Commission model:
  Customer pays (product price + delivery charges) → Company
  Company deducts:
    - Commission % for Company revenue
    - Delivery partner charges
  Remaining → Paid to Vendor

- B2B Banner Payments: Direct online payment to Company
- C2C Transactions: First payment (transaction fee) goes to Company; balance directly between Buyer and Seller

------------------------------------------------------------
10. SECURITY & COMPLIANCE
------------------------------------------------------------
- Vendor & Seller manual verification by Admin
- KYC documents uploaded for businesses/vendors
- Escrow-like payment flow for customer protection
- GDPR/Local Data Privacy compliance
- Fraud detection: duplicate listings, fake vendors

------------------------------------------------------------
11. FUTURE SCOPE (Phase 2+)
------------------------------------------------------------
- Mobile App (iOS + Android)
- AI-powered recommendation engine
- Dynamic pricing for ads (CPC, CPM models)
- Integration with GST invoicing & accounting tools
- Loyalty & reward points for customers
- Chatbot/AI assistant for service matching



