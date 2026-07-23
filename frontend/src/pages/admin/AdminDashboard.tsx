import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDashboard } from "../../services/adminService";

import RevenueChart from "../../components/admin/charts/RevenueChart";
import AppointmentChart from "../../components/admin/charts/AppointmentChart";
import DoctorChart from "../../components/admin/charts/DoctorChart";
import RecentAppointments from "../../components/admin/RecentAppointments";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";

function AdminDashboard() {
  const [data, setData] = useState<any>({});
  const navigate = useNavigate();

  useEffect(() => {
    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const res = await getDashboard();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const pieData = [
    {
      name: "Patients",
      value: data.patients || 0,
    },
    {
      name: "Doctors",
      value: data.doctors || 0,
    },
  ];

  const barData = [
    {
      name: "Appointments",
      value: data.appointments || 0,
    },
    {
      name: "Revenue",
      value: data.revenue || 0,
    },
  ];

  const COLORS = ["#1976D2", "#43A047"];

  return (
    <div
style={{
    minHeight:"100vh",
    background:"transparent",
    padding:"35px"
}}
>
      {/* Header */}

      <div
        style={{
          marginBottom: "35px",
        }}
      >
        <h1
  style={{
    fontSize: "42px",
    fontWeight: "700",
    color: "#1565C0",
    letterSpacing: "1px",
    marginBottom: "8px",
  }}
>
  🏥 Smart Appointment Admin Dashboard
</h1>

        <p
          style={{
            color: "#64748B",
            fontSize: "17px",
          }}
        >
          Welcome back Administrator
        </p>
        <p
style={{
color:"#888",
fontSize:"14px"
}}
>
Last Updated :
{new Date().toLocaleString()}
</p>
      </div>

      {/* Dashboard Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "22px",
        }}
      >
        <Card
          title="Patients"
          value={data.patients || 0}
          icon="👥"
          color="#1976D2"
        />

        <Card
          title="Doctors"
          value={data.doctors || 0}
          icon="👨‍⚕️"
          color="#43A047"
        />

        <Card
          title="Appointments"
          value={data.appointments || 0}
          icon="📅"
          color="#FB8C00"
        />

        <Card
          title="Revenue"
          value={`₹ ${(data.revenue || 0).toLocaleString()}`}
          icon="💰"
          color="#8E24AA"
        />

        <Card
          title="Confirmed"
          value={data.confirmed || 0}
          icon="✅"
          color="#009688"
        />

        <Card
          title="Completed"
          value={data.completed || 0}
          icon="✔"
          color="#4CAF50"
        />

        <Card
          title="Cancelled"
          value={data.cancelled || 0}
          icon="❌"
          color="#E53935"
        />

        <Card
          title="Pending"
          value={data.pending || 0}
          icon="⏳"
          color="#F9A825"
        />
      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        <div style={cardStyle}>
          <h2 style={heading}>
            📈 Monthly Revenue
          </h2>

          <RevenueChart />
        </div>

        <div style={cardStyle}>
          <h2 style={heading}>
            📅 Weekly Appointments
          </h2>

          <AppointmentChart />
        </div>

        <div style={cardStyle}>
          <h2 style={heading}>
            👨‍⚕️ Doctor Specializations
          </h2>

          <DoctorChart />
        </div>

        <div style={cardStyle}>
          <h2 style={heading}>
            📊 Patients vs Doctors
          </h2>

          <ResponsiveContainer
            width="100%"
            height={300}
          >
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={110}
                innerRadius={55}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index]}
                  />
                ))}
              </Pie>

              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div
          style={{
            ...cardStyle,
            gridColumn: "span 1",
          }}
        >
          <h2 style={heading}>
            📈 Analytics
          </h2>

          <ResponsiveContainer
            width="100%"
            height={200}
          >
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="name" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="value"
                fill="#1976D2"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
        </div>

              {/* Bottom Section */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        {/* Recent Appointments */}
        <RecentAppointments />

        {/* Quick Actions */}

        <div style={cardStyle}>
          <h2 style={heading}>⚡ Quick Actions</h2>

          <button
    style={quickBtn}
    onClick={() => navigate("/doctor-management")}
>
    ➕ Add Doctor
</button>

          <button
    style={quickBtn}
    onClick={() => navigate("/patient-management")}
>
    👥 Add Patient
</button>

          <button
    style={quickBtn}
    onClick={() => navigate("/appointment-management")}
>
    📅 Appointments
</button>

        <button
  style={quickBtn}
  onClick={() => navigate("/reports")}
>
  📊 Generate Report
</button>
        </div>
      </div>

    </div>
  );
}


function Card({
  title,
  value,
  icon,
  color,
}: {
  title: string;
  value: any;
  icon: string;
  color: string;
}) {
  return (
    <div
  onMouseEnter={(e) => {
    e.currentTarget.style.transform = "translateY(-8px)";
  }}
  onMouseLeave={(e) => {
    e.currentTarget.style.transform = "translateY(0px)";
  }}
  style={{
    background: `linear-gradient(135deg, ${color}, ${color}CC)`,
    color: "white",
    borderRadius: "18px",
    padding: "25px",
    boxShadow: "0 8px 18px rgba(0,0,0,.15)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  }}
>
      <div
        style={{
          fontSize: "40px",
          marginBottom: "10px",
        }}
      >
        {icon}
      </div>
         
      <h1
        style={{
          margin: 0,
          fontSize: "34px",
        }}
      >
        {value}
      </h1>

      <p
  style={{
    marginTop: "10px",
    fontSize: "20px",
    fontWeight: "700",
    color: "#FFFFFF",
    textShadow: "2px 2px 5px rgba(0,0,0,0.4)",
  }}
>
  {title}
</p>
    </div>

    
  );
}

/* ------------------------------- */

const cardStyle = {
  background: "white",
  borderRadius: "18px",
  padding: "25px",
  boxShadow: "0 8px 18px rgba(0,0,0,.12)",
};

const heading = {
  marginBottom: "20px",
  color: "#0F172A",
};

const tableHeader = {
  padding: "14px",
};

const tableCell = {
  padding: "14px",
  textAlign: "center" as const,
  borderBottom: "1px solid #E5E7EB",
};

const quickBtn = {
  width: "100%",
  padding: "15px",
  marginTop: "15px",
  border: "none",
  borderRadius: "10px",
  background: "#1976D2",
  color: "white",
  fontWeight: "bold" as const,
  fontSize: "16px",
  cursor: "pointer",
};

export default AdminDashboard;