import { FaSun, FaMoon } from "react-icons/fa";
import "./ThemeToggle.css"; // Importa los estilos

const ThemeToggle = ({ isDarkMode, toggleTheme }) => {
  return (
    <div
      onClick={toggleTheme}
      className={`mx-2 d-flex align-items-center gap-2 text-decoration-none theme-toggle ${isDarkMode ? "light-mode" : "dark-mode"
      }`}
    >
      {isDarkMode ? <FaSun className="icon-glow" /> : <FaMoon className="icon-glow" />}
      <span>{isDarkMode ? "Modo Claro" : "Modo Oscuro"}</span>
    </div>
  );
};

export default ThemeToggle;
