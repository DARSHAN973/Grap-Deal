const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key-change-in-production";

// Test token creation with role
const testPayload = {
  userId: "test123",
  email: "admin@gmail.com",
  role: "ADMIN"
};

const token = jwt.sign(testPayload, JWT_SECRET, { expiresIn: "7d" });
console.log('Created token:', token);

// Test token decoding
const decoded = jwt.verify(token, JWT_SECRET);
console.log('Decoded token:', decoded);
console.log('Role in token:', decoded.role);