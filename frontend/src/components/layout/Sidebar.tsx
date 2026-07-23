import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  const menu = [
    {
      name: "Dashboard",
      icon: "🏠",
      path: "/admin-dashboard",
    },
    {
      name: "Patients",
      icon: "👥",
      path: "/patient-management",
    },
    {
      name: "Doctors",
      icon: "👨‍⚕️",
      path: "/doctor-management",
    },
    {
      name: "Appointments",
      icon: "📅",
      path: "/appointment-management",
    },
    {
      name: "Payments",
      icon: "💳",
      path: "/payment-management",
    },
    {
      name: "Reports",
      icon: "📊",
      path: "/reports",
    },
  ];

  return (
    <div className="sidebar">
      <div className="logo">
        🏥
        <h2>Smart Appointment</h2>
      </div>

      <div className="menu">
        {menu.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={
              location.pathname === item.path
                ? "menu-item active"
                : "menu-item"
            }
          >
            <span>{item.icon}</span>
            <p>{item.name}</p>
          </Link>
        ))}
      </div>

      <div className="logout">
        <button
          onClick={() => {
            localStorage.clear();
            window.location.href = "/login";
          }}
        >
          🚪 Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;