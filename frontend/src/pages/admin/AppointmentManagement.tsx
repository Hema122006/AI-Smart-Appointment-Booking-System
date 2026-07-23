import { useEffect, useState } from "react";
import {
  getAppointments,
  searchAppointments,
  completeAppointment,
  cancelAppointment,
  deleteAppointment
} from "../../services/adminAppointmentService";

function AppointmentManagement() {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      setLoading(true);
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load appointments.");
    } finally {
      setLoading(false);
    }
  };

  const search = async () => {
    if (keyword.trim() === "") {
      loadAppointments();
      return;
    }

    try {
      const res = await searchAppointments(keyword);
      setAppointments(res.data);
    } catch (err) {
      console.error(err);
      alert("Search failed.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        padding: "35px",
      }}
    >
      <h1
        style={{
          fontSize: "36px",
          color: "#1565C0",
          marginBottom: "10px",
        }}
      >
        📅 Appointment Management
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        View, search and manage all appointments.
      </p>

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "25px",
        }}
      >
        <input
          type="text"
          placeholder="Search by Patient / Doctor..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1,
            padding: "14px",
            borderRadius: "10px",
            border: "1px solid #DDD",
            fontSize: "15px",
          }}
        />

        <button
          onClick={search}
          style={{
            padding: "14px 30px",
            border: "none",
            borderRadius: "10px",
            background: "#1976D2",
            color: "white",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔍 Search
        </button>
      </div>

      <div
        style={{
          background: "white",
          borderRadius: "18px",
          overflow: "hidden",
          boxShadow: "0 5px 18px rgba(0,0,0,.12)",
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
              <th style={th}>Patient</th>
              <th style={th}>Doctor</th>
              <th style={th}>Date</th>
              <th style={th}>Time</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  Loading...
                </td>
              </tr>
            ) : appointments.length === 0 ? (
              <tr>
                <td
                  colSpan={6}
                  style={{
                    textAlign: "center",
                    padding: "40px",
                  }}
                >
                  No Appointments Found
                </td>
              </tr>
            ) : (
              appointments.map((appointment: any) => (
                                      <tr key={appointment.id}>
                  <td style={td}>
                    {appointment.patient?.fullName ??
                      appointment.patient?.name ??
                      "-"}
                  </td>

                  <td style={td}>
                    {appointment.doctor?.name ?? "-"}
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
                        padding: "6px 14px",
                        borderRadius: "20px",
                        color: "white",
                        fontWeight: "bold",
                        background:
                          appointment.status  === "CONFIRMED"
                            ? "#4CAF50"
                            : appointment.status === "PENDING"
                            ? "#FB8C00"
                            : appointment.status === "COMPLETED"
                            ? "#1565C0"
                            : "#F44336",
                      }}
                    >
                      {appointment.status}
                    </span>
                    {appointment.emergency && (
  <span
    style={{
      marginLeft: "10px",
      padding: "6px 12px",
      borderRadius: "20px",
      background: "#E53935",
      color: "white",
      fontWeight: "bold",
    }}
  >
    🚑 Emergency
  </span>
)}
                  </td>

                  <td style={td}>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "8px",
                        flexWrap: "wrap",
                      }}
                    >
                      <button
                        onClick={async () => {
                          try {
                            await completeAppointment(appointment.id);
                            loadAppointments();
                          } catch (err) {
                            console.error(err);
                            alert("Unable to complete appointment.");
                          }
                        }}
                        style={buttonGreen}
                      >
                        ✔ Complete
                      </button>

                      <button
                        onClick={async () => {
                          try {
                            await cancelAppointment(appointment.id);
                            loadAppointments();
                          } catch (err) {
                            console.error(err);
                            alert("Unable to cancel appointment.");
                          }
                        }}
                        style={buttonOrange}
                      >
                        ✖ Cancel
                      </button>

                      <button
                        onClick={async () => {
                          const confirmDelete = window.confirm(
                            "Delete this appointment?"
                          );

                          if (!confirmDelete) return;

                          try {
                            await deleteAppointment(appointment.id);
                            loadAppointments();
                          } catch (err) {
                            console.error(err);
                            alert("Unable to delete appointment.");
                          }
                        }}
                        style={buttonRed}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const th = {
  padding: "15px",
  textAlign: "center" as const,
  fontWeight: "bold",
  fontSize: "15px",
};

const td = {
  padding: "15px",
  textAlign: "center" as const,
  borderBottom: "1px solid #EEEEEE",
};

const buttonGreen = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold" as const,
};

const buttonOrange = {
  background: "#FB8C00",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold" as const,
};

const buttonRed = {
  background: "#E53935",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold" as const,
};

export default AppointmentManagement;