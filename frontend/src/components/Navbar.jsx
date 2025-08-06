import { Link, useNavigate } from "react-router-dom";
import { Home, LogOut } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useEffect } from "react";

const Navbar = () => {
  const { authUser, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* Left: Logo */}
      <div className="flex-1">
        <Link to="/" className="text-xl font-bold text-primary">
          mini-linked<span className="text-secondary">in</span>
        </Link>
      </div>

      {/* Right: Navigation */}
      <div className="flex items-center gap-4">
        {/* Home Icon */}
        <Link to="/" className="btn btn-ghost btn-circle" title="Home">
          <Home className="w-5 h-5" />
        </Link>

        {/* Profile Image */}
        {authUser && (
          <Link to="/profile" title="Profile">
            <div className="avatar">
              <div className="w-9 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src={authUser?.profilePicture || "/default-avatar.png"}
                  alt="Profile"
                />
              </div>
            </div>
          </Link>
        )}

        {/* Logout Button */}
        {authUser && (
          <button
            onClick={handleLogout}
            className="btn btn-ghost btn-circle tooltip"
            data-tip="Logout"
            title="Logout"
          >
            <LogOut className="w-5 h-5 text-red-500" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
