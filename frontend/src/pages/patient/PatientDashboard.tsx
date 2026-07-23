import { Link } from "react-router-dom";

function PatientDashboard() {

  const username = localStorage.getItem("name") || "Patient";

  return (

    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
                           "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    overflowX: "auto",
        padding: "35px"
      }}
    >

      <h1
        style={{
          color: "#1565C0",
          fontSize: "38px",
          marginBottom: "5px"
        }}
      >
        👋 Welcome, {username}
      </h1>

      <p
        style={{
          color: "#666",
          fontSize: "18px",
          marginBottom: "35px"
        }}
      >
        Manage your healthcare with Smart Appointment System
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px"
        }}
      >

        <DashboardCard
          emoji="📅"
          title="Book Appointment"
          description="Book appointments with specialist doctors."
          color="#1976D2"
          path="/appointment"
        />

        <DashboardCard
          emoji="📋"
          title="Appointment History"
          description="View all your previous appointments."
          color="#4CAF50"
          path="/appointment-history"
        />

    

        <DashboardCard
          emoji="💡"
          title="Health Tips"
          description="Daily health and wellness tips."
          color="#009688"
          path="/health-tips"
        />

        <DashboardCard
    emoji="👤"
    title="My Profile"
    description="View and update your profile."
    color="#7B1FA2"
    path="/profile"
/>

<DashboardCard
    emoji="🔔"
    title="Notifications"
    description="Appointment reminders and alerts."
    color="#5E35B1"
    path="/notifications"
/>

        <DashboardCard
          emoji="🚪"
          title="Logout"
          description="Logout from your account."
          color="#F44336"
          path="/"
          logout={true}
        />

      </div>

    </div>

  );

}

function DashboardCard({
  emoji,
  title,
  description,
  color,
  path,
  logout
}: any) {

  const logoutUser = () => {

    if (logout) {

      localStorage.clear();

    }

  };

  return (

    <Link
      to={path}
      onClick={logoutUser}
      style={{
        textDecoration: "none"
      }}
    >

      <div
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
    e.currentTarget.style.boxShadow = "0 15px 35px rgba(0,0,0,.18)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
    e.currentTarget.style.boxShadow = "0 8px 20px rgba(0,0,0,.12)";
  }}
  style={{
    background: "white",
    borderRadius: "18px",
    padding: "30px",
    boxShadow: "0 8px 20px rgba(0,0,0,.12)",
    transition: "all 0.3s ease",
    cursor: "pointer",
    borderTop: `6px solid ${color}`,
    minHeight: "220px"
  }}
>

        <div
          style={{
            fontSize: "55px"
          }}
        >
          {emoji}
        </div>

        <h2
          style={{
            color,
            marginTop: "20px"
          }}
        >
          {title}
        </h2>

        <p
          style={{
            color: "#666",
            marginTop: "12px",
            lineHeight: "26px"
          }}
        >
          {description}
        </p>

      </div>

    </Link>

  );

}

export default PatientDashboard;