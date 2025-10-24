// Facebook Pixel tracking hook

// TypeScript declarations for Facebook Pixel
declare global {
  interface Window {
    fbq: (action: string, eventName: string, params?: Record<string, any>) => void;
    _fbq: any;
  }
}

const PIXEL_ID = import.meta.env.VITE_FACEBOOK_PIXEL_ID;

// Initialize Facebook Pixel once
export const initializeFacebookPixel = () => {
  if (typeof window === 'undefined' || !PIXEL_ID || window.fbq) return;
  
  // Load Facebook Pixel script
  (function(f: any, b: Document, e: string, v: string) {
    let n: any, t: HTMLScriptElement, s: Element | null;
    if (f.fbq) return;
    n = f.fbq = function() {
      n.callMethod ? n.callMethod.apply(n, arguments) : n.queue.push(arguments);
    };
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = '2.0';
    n.queue = [];
    t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    s = b.getElementsByTagName(e)[0];
    s?.parentNode?.insertBefore(t, s);
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');
  
  // Initialize with Pixel ID
  window.fbq('init', PIXEL_ID);
  window.fbq('track', 'PageView');
};

// Helper to safely call fbq
const fbq = (...args: Parameters<typeof window.fbq>) => {
  if (typeof window !== 'undefined' && window.fbq && PIXEL_ID) {
    window.fbq(...args);
  }
};

export const useFacebookPixel = () => {
  // Track page view
  const trackPageView = () => {
    fbq('track', 'PageView');
  };

  // Track product view
  const trackViewContent = (
    productId: string,
    productName: string,
    price: number,
    currency: string = 'USD'
  ) => {
    fbq('track', 'ViewContent', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: price,
      currency: currency,
    });
  };

  // Track add to cart
  const trackAddToCart = (
    productId: string,
    productName: string,
    price: number,
    quantity: number,
    currency: string = 'USD'
  ) => {
    fbq('track', 'AddToCart', {
      content_ids: [productId],
      content_name: productName,
      content_type: 'product',
      value: price * quantity,
      currency: currency,
    });
  };

  // Track checkout initiation
  const trackInitiateCheckout = (
    value: number,
    numItems: number,
    currency: string = 'USD'
  ) => {
    fbq('track', 'InitiateCheckout', {
      value: value,
      currency: currency,
      num_items: numItems,
    });
  };

  // Track purchase
  const trackPurchase = (
    value: number,
    orderId: string,
    currency: string = 'USD'
  ) => {
    fbq('track', 'Purchase', {
      value: value,
      currency: currency,
      transaction_id: orderId,
    });
  };

  // Track search
  const trackSearch = (searchQuery: string) => {
    fbq('track', 'Search', {
      search_string: searchQuery,
    });
  };

  return {
    trackPageView,
    trackViewContent,
    trackAddToCart,
    trackInitiateCheckout,
    trackPurchase,
    trackSearch,
  };
};
