import { FaBell, FaSearch, FaUserCircle } from "react-icons/fa";

function AdminNavbar() {
  return (
    <div className="topbar">

      <div className="search-box">

        <FaSearch />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>

      <div className="topbar-right">

        <FaBell className="icon" />

        <div className="profile">

          <FaUserCircle size={35} />

          <div>
            <h4>Admin</h4>
            <small>Administrator</small>
          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminNavbar;