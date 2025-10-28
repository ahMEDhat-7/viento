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
    console.warn('⚠️ TikTok Pixel ID is not configured');
    return;
  }
  
  if (window.ttq) {
    console.log('✅ TikTok Pixel already initialized');
    return;
  }
  
  console.log('🚀 Initializing TikTok Pixel with ID:', PIXEL_ID);
  
  try {
    // Official TikTok Pixel Code
    (function (w: any, d: Document, t: string) {
      w.TiktokAnalyticsObject = t;
      const ttq = w[t] = w[t] || [];
      ttq.methods = ["page", "track", "identify", "instances", "debug", "on", "off", "once", "ready", "alias", "group", "enableCookie", "disableCookie", "holdConsent", "revokeConsent", "grantConsent"];
      ttq.setAndDefer = function(t: any, e: string) {
        t[e] = function() {
          t.push([e].concat(Array.prototype.slice.call(arguments, 0)));
        };
      };
      
      for (let i = 0; i < ttq.methods.length; i++) {
        ttq.setAndDefer(ttq, ttq.methods[i]);
      }
      
      ttq.instance = function(t: string) {
        const e = ttq._i[t] || [];
        for (let n = 0; n < ttq.methods.length; n++) {
          ttq.setAndDefer(e, ttq.methods[n]);
        }
        return e;
      };
      
      ttq.load = function(e: string, n?: any) {
        const r = "https://analytics.tiktok.com/i18n/pixel/events.js";
        const o = n && n.partner;
        ttq._i = ttq._i || {};
        ttq._i[e] = [];
        ttq._i[e]._u = r;
        ttq._t = ttq._t || {};
        ttq._t[e] = +new Date();
        ttq._o = ttq._o || {};
        ttq._o[e] = n || {};
        
        const script = d.createElement("script");
        script.type = "text/javascript";
        script.async = true;
        script.src = r + "?sdkid=" + e + "&lib=" + t;
        
        script.onload = () => {
          console.log('✅ TikTok Pixel SDK loaded successfully');
        };
        
        script.onerror = () => {
          console.error('❌ Failed to load TikTok Pixel SDK');
        };
        
        const firstScript = d.getElementsByTagName("script")[0];
        if (firstScript && firstScript.parentNode) {
          firstScript.parentNode.insertBefore(script, firstScript);
        }
      };
      
      // Load and track initial page view
      ttq.load(PIXEL_ID);
      ttq.page();
      console.log('📄 TikTok Pixel: Initialized and PageView tracked');
      
    })(window, document, 'ttq');
    
  } catch (error) {
    console.error('❌ Error initializing TikTok Pixel:', error);
  }
};

// Helper to safely call ttq with better error handling
const ttq = (eventName: string, params?: Record<string, any>) => {
  if (typeof window === 'undefined') {
    console.warn('⚠️ TikTok Pixel: Window is undefined');
    return;
  }
  
  if (!PIXEL_ID) {
    console.warn('⚠️ TikTok Pixel: PIXEL_ID not configured');
    return;
  }
  
  if (!window.ttq) {
    console.warn('⚠️ TikTok Pixel: ttq object not initialized yet');
    return;
  }
  
  try {
    console.log('🎯 TikTok Pixel Event:', eventName, params);
    window.ttq.track(eventName, params);
    console.log('✅ TikTok Pixel: Event sent successfully');
  } catch (error) {
    console.error('❌ TikTok Pixel: Error tracking event:', error);
  }
};

export const useTikTokPixel = () => {
  // Track page view
  const trackPageView = () => {
    if (typeof window !== 'undefined' && window.ttq && PIXEL_ID) {
      try {
        console.log('📄 TikTok Pixel: Tracking PageView');
        window.ttq.page();
        console.log('✅ TikTok Pixel: PageView sent');
      } catch (error) {
        console.error('❌ TikTok Pixel: Error tracking page view:', error);
      }
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
