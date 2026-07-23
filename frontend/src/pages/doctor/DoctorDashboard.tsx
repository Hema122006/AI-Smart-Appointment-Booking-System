import { useEffect, useState } from "react";
import {
  getDoctorAppointments,
  approveAppointment,
  completeAppointment,
  cancelAppointment,
} from "../../services/doctorDashboardService";
import { useNavigate } from "react-router-dom";

interface Appointment {
  id: number;
  appointmentDate: string;
  appointmentTime: string;
  paymentCompleted: boolean;
  status: string;

  patient: {
    id: number;
    name: string;
  };

  doctor: {
    id: number;
    name: string;
  };
}

function DoctorDashboard() {
  const navigate = useNavigate();

const doctorName =
  localStorage.getItem("doctorName") || "Doctor";

  console.log("DoctorDashboard Loaded");

  // Temporary doctor id
  const doctorId = Number(localStorage.getItem("doctorId"));

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(true);

  const loadAppointments = async () => {

    try {

      setLoading(true);

      const res = await getDoctorAppointments(doctorId);

      console.log("Appointments =>", res.data);

      setAppointments(res.data);

    } catch (error) {

      console.error(error);

      alert("Unable to load appointments");

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {
 
    loadAppointments();

  }, []);
 const logout = () => {

localStorage.clear();

navigate("/login");

};
  const approve = async (id: number) => {

    try {

      await approveAppointment(id);

      alert("Appointment Approved");

      loadAppointments();

    } catch {

      alert("Unable to approve");

    }


  };

  const complete = async (id: number) => {

    try {

      await completeAppointment(id);

      alert("Appointment Completed");

      loadAppointments();

    } catch {

      alert("Unable to complete");

    }

  };

  const cancel = async (id: number) => {

    try {

      await cancelAppointment(id);

      alert("Appointment Cancelled");

      loadAppointments();

    } catch {

      alert("Unable to cancel");

    }
    

  };

  const statusColor = (status: string) => {

    switch (status) {

      case "CONFIRMED":
        return "#1976D2";

      case "COMPLETED":
        return "#4CAF50";

      case "CANCELLED":
        return "#F44336";

      default:
        return "#FB8C00";

    }

  };

  const totalAppointments = appointments.length;

  const completedAppointments =
    appointments.filter(a => a.status === "COMPLETED").length;

  const confirmedAppointments =
    appointments.filter(a => a.status === "CONFIRMED").length;

  const cancelledAppointments =
    appointments.filter(a => a.status === "CANCELLED").length;
    console.log("Appointments:", appointments);

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
        padding: "35px",
      }}
    >
            <div
        style={{
          marginBottom: "30px",
        }}
      >
        <div
style={{
display:"flex",
justifyContent:"space-between",
alignItems:"center",
marginBottom:"30px"
}}
>

<div>

<h1
style={{
fontSize:"35px",
color:"#1565C0"
}}
>

👨‍⚕ Doctor Dashboard

</h1>

<p>

Welcome Dr. {doctorName}

</p>

</div>

<button

onClick={logout}

style={{

background:"#F44336",

color:"white",

padding:"10px 20px",

border:"none",

borderRadius:"8px",

cursor:"pointer"

}}

>

Logout

</button>

</div>

        <p
          style={{
            color: "#555",
            fontSize: "17px",
          }}
        >
          Welcome Back Doctor
        </p>
      </div>
        
      {/* Statistics */}
        
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >

        <DashboardCard
          title="Total Appointments"
          value={totalAppointments}
          color="#1976D2"
          icon="📅"
        />

        <DashboardCard
          title="Completed"
          value={completedAppointments}
          color="#4CAF50"
          icon="✅"
        />

        <DashboardCard
          title="Confirmed"
          value={confirmedAppointments}
          color="#FB8C00"
          icon="🩺"
        />

        <DashboardCard
          title="Cancelled"
          value={cancelledAppointments}
          color="#F44336"
          icon="❌"
        />

      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "25px",
          boxShadow: "0 10px 30px rgba(0,0,0,.12)",
        }}
      >

        <h2
          style={{
            color: "#1565C0",
            marginBottom: "20px",
          }}
        >
          Appointment List
        </h2>

        {loading ? (

          <h3>Loading...</h3>

        ) : appointments.length === 0 ? (

          <h3>No Appointments Found</h3>

        ) : (

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >

            <thead>

              <tr
                style={{
                  background: "#1976D2",
                  color: "white",
                }}
              >

                <th style={th}>Patient</th>

                <th style={th}>Doctor</th>

                <th style={th}>Date</th>

                <th style={th}>Time</th>

                <th style={th}>Payment</th>

                <th style={th}>Status</th>

                <th style={th}>Action</th>

              </tr>

            </thead>

            <tbody>              
              {appointments.map((appointment: any) => (

                <tr key={appointment.id}>

                  <td style={td}>
                    {appointment.patient?.name}
                  </td>

                  <td style={td}>
                    {appointment.doctor?.name}
                  </td>

                  <td style={td}>
                    {appointment.appointmentDate}
                  </td>

                  <td style={td}>
                    {appointment.appointmentTime}
                  </td>

                  <td style={td}>

                    {appointment.paymentCompleted ? (

                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Paid
                      </span>

                    ) : (

                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Pending
                      </span>

                    )}

                  </td>

                  <td style={td}>

                    <span
                      style={{
                        background: statusColor(
                          appointment.status
                        ),
                        color: "white",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                      }}
                    >
                      {appointment.status}
                    </span>

                  </td>

                  <td style={td}>

                    {appointment.status === "PENDING" && (
                      <>
                        <button
                          style={approveButton}
                          onClick={() =>
                            approve(appointment.id)
                          }
                        >
                          Approve
                        </button>

                        <button
                          style={cancelButton}
                          onClick={() =>
                            cancel(appointment.id)
                          }
                        >
                          Reject
                        </button>
                      </>
                    )}

                    {appointment.status === "CONFIRMED" && (
                      <button
                        style={completeButton}
                        onClick={() =>
                          complete(appointment.id)
                        }
                      >
                        Complete
                      </button>
                    )}

                    {appointment.status === "COMPLETED" && (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        Completed
                      </span>
                    )}

                    {appointment.status === "CANCELLED" && (
                      <span
                        style={{
                          color: "red",
                          fontWeight: "bold",
                        }}
                      >
                        Cancelled
                      </span>
                    )}

                  </td>

                </tr>

              ))}
                          </tbody>

          </table>

        )}

      </div>

    </div>

  );

}

function DashboardCard({
  title,
  value,
  color,
  icon,
}: any) {

  return (

    <div
      style={{
        background: color,
        color: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
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

      <h3
        style={{
          margin: 0,
          fontWeight: 500,
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "12px",
          fontSize: "38px",
        }}
      >
        {value}
      </h1>

    </div>

  );

}
const th = {
  padding: "15px",
  fontSize: "16px",
  fontWeight: "bold",
  textAlign: "center" as const,
};

const td = {
  padding: "15px",
  textAlign: "center" as const,
  borderBottom: "1px solid #E0E0E0",
};

const approveButton = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
  fontWeight: "bold",
};

const completeButton = {
  background: "#1976D2",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  marginRight: "8px",
  fontWeight: "bold",
};

const cancelButton = {
  background: "#F44336",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "6px",
  cursor: "pointer",
  fontWeight: "bold",
};
export default DoctorDashboard;