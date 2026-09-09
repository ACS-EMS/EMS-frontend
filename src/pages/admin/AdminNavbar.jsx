import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Bell,
  Search,
  ChevronDown,
  User,
  LogOut,
  Settings,
} from "lucide-react";

function AdminNavbar() {
    const [adminProfile, setAdminProfile] = useState(() => {
  const savedProfile = localStorage.getItem("adminProfile");

  return savedProfile
    ? JSON.parse(savedProfile)
    : {
        name: "Super Admin",
        email: "admin@talentai.com",
        role: "Super Admin",
        department: "Administration",
      };
});
useEffect(() => {
  const handleProfileUpdate = () => {
    const savedProfile = localStorage.getItem("adminProfile");

    if (savedProfile) {
      setAdminProfile(JSON.parse(savedProfile));
    }
  };

  window.addEventListener(
    "adminProfileUpdated",
    handleProfileUpdate
  );

  return () => {
    window.removeEventListener(
      "adminProfileUpdated",
      handleProfileUpdate
    );
  };
}, []);
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] =
    useState(false);

  const handleSearch = (e) => {
  if (e.key !== "Enter") return;

  const value = searchTerm.trim();

  if (!value) return;

  navigate(
    `/super-admin/users?search=${encodeURIComponent(value)}`
  );
};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  };

  return (
    <header className="admin-navbar">

      <div className="admin-navbar-search">
        <Search size={18} />

        <input
          type="text"
          placeholder="Search users, departments..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          onKeyDown={handleSearch}
        />
      </div>

      <div className="admin-navbar-actions">

        <button
          className="admin-notification-button"
          onClick={() =>
            alert("Notifications page coming next")
          }
        >
          <Bell size={20} />
          <span className="admin-notification-dot"></span>
        </button>

        <div className="admin-profile-wrapper">

          <button
            className="admin-profile"
            onClick={() =>
              setShowProfileMenu(
                (previous) => !previous
              )
            }
          >

            <div className="admin-profile-avatar">
  {adminProfile.name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()}
</div>

            <div className="admin-profile-info">
              <strong>{adminProfile.name}</strong>
<span>{adminProfile.role}</span>
            </div>

            <ChevronDown size={18} />

          </button>

          {showProfileMenu && (
            <div className="admin-profile-dropdown">

              <button
  onClick={() => {
    setShowProfileMenu(false);
    navigate("/super-admin/profile");
  }}
>
  <User size={17} />
  My Profile
</button>

<button
  onClick={() => {
    setShowProfileMenu(false);
    navigate("/super-admin/settings");
  }}
>
  <Settings size={17} />
  Settings
</button>

              <button
                className="logout"
                onClick={handleLogout}
              >
                <LogOut size={17} />
                Logout
              </button>

            </div>
          )}

        </div>

      </div>

    </header>
  );
}

export default AdminNavbar;