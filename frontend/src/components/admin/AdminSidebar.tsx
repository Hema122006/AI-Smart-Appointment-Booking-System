import {
  FaHome,
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
  FaChartBar,
  FaCog,
  FaSignOutAlt
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menus = [
  { name: "Dashboard", icon: <FaHome />, path: "/admin-dashboard" },
  { name: "Doctors", icon: <FaUserMd />, path: "/doctor-management" },
  { name: "Patients", icon: <FaUsers />, path: "/patient-management" },
  { name: "Appointments", icon: <FaCalendarCheck />, path: "/appointment-management" },
  { name: "Payments", icon: <FaMoneyBillWave />, path: "/payment-management" },
  { name: "Reports", icon: <FaChartBar />, path: "/reports" },
  { name: "Settings", icon: <FaCog />, path: "/settings" },
];

function AdminSidebar() {
 
  return (
    

    <div className="sidebar">

      <div className="logo">

        🏥 SmartCare

      </div>

      <div className="menu">

        {menus.map((item) => (

          <NavLink
            key={item.path}
            to={item.path}
            className="menu-item"
          >

            <span>{item.icon}</span>

            <span>{item.name}</span>

          </NavLink>

        ))}

      </div>

      <button className="logout">

        <FaSignOutAlt />

        Logout

      </button>

    </div>
    

  );

}

export default AdminSidebar;