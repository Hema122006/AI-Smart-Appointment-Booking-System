import { useEffect, useState } from "react";
import { getPatientAppointments } from "../../services/appointmentService";
import { useNavigate } from "react-router-dom";


function AppointmentHistory() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const patientId = Number(localStorage.getItem("userId"));

    getPatientAppointments(patientId)
      .then((res: any) => {
        setAppointments(res.data);
      })
      .catch((err: any) => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const statusColor = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "#1976D2";

      case "COMPLETED":
        return "#4CAF50";

      case "CANCELLED":
        return "#F44336";

      case "PENDING":
        return "#FF9800";

      default:
        return "#9E9E9E";
    }
  };

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
      <h1
        style={{
          color: "#1565C0",
          marginBottom: "5px",
        }}
      >
        📋 Appointment History
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        View all your appointments and payment details.
      </p>

      {loading ? (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 15px 35px rgba(0,0,0,.12)",
          }}
        >
          <h2>Loading...</h2>
        </div>
      ) : appointments.length === 0 ? (
        <div
          style={{
            background: "white",
            padding: "50px",
            borderRadius: "15px",
            textAlign: "center",
            boxShadow: "0 15px 35px rgba(0,0,0,.12)",
          }}
        >
          <h2>No Appointments Found</h2>

          <p>You haven't booked any appointments yet.</p>
        </div>
      ) : (
        <div
          style={{
            background: "white",
            borderRadius: "15px",
            overflow: "hidden",
            boxShadow: "0 15px 35px rgba(0,0,0,.12)",
          }}
        >
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead
              style={{
                background: "#1976D2",
                color: "white",
              }}
            >
              
              <tr>
                <th style={th}>Doctor</th>
                <th style={th}>Specialization</th>
                <th style={th}>Date</th>
                <th style={th}>Time</th>
                <th style={th}>Status</th>
                <th style={th}>Payment</th>
                <th style={th}>Amount</th>
                <th style={th}>Review</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id}>
                  <td style={td}>
                    👨‍⚕️ {appointment.doctor?.name}
                  </td>

                  <td style={td}>
                    {appointment.doctor?.specialization}
                  </td>

                  <td style={td}>
                    {appointment.appointmentDate}
                  </td>

                  <td style={td}>
                    {appointment.appointmentTime}
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        background: statusColor(appointment.status),
                        color: "white",
                        padding: "6px 14px",
                        borderRadius: "20px",
                        fontWeight: "bold",
                        fontSize: "14px",
                      }}
                    >
                      {appointment.status}
                    </span>
                  </td>

                  <td style={td}>
                    {appointment.paymentCompleted ? (
                      <span
                        style={{
                          color: "green",
                          fontWeight: "bold",
                        }}
                      >
                        ✅ Paid
                      </span>
                    ) : (
                      <span
                        style={{
                          color: "#F57C00",
                          fontWeight: "bold",
                        }}
                      >
                        ⏳ Pending
                      </span>
                    )}
                  </td>

                  <td style={td}>
                    ₹{appointment.paymentAmount}
                  </td>
                  <td style={td}>
  {appointment.status === "COMPLETED" && (
    <button
      onClick={() =>
        navigate("/review", {
          state: {
            patientId: appointment.patient.id,
            doctorId: appointment.doctor.id,
          },
        })
      }
      style={{
        background: "#1976D2",
        color: "white",
        border: "none",
        padding: "8px 15px",
        borderRadius: "6px",
        cursor: "pointer",
      }}
    >
      ⭐ Review
    </button>
  )}
</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

const th = {
  padding: "16px",
  fontSize: "16px",
};

const td = {
  padding: "16px",
  textAlign: "center" as const,
  borderBottom: "1px solid #E0E0E0",
};

export default AppointmentHistory;