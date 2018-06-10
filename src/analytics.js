/* global gtag */
export const sendEvent = (action, details) => {
  if (typeof gtag !== 'undefined') {
    gtag('event', action, details);
  }
};
