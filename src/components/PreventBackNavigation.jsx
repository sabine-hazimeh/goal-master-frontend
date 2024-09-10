import { useEffect } from 'react';

function PreventBackNavigation() {
  useEffect(() => {
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (event) => {
      window.history.pushState(null, document.title, window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null; 
}

export default PreventBackNavigation;
