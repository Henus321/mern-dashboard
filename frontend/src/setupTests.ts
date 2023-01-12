import "@testing-library/jest-dom";

/* eslint-disable */
Object.defineProperty(window, "matchMedia", {
  value: () => {
    return {
      matches: false,
      addListener: () => {},
      removeListener: () => {},
    };
  },
});

// To avoid async-validator spam while testing
console.warn = () => {};
