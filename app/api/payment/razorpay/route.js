import { NextResponse } from 'next/server';
import { verifyAuth } from '@/app/lib/auth';

// GET endpoint for testing Razorpay connection
export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json({ 
        success: false, 
        error: 'Razorpay credentials not configured' 
      });
    }

    const Razorpay = (await import('razorpay')).default;
    const razorpay = new Razorpay({
      key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET,
    });

    // Test connection
    await razorpay.payments.all({ count: 1 });
    
    return NextResponse.json({ 
      success: true, 
      message: 'Razorpay connection successful',
      keyId: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    });
  } catch (error) {
    return NextResponse.json({ 
      success: false, 
      error: `Connection test failed: ${error.message || error.toString()}` 
    });
  }
}

export async function POST(request) {
  try {
    // Step 1: Check authentication
    const { user, error } = await verifyAuth();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Authentication required' },
        { status: 401 }
      );
    }

    // Step 2: Parse request
    const { amount, currency = 'INR', orderId } = await request.json();
    
    if (!amount || !orderId) {
      return NextResponse.json(
        { success: false, error: 'Amount and order ID are required' },
        { status: 400 }
      );
    }

    // Step 3: Check environment variables
    if (!process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { success: false, error: 'Razorpay credentials not configured' },
        { status: 500 }
      );
    }

    // Step 3.5: Validate credential format
    const keyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;
    
    if (!keyId.startsWith('rzp_')) {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay key ID format' },
        { status: 500 }
      );
    }
    
    if (keySecret.length < 20) {
      return NextResponse.json(
        { success: false, error: 'Invalid Razorpay key secret format' },
        { status: 500 }
      );
    }

    // Step 4: Try to create Razorpay instance and order
    try {
      const Razorpay = (await import('razorpay')).default;
      
      const razorpay = new Razorpay({
        key_id: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      // Step 5: Create order with simple validation
      const amountInPaise = Math.round(parseFloat(amount) * 100);
      
      if (amountInPaise < 100) {
        return NextResponse.json(
          { success: false, error: 'Minimum amount is ₹1.00' },
          { status: 400 }
        );
      }

      const options = {
        amount: amountInPaise,
        currency: 'INR',
        receipt: `order_${orderId}`,
        payment_capture: 1
      };

      const order = await razorpay.orders.create(options);

      return NextResponse.json({
        success: true,
        orderId: order.id,
        amount: order.amount,
        currency: order.currency,
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
      });

    } catch (razorpayError) {
      // Razorpay errors can have different structures
      let errorMessage = 'Unknown payment error';
      
      if (razorpayError && typeof razorpayError === 'object') {
        // Check for different Razorpay error formats
        if (razorpayError.error && razorpayError.error.description) {
          errorMessage = razorpayError.error.description;
        } else if (razorpayError.error && razorpayError.error.code) {
          errorMessage = `Error code: ${razorpayError.error.code}`;
        } else if (razorpayError.message) {
          errorMessage = razorpayError.message;
        } else if (razorpayError.description) {
          errorMessage = razorpayError.description;
        } else {
          // Log the full error structure for debugging
          console.error('Unexpected Razorpay error structure:', JSON.stringify(razorpayError, null, 2));
          errorMessage = 'Payment service error - please check logs';
        }
      } else if (typeof razorpayError === 'string') {
        errorMessage = razorpayError;
      }
      
      return NextResponse.json(
        { success: false, error: errorMessage },
        { status: 500 }
      );
    }

  } catch (error) {
    return NextResponse.json(
      { success: false, error: `API error: ${error.message || error.toString()}` },
      { status: 500 }
    );
  }
}