/* global gtag */
export const sendEvent = (action, details) => {
  gtag('event', action, details);
};
