// TikTok Pixel tracking hook

// TypeScript declarations for TikTok Pixel
declare global {
  interface Window {
    ttq: any;
  }
}

const PIXEL_ID = import.meta.env.VITE_TIKTOK_PIXEL_ID;

// Initialize TikTok Pixel once
export const initializeTikTokPixel = () => {
  if (typeof window === 'undefined') return;
  
  if (!PIXEL_ID) {
    console.warn('TikTok Pixel ID is not configured');
    return;
  }
  
  if (window.ttq) {
    console.log('TikTok Pixel already initialized');
    return;
  }
  
  console.log('Initializing TikTok Pixel with ID:', PIXEL_ID);
  
  try {
    // Create ttq object
    window.ttq = window.ttq || [];
    const ttq = window.ttq;
    
    if (ttq.load) {
      console.log('TikTok Pixel already has load method');
      return;
    }
    
    // Define methods
    ttq.methods = ['page', 'track', 'identify', 'instances', 'debug', 'on', 'off', 'once', 'ready', 'alias', 'group', 'enableCookie', 'disableCookie', 'setAndDefer'];
    ttq.setAndDefer = function(t: any, e: string) {
      t[e] = function() {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    
    // Set up all methods
    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    
    // Initialize storage
    ttq._i = ttq._i || {};
    ttq._t = ttq._t || {};
    ttq._o = ttq._o || {};
    
    // Load function
    ttq.load = function(pixelCode: string) {
      const url = 'https://analytics.tiktok.com/i18n/pixel/events.js';
      ttq._i[pixelCode] = [];
      ttq._i[pixelCode]._u = url;
      ttq._t[pixelCode] = +new Date();
      ttq._o[pixelCode] = {};
      
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = url + '?sdkid=' + pixelCode + '&lib=ttq';
      
      script.onerror = () => {
        console.error('Failed to load TikTok Pixel script');
      };
      
      script.onload = () => {
        console.log('TikTok Pixel script loaded successfully');
      };
      
      const firstScript = document.getElementsByTagName('script')[0];
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(script, firstScript);
      }
    };
    
    // Instance function
    ttq.instance = function(pixelCode: string) {
      return ttq._i[pixelCode] || [];
    };
    
    // Load the pixel
    ttq.load(PIXEL_ID);
    ttq.page();
    
    console.log('TikTok Pixel initialized and page tracked');
  } catch (error) {
    console.error('Error initializing TikTok Pixel:', error);
  }
};

// Helper to safely call ttq
const ttq = (eventName: string, params?: Record<string, any>) => {
  if (typeof window !== 'undefined' && window.ttq && PIXEL_ID) {
    console.log('TikTok Pixel Event:', eventName, params);
    window.ttq.track(eventName, params);
  } else {
    console.warn('TikTok Pixel not available for event:', eventName);
  }
};

export const useTikTokPixel = () => {
  // Track page view
  const trackPageView = () => {
    if (typeof window !== 'undefined' && window.ttq && PIXEL_ID) {
      window.ttq.page();
    }
  };

  // Track product view
  const trackViewContent = (
    productId: string,
    productName: string,
    price: number,
    currency: string = 'USD'
  ) => {
    ttq('ViewContent', {
      content_id: productId,
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
    ttq('AddToCart', {
      content_id: productId,
      content_name: productName,
      content_type: 'product',
      value: price * quantity,
      quantity: quantity,
      currency: currency,
    });
  };

  // Track checkout initiation
  const trackInitiateCheckout = (
    value: number,
    numItems: number,
    currency: string = 'USD'
  ) => {
    ttq('InitiateCheckout', {
      value: value,
      currency: currency,
      contents: [
        {
          quantity: numItems,
        }
      ],
    });
  };

  // Track purchase
  const trackPurchase = (
    value: number,
    orderId: string,
    currency: string = 'USD'
  ) => {
    ttq('CompletePayment', {
      value: value,
      currency: currency,
      content_type: 'product',
    });
  };

  // Track search
  const trackSearch = (searchQuery: string) => {
    ttq('Search', {
      query: searchQuery,
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
