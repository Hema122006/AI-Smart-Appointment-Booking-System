import { useEffect, useState } from "react";
import {
    getDoctorAppointments,
    completeAppointment,
    cancelAppointment
} from "../../services/doctorAppointmentService";

function DoctorAppointments() {
  const doctorId = Number(localStorage.getItem("doctorId"));

  const [appointments, setAppointments] = useState<any[]>([]);

  const loadAppointments = async () => {
    try {
      const res = await getDoctorAppointments(doctorId);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, []);

  const approve = async (id: number) => {
    await completeAppointment(id);
    loadAppointments();
  };

  const reject = async (id: number) => {
    await cancelAppointment(id);
    loadAppointments();
  };

  const complete = async (id: number) => {
    await completeAppointment(id);
    loadAppointments();
  };

  const badge = (status: string) => {
    switch (status) {
      case "PENDING":
        return "#ff9800";
      case "CONFIRMED":
        return "#4CAF50";
      case "COMPLETED":
        return "#2196F3";
      case "CANCELLED":
        return "#F44336";
      default:
        return "#9E9E9E";
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>👨‍⚕️ Doctor Appointments</h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          background: "white",
          boxShadow: "0 5px 15px rgba(0,0,0,.2)",
        }}
      >
        <thead
          style={{
            background: "#1565C0",
            color: "white",
          }}
        >
          <tr>
            <th>ID</th>
            <th>Patient</th>
            <th>Date</th>
            <th>Time</th>
            <th>Status</th>
            <th>Emergency</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {appointments.map((a) => (
            <tr
  key={a.id}
  style={{
    background: a.emergency ? "#FFEBEE" : "white",
  }}
>
              <td>{a.id}</td>
              <td>{a.patient?.name}</td>
              <td>{a.appointmentDate}</td>
              <td>{a.appointmentTime}</td>

              <td>
                <span
                  style={{
                    background: badge(a.status),
                    color: "white",
                    padding: "5px 12px",
                    borderRadius: 20,
                  }}
                >
                  {a.status}
                </span>
              </td>

              <td>
  {a.emergency ? (
    <span
      style={{
        background: "#E53935",
        color: "white",
        padding: "6px 12px",
        borderRadius: "20px",
        fontWeight: "bold",
      }}
    >
      🚑 Emergency
    </span>
  ) : (
    <span
      style={{
        background: "#4CAF50",
        color: "white",
        padding: "6px 12px",
        borderRadius: "20px",
        fontWeight: "bold",
      }}
    >
      Normal
    </span>
  )}
</td>

              <td>
                <button
                  onClick={() => approve(a.id)}
                  style={{
                    background: "#4CAF50",
                    color: "white",
                    marginRight: 5,
                  }}
                >
                  Approve
                </button>

                <button
                  onClick={() => reject(a.id)}
                  style={{
                    background: "#F44336",
                    color: "white",
                    marginRight: 5,
                  }}
                >
                  Reject
                </button>

                <button
                  onClick={() => complete(a.id)}
                  style={{
                    background: "#2196F3",
                    color: "white",
                  }}
                >
                  Complete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorAppointments;