import React, { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext({
  // PUBLIC_INTERFACE
  theme: 'light',
  // PUBLIC_INTERFACE
  toggle: () => {}
});

// PUBLIC_INTERFACE
export const ThemeProvider = ({ children }) => {
  /** This provider could be extended for dark mode in the future. */
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    // Apply a subtle gradient background requested by style guide.
    document.body.style.background = 'linear-gradient(180deg, #ffffff, #f3f4f6)';
  }, [theme]);

  const value = {
    theme,
    toggle: () => setTheme((t) => (t === 'light' ? 'light' : 'light'))
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// PUBLIC_INTERFACE
export const useTheme = () => useContext(ThemeContext);
