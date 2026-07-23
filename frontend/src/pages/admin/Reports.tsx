import { useEffect, useState } from "react";
import { getReport } from "../../services/reportService";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import * as XLSX from "xlsx";

function Reports() {
  const [data, setData] = useState<any>({});

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await getReport();
      setData(res.data);
    } catch (err) {
      console.error(err);
    }
  };
  const exportPDF = () => {
  const doc = new jsPDF();

  doc.setFontSize(20);
  doc.text("Smart Appointment System Report", 14, 20);

  autoTable(doc, {
    startY: 35,
    head: [["Category", "Value"]],
    body: [
      ["Doctors", data.totalDoctors || 0],
      ["Patients", data.totalPatients || 0],
      ["Appointments", data.totalAppointments || 0],
      ["Pending", data.pendingAppointments || 0],
      ["Completed", data.completedAppointments || 0],
      ["Cancelled", data.cancelledAppointments || 0],
      ["Confirmed", data.confirmedAppointments || 0],
    ],
  });

  doc.save("Hospital_Report.pdf");
};

const exportExcel = () => {
  const report = [
    { Category: "Doctors", Value: data.totalDoctors || 0 },
    { Category: "Patients", Value: data.totalPatients || 0 },
    { Category: "Appointments", Value: data.totalAppointments || 0 },
    { Category: "Pending", Value: data.pendingAppointments || 0 },
    { Category: "Confirmed", Value: data.confirmedAppointments || 0 },
    { Category: "Completed", Value: data.completedAppointments || 0 },
    { Category: "Cancelled", Value: data.cancelledAppointments || 0 },
  ];

  const worksheet = XLSX.utils.json_to_sheet(report);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

  XLSX.writeFile(workbook, "Hospital_Report.xlsx");
};


  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        padding: "35px",
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
  📊 Reports & Analytics
