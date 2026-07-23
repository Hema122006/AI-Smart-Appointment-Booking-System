import { useEffect, useState } from "react";
import { getAppointments } from "../../services/appointmentService";

function RecentAppointments() {

  const [appointments, setAppointments] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadAppointments();
  }, []);

  const loadAppointments = async () => {
    try {
      const res = await getAppointments();
      setAppointments(res.data);
    } catch (e) {
      console.error(e);
    }
  };

  const badgeColor = (status: string) => {

    switch (status) {

      case "CONFIRMED":
        return "#2196F3";

      case "COMPLETED":
        return "#4CAF50";

      case "CANCELLED":
        return "#F44336";

      default:
        return "#FF9800";
    }
  };

  const filteredAppointments = appointments.filter((a) =>
    (a.patient?.name || "")
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (

    <div
      style={{
        background: "white",
        
        borderRadius: "15px",
        padding: "25px",
        marginTop: "30px",
        boxShadow: "0px 5px 15px rgba(0,0,0,.1)"
      }}
    >

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px"
        }}
      >

        <h2>Recent Appointments</h2>

        <input
          type="text"
          placeholder="Search patient..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: "10px",
            borderRadius: "8px",
            border: "1px solid #ddd",
            width: "250px"
          }}
        />

      </div>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse"
        }}
      >

        <thead
          style={{
            background: "#1976D2",
            color: "white"
          }}
        >

          <tr>

            <th style={th}>Patient</th>

            <th style={th}>Doctor</th>

            <th style={th}>Date</th>

            <th style={th}>Time</th>

            <th style={th}>Payment</th>

            <th style={th}>Status</th>

          </tr>

        </thead>

        <tbody>

          {filteredAppointments.map((a) => (

            <tr key={a.id}>

              <td style={td}>{a.patient?.name}</td>

              <td style={td}>{a.doctor?.name}</td>

              <td style={td}>{a.appointmentDate}</td>

              <td style={td}>{a.appointmentTime}</td>

              <td style={td}>
                {a.paymentCompleted ? "✅ Paid" : "❌ Pending"}
              </td>

              <td style={td}>

                <span
                  style={{
                    background: badgeColor(a.status),
                    color: "white",
                    padding: "6px 12px",
                    borderRadius: "20px",
                    fontWeight: "bold"
                  }}
                >
                  {a.status}
                </span>

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

const th = {
  padding: "14px",
  textAlign: "center" as const,
};

const td = {
  padding: "14px",
  borderBottom: "1px solid #eee",
  textAlign: "center" as const,
};

export default RecentAppointments;