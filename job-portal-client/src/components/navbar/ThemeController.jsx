import React, { useContext } from "react";
import { FiSun } from "react-icons/fi";
import { FaMoon } from "react-icons/fa";
import ThemeContext from "../../context/ThemeContext";

const ThemeController = () => {
  const { toggleTheme,theme } = useContext(ThemeContext);
  return (
    <div>
      <label className="swap swap-rotate">
        {/* this hidden checkbox controls the state */}
        <input
          onChange={toggleTheme} // Toggles the theme on change
          checked={theme === "nord"} // Sync checkbox with theme state
          type="checkbox"
          className="theme-controller"
        />

        {/* sun icon */}
       <div className="swap-off fill-current">
       <FiSun />
       </div>

        {/* moon icon */}
        <div className="swap-on  fill-current">
        <FaMoon />
        </div>
      </label>
    </div>
  );
};

export default ThemeController;