</h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
          }}
        >
          Smart Appointment System Performance Dashboard
        </p>
      </div>

      {/* Statistics */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
          gap: "22px",
        }}
      >
        <StatCard
          title="Total Revenue"
          value={`₹ ${data.totalRevenue || 0}`}
          icon="💰"
          color="#4CAF50"
        />

        <StatCard
          title="Appointments"
          value={data.totalAppointments || 0}
          icon="📅"
          color="#2196F3"
        />

        <StatCard
          title="Doctors"
          value={data.totalDoctors || 0}
          icon="👨‍⚕️"
          color="#FF9800"
        />

        <StatCard
          title="Patients"
          value={data.totalPatients || 0}
          icon="👥"
          color="#9C27B0"
        />

        <StatCard
          title="Pending"
          value={data.pendingAppointments || 0}
          icon="⏳"
          color="#FF5722"
        />

        <StatCard
          title="Confirmed"
          value={data.confirmedAppointments || 0}
          icon="✅"
          color="#009688"
        />

        <StatCard
          title="Completed"
          value={data.completedAppointments || 0}
          icon="✔"
          color="#3F51B5"
        />

        <StatCard
          title="Cancelled"
          value={data.cancelledAppointments || 0}
          icon="❌"
          color="#E53935"
        />
      </div>

      {/* Charts */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        {/* Monthly Analytics */}

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 5px 18px rgba(0,0,0,.12)",
          }}
        >
          <h2
            style={{
              marginBottom: "20px",
              color: "#1565C0",
            }}
          >
            📈 Monthly Appointment Analytics
          </h2>

          <div
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              height: "260px",
              padding: "15px 0",
            }}
          >
            {[
              45,
              70,
              95,
              60,
              80,
              120,
              140,
              100,
              90,
              110,
              125,
              150,
            ].map((value, index) => (
              <div
                key={index}
                style={{
                  width: "28px",
                  height: `${value}px`,
                  background:
                    "linear-gradient(to top,#1565C0,#42A5F5)",
                  borderRadius: "8px 8px 0 0",
                }}
              />
            ))}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              color: "#666",
              marginTop: "10px",
            }}
          >
            {[
              "Jan",
              "Feb",
              "Mar",
              "Apr",
              "May",
              "Jun",
              "Jul",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </div>

        {/* Revenue Distribution */}

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "25px",
            boxShadow: "0 5px 18px rgba(0,0,0,.12)",
          }}
        >
          <h2
            style={{
              color: "#1565C0",
              marginBottom: "25px",
            }}
          >
            💳 Revenue Distribution
          </h2>

          <div
            style={{
              width: "220px",
              height: "220px",
              margin: "auto",
              borderRadius: "50%",
              background:
                "conic-gradient(#4CAF50 0% 55%, #2196F3 55% 75%, #FF9800 75% 90%, #E53935 90% 100%)",
            }}
          />

          <div style={{ marginTop: "25px" }}>
            <Legend color="#4CAF50" text="Consultation" />
            <Legend color="#2196F3" text="Payments" />
            <Legend color="#FF9800" text="Emergency" />
            <Legend color="#E53935" text="Refunds" />
          </div>
        </div>
      </div>
            {/* Bottom Section */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.5fr 1fr",
          gap: "25px",
          marginTop: "35px",
        }}
      >
        {/* Summary */}

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 5px 18px rgba(0,0,0,.12)",
          }}
        >
          <h2
            style={{
              color: "#1565C0",
              marginBottom: "20px",
            }}
          >
            🏥 Hospital Performance
          </h2>

          <SummaryRow
            title="Total Revenue"
            value={`₹ ${data.totalRevenue || 0}`}
          />

          <SummaryRow
            title="Total Doctors"
            value={data.totalDoctors || 0}
          />

          <SummaryRow
            title="Total Patients"
            value={data.totalPatients || 0}
          />

          <SummaryRow
            title="Appointments"
            value={data.totalAppointments || 0}
          />

          <SummaryRow
            title="Pending"
            value={data.pendingAppointments || 0}
          />

          <SummaryRow
            title="Confirmed"
            value={data.confirmedAppointments || 0}
          />

          <SummaryRow
            title="Completed"
            value={data.completedAppointments || 0}
          />

          <SummaryRow
            title="Cancelled"
            value={data.cancelledAppointments || 0}
          />
        </div>

        {/* Export */}

        <div
          style={{
            background: "white",
            borderRadius: "18px",
            padding: "30px",
            boxShadow: "0 5px 18px rgba(0,0,0,.12)",
          }}
        >
          <h2
            style={{
              color: "#1565C0",
              marginBottom: "25px",
            }}
          >
            📄 Export Center
          </h2>

          <button
            style={btn}
            onClick={() => window.print()}
          >
            🖨 Print Report
          </button>

          <br />
          <br />

          <button
            style={btn}
            onClick={exportPDF}
          >
            📄 Export PDF
          </button>

          <br />
          <br />

          <button
            style={btn}
            onClick={exportExcel}
          >
            📊 Export Excel
          </button>

          <br />
          <br />

          <button
            style={{
              ...btn,
              background: "#4CAF50",
            }}
            onClick={loadReport}
          >
            🔄 Refresh
          </button>
        </div>
      </div>

    </div>
  );
}

/* =======================
      COMPONENTS
======================= */

function StatCard({
  title,
  value,
  icon,
  color,
}: any) {
  return (
    <div
      style={{
        background: color,
        color: "white",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 6px 18px rgba(0,0,0,.18)",
      }}
    >
      <div
        style={{
          fontSize: "38px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          marginTop: "15px",
          marginBottom: "10px",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          fontSize: "34px",
          margin: 0,
        }}
      >
        {value}
      </h1>
    </div>
  );
}

function Legend({
  color,
  text,
}: any) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        marginBottom: "12px",
      }}
    >
      <div
        style={{
          width: "18px",
          height: "18px",
          background: color,
          borderRadius: "50%",
          marginRight: "10px",
        }}
      />

      <span>{text}</span>
    </div>
  );
}

function SummaryRow({
  title,
  value,
}: any) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <span
        style={{
          fontWeight: 600,
        }}
      >
        {title}
      </span>

      <span
        style={{
          color: "#1565C0",
          fontWeight: "bold",
        }}
      >
        {value}
      </span>
    </div>
  );
}

const btn = {
  width: "100%",
  padding: "14px",
  background: "#1565C0",
  color: "white",
  border: "none",
  borderRadius: "10px",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "16px",
};

export default Reports;