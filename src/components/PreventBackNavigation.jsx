import { useEffect } from 'react';

function PreventBackNavigation() {
  useEffect(() => {
    // Push the current state into the history stack on mount
    window.history.pushState(null, document.title, window.location.href);

    const handlePopState = (event) => {
      // Re-push the current state when the user tries to navigate back
      window.history.pushState(null, document.title, window.location.href);
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null; // This component does not render anything
}

export default PreventBackNavigation;
