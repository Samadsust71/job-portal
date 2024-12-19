import { useState } from "react";
import ThemeController from "./ThemeController";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import { Link, NavLink } from "react-router-dom";
import useInfo from "../../hook/useInfo";
import logo from "../../assets/logo.png"

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Find a Job", path: "/findJob" },
  { name: "Add a Job", path: "/addJob" },
  { name: "My Posted Jobs", path: "/my-posted-job" },
  { name: "My Applied Job", path: "/applied-jobs" },
];

const getNavLinkClass = (isActive) =>
  isActive ? "text-PrimaryBlue underline underline-offset-4" : "text-base-content";

const NavbarLinks = ({ handleClose }) => (
  <ul
    className="menu menu-horizontal lg:menu-horizontal px-1"
    role="menu"
    onClick={handleClose}
    onKeyDown={(e) => e.key === "Enter" && handleClose?.()}
  >
    {navLinks.map(({ name, path }) => (
      <li key={name} role="menuitem">
        <NavLink
          to={path}
          className={({ isActive }) => getNavLinkClass(isActive)}
        >
          {name}
        </NavLink>
      </li>
    ))}
  </ul>
);

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const {user,signOutUser}= useInfo()

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        {/* Dropdown for smaller screens */}
        <div className="dropdown">
          <button
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="btn btn-ghost lg:hidden"
          >
            {isMenuOpen ? <IoCloseSharp /> : <GiHamburgerMenu />}
          </button>
          {isMenuOpen && (
            <div className="dropdown-content bg-base-100 rounded-box mt-3 w-52 p-2 shadow z-10">
              <NavbarLinks handleClose={() => setIsMenuOpen(false)} />
            </div>
          )}
        </div>
        <div className="flex items-center gap-1">
          <img src={logo} alt="logo" className="h-10 w-10 object-cover" />
        <h1 className="font-bold lg:text-2xl hidden lg:block">JobPortal</h1>
        </div>
      </div>

      {/* Links for larger screens */}
      <div className="navbar-center hidden lg:flex">
        <NavbarLinks handleClose={null} />
      </div>

      <div className="navbar-end">
        <div className="flex items-center gap-2">
        <ThemeController />
        {
          user?
          <>
          <button onClick={signOutUser} className="py-2 px-4 bg-PrimaryBlue rounded-lg text-neutral-50">Sign Out</button>
          </>:
          <>
          <Link to={'/signIn'} className="py-2 px-4 bg-PrimaryBlue rounded-lg text-neutral-50">Sign In</Link>
          <Link to={"/register"} className="py-2 px-4 bg-PrimaryBlue rounded-lg text-neutral-50">Register</Link>
        </>
        }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
