import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Menu, X } from "lucide-react";

function Navbar() {
  const { token, user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="sticky top-0 z-50 bg-white border-b border-[#d6d3d1]">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">

          {/* Logo */}
          <Link
            to="/"
            onClick={closeMenu}
            className="text-[#1c1917] font-semibold text-sm sm:text-base tracking-tight shrink-0"
          >
            HackerNews Hub
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-5">
            <Link to="/" className="text-sm text-[#57534e] hover:text-[#1c1917] transition">
              Home
            </Link>
            {token ? (
              <>
                <Link to="/bookmarks" className="text-sm text-[#57534e] hover:text-[#1c1917] transition">
                  Bookmarks
                </Link>
                {user?.name && (
                  <span className="text-xs text-[#57534e] border-l border-[#d6d3d1] pl-4">
                    Hi, {user.name}
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="text-sm bg-[#292524] hover:bg-black text-white px-4 py-1.5 rounded-lg transition cursor-pointer"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-sm text-[#57534e] hover:text-[#1c1917] transition">
                  Login
                </Link>
                <Link to="/register" className="text-sm bg-[#292524] hover:bg-black text-white px-4 py-1.5 rounded-lg transition cursor-pointer">
                  Register
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="sm:hidden text-[#1c1917] cursor-pointer"
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile full-screen overlay */}
      {menuOpen && (
        <div className="sm:hidden fixed inset-0 z-40 bg-white flex flex-col px-6 pt-20 gap-6">

          {/* Close button */}
          <button
            onClick={closeMenu}
            className="absolute top-4 right-4 text-[#1c1917] cursor-pointer"
          >
            <X size={22} />
          </button>

          {/* User name */}
          {token && user?.name && (
            <p className="text-base font-medium text-[#1c1917]">
              Hi, {user.name}
            </p>
          )}

          <Link
            to="/"
            onClick={closeMenu}
            className="text-base text-[#57534e] hover:text-[#1c1917] transition"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/bookmarks"
                onClick={closeMenu}
                className="text-base text-[#57534e] hover:text-[#1c1917] transition"
              >
                Bookmarks
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-[#292524] hover:bg-black text-white px-4 py-2.5 rounded-xl transition cursor-pointer text-left mt-2"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-base text-[#57534e] hover:text-[#1c1917] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-sm bg-[#292524] hover:bg-black text-white px-4 py-2.5 rounded-xl transition cursor-pointer text-center mt-2"
              >
                Register
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
