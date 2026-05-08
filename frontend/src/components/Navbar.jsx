import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { token, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-[#d6d3d1]">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">

        {/* Logo */}
        <Link to="/" className="text-[#1c1917] font-semibold text-base tracking-tight">
          HackerNews Hub
        </Link>

        {/* Nav links */}
        <div className="flex items-center gap-6">
          <Link
            to="/"
            className="text-sm text-[#57534e] hover:text-[#1c1917] transition"
          >
            Home
          </Link>

          {token ? (
            <>
              <Link
                to="/bookmarks"
                className="text-sm text-[#57534e] hover:text-[#1c1917] transition"
              >
                Bookmarks
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm bg-[#292524] hover:bg-black text-white px-4 py-1.5 rounded-lg transition cursor-pointer"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="text-sm text-[#57534e] hover:text-[#1c1917] transition"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="text-sm bg-[#292524] hover:bg-black text-white px-4 py-1.5 rounded-lg transition"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
