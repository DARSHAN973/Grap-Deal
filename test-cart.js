// Simple test script to verify cart functionality
import fetch from 'node-fetch';

const BASE_URL = 'http://localhost:3001';

async function testCartWithoutVariant() {
  try {
    console.log('Testing cart functionality with products without variants...');
    
    // Test data for a product without variant
    const testData = {
      productId: 'test-product-1',
      quantity: 1,
      price: 29.99
      // No variantId - this should work now
    };

    const response = await fetch(`${BASE_URL}/api/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // You'll need to add proper authentication headers here
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();
    console.log('Response:', result);
    
    if (result.success) {
      console.log('✅ Cart functionality working correctly!');
    } else {
      console.log('❌ Cart functionality still has issues:', result.error);
    }
    
  } catch (error) {
    console.error('❌ Test failed:', error.message);
  }
}

// Run the test
testCartWithoutVariant();