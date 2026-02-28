'use client';
import { useEffect } from 'react';

const InactivityRedirect = () => {
  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const resetTimeout = () => {
      if (timeout) clearTimeout(timeout);
      timeout = setTimeout(() => {
        // Refresh and redirect to '/home'
        window.location.href = '/';
      }, 2700000);
    };

    // Listen for user activity
    const activityEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    activityEvents.forEach((event) =>
      document.addEventListener(event, resetTimeout)
    );

    // Start the initial timeout
    resetTimeout();

    return () => {
      // Cleanup listeners and timeout
      activityEvents.forEach((event) =>
        document.removeEventListener(event, resetTimeout)
      );
      clearTimeout(timeout);
    };
  }, []);

  return null;
};

export default InactivityRedirect;
