import { useEffect } from 'react';

const LoadExternalScripts = () => {
  useEffect(() => {
    const loadScript = (src) => {
      return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.defer = true;

        script.onload = () => resolve();
        script.onerror = () => reject(new Error(`Failed to load script: ${src}`));

        document.body.appendChild(script);
      });
    };

    const loadScripts = async () => {
      try {
          await loadScript("assets/js/bootstrap.bundle.min.js");
          await loadScript("assets/js/splide.min.js");
          await loadScript("assets/js/slimselect.min.js");
          await loadScript("assets/js/smooth-scrollbar.js");
          await loadScript("assets/js/plyr.min.js");
          await loadScript("assets/js/photoswipe.min.js");
          await loadScript("assets/js/photoswipe-ui-default.min.js");
          await loadScript("assets/js/main.js");
      } catch (error) {
        console.error(error);
      }
    };

    loadScripts();

    return () => {
      // Cleanup if needed
    };
  }, []);

  return null;  // This component doesn't render any visible UI
};

export default LoadExternalScripts;
