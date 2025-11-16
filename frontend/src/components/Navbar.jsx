import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, setUser } = useContext(AuthContext);

  function handleLogout() {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  }

  return (
    <nav className="bg-white shadow-sm px-4 py-3 flex justify-between items-center sticky top-0 z-50">
      <Link to="/" className="text-xl font-bold text-green-700">
        Matcha Social
      </Link>

      <div className="flex gap-4 items-center">
        <Link to="/" className="text-gray-700 hover:text-green-700">
          Home
        </Link>
        {user ? (
          <>
            <Link to="/create" className="text-gray-700 hover:text-green-700">
              Create
            </Link>
            <div className="flex items-center gap-3">
              <Link
                to={`/profile/${user._id || user.id}`}
                className="text-gray-700 hover:text-green-700"
              >
                @{user.username}
              </Link>
              <button
                onClick={handleLogout}
                className="text-gray-700 hover:text-green-700"
              >
                Logout
              </button>
            </div>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-700 hover:text-green-700">
              Login
            </Link>
            <Link to="/register" className="text-gray-700 hover:text-green-700">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
