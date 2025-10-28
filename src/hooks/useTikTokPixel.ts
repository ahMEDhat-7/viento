// TikTok Pixel tracking hook

// TypeScript declarations for TikTok Pixel
declare global {
  interface Window {
    ttq: {
      track: (eventName: string, params?: Record<string, any>) => void;
      page: () => void;
      load: (pixelId: string) => void;
      _i?: Record<string, any>;
    };
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
  
  // Load TikTok Pixel script
  (function(w: any, d: Document, t: string) {
    w.TikTokAnalyticsObject = t;
    const ttq = w[t] = w[t] || [];
    ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie"];
    ttq.setAndDefer = function(t: any, e: any) {
      t[e] = function() {
        t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
      };
    };
    for (let i = 0; i < ttq.methods.length; i++) {
      ttq.setAndDefer(ttq, ttq.methods[i]);
    }
    ttq.instance = function(t: string) {
      const e = ttq._i[t] || [];
      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(e, ttq.methods[i]);
      }
      return e;
    };
    ttq.load = function(e: string, n?: any) {
      const i = "https://analytics.tiktok.com/i18n/pixel/events.js";
      ttq._i = ttq._i || {};
      ttq._i[e] = [];
      ttq._i[e]._u = i;
      ttq._t = ttq._t || {};
      ttq._t[e] = +new Date();
      ttq._o = ttq._o || {};
      ttq._o[e] = n || {};
      const o = document.createElement("script");
      o.type = "text/javascript";
      o.async = true;
      o.src = i + "?sdkid=" + e + "&lib=" + t;
      const a = document.getElementsByTagName("script")[0];
      a.parentNode?.insertBefore(o, a);
    };
  })(window, document, 'ttq');
  
  // Initialize with Pixel ID
  window.ttq.load(PIXEL_ID);
  window.ttq.page();
  console.log('TikTok Pixel loaded and page tracked');
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
