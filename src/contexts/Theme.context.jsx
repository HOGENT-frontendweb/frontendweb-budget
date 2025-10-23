// src/contexts/Theme.context.jsx
import { useState, useEffect, useMemo, useCallback } from 'react';
import { ThemeContext } from '.';

const ThemeProvider = ({ children }) => {
  const [darkmode, setDarkmode] = useState(Boolean(localStorage.getItem('darkmode')));

  useEffect(() => {
    if (darkmode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('darkmode', darkmode);
  }, [darkmode]);

  const toggleDarkmode = useCallback(() => setDarkmode((prev) => !prev), []);

  const value = useMemo(() => ({ darkmode, toggleDarkmode }), [darkmode, toggleDarkmode]);

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
