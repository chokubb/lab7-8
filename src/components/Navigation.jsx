import { NavLink } from "react-router-dom";

function Navigation() {
  return (
    <nav className="top-nav">
      <NavLink
        to="/gallery"
        className={({ isActive }) =>
          isActive ? "nav-link active-nav-link" : "nav-link"
        }
      >
        Галерея
      </NavLink>

      <NavLink
        to="/favorites"
        className={({ isActive }) =>
          isActive ? "nav-link active-nav-link" : "nav-link"
        }
      >
        Улюблені
      </NavLink>

      <NavLink
        to="/admin"
        className={({ isActive }) =>
          isActive ? "nav-link active-nav-link" : "nav-link"
        }
      >
        Адмін-панель
      </NavLink>
    </nav>
  );
}

export default Navigation;