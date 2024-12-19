import React, { useEffect, useState } from 'react'
import ThemeContext from '../context/ThemeContext'

const ThemeProvider = ({children}) => {

     // Initialize theme state with value from localStorage or default to 'dark'
  const [theme, setTheme] = useState(() => localStorage.getItem("data-theme") || "sunset");

   // Apply the theme and save it in localStorage when the theme changes
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("data-theme", theme);
  }, [theme]);


  // Toggle theme function
  const toggleTheme = (e) => {
    const newTheme = e.target.checked ? "nord" : "sunset";
    setTheme(newTheme); // This will automatically update `data-theme` and `localStorage` via useEffect
  };
    const themeInfo = {
        toggleTheme,
        theme
    }

  return (
    <ThemeContext.Provider value={themeInfo}>
      {children}
    </ThemeContext.Provider>
  )
}

export default ThemeProvider
