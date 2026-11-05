import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yraaareklvioqadnjtnt.supabase.co';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_UpOTM-9hfzb_kmsykxxhvg_wekWySS6';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Helper function to safely sync new orders to Supabase
export async function syncOrderToSupabase(order: any) {
  try {
    const { data, error } = await supabase.from('orders').insert([
      {
        order_id: order.orderId,
        customer_name: order.customer.fullName,
        customer_email: order.customer.email,
        customer_phone: order.customer.phone,
        shipping_address: order.customer.address,
        city: order.customer.city,
        state: order.customer.state,
        pincode: order.customer.pincode,
        items: order.items,
        subtotal: order.subtotal,
        discount: order.discount || 0,
        shipping: order.shipping || 0,
        total: order.total,
        payment_method: order.paymentMethod,
        payment_status: order.paymentStatus || 'Paid',
        fulfillment_status: order.fulfillmentStatus || 'Confirmed',
        timeline: order.timeline || []
      }
    ]);
    if (error) {
      console.warn('[Supabase Order Sync Notice]:', error.message);
      return null;
    }
    return data;
  } catch (err) {
    console.warn('[Supabase Connection Notice]:', err);
    return null;
  }
}

// Helper to query order from Supabase
export async function fetchOrderFromSupabase(orderId: string) {
  try {
    const { data, error } = await supabase
      .from('orders')
      .select('*')
      .eq('order_id', orderId)
      .maybeSingle();

    if (error || !data) return null;

    return {
      orderId: data.order_id,
      createdAt: data.created_at,
      customer: {
        fullName: data.customer_name,
        email: data.customer_email,
        phone: data.customer_phone,
        address: data.shipping_address,
        city: data.city,
        state: data.state,
        pincode: data.pincode
      },
      items: data.items,
      subtotal: data.subtotal,
      discount: data.discount,
      shipping: data.shipping,
      total: data.total,
      paymentMethod: data.payment_method,
      paymentStatus: data.payment_status,
      fulfillmentStatus: data.fulfillment_status,
      timeline: data.timeline
    };
  } catch {
    return null;
  }
}
