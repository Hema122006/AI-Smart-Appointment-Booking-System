import { useLocation, useNavigate } from "react-router-dom";
import { markPaid } from "../../services/paymentService";
import { downloadReceipt } from "../../utils/pdfGenerator";
import { useState } from "react";

function Payment() {

  const [loading, setLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const appointmentId = location.state?.appointmentId;
  const amount = location.state?.amount;

  const payNow = async () => {

    try {

      setLoading(true);

       console.log("Appointment ID =", appointmentId);
      await new Promise((resolve) => setTimeout(resolve, 2000));

      await markPaid(appointmentId);

      downloadReceipt(
        localStorage.getItem("name") || "Patient",
        localStorage.getItem("doctorName") || "Doctor",
        localStorage.getItem("specialization") || "General",
        localStorage.getItem("appointmentDate") || "",
        localStorage.getItem("appointmentTime") || "",
        amount
      );

      setLoading(false);

      // Show Notification Popup
      setShowNotification(true);

      // Auto Redirect
      setTimeout(() => {

        navigate("/appointment-history");

      }, 4000);

    } catch (error: any) {

      console.log(error);

      alert("Payment Failed");

    }

  };

  return (

    <>
      <div
        style={{
          width: "500px",
          margin: "40px auto",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "0px 10px 30px rgba(0,0,0,.2)",
          textAlign: "center",
          background: "white"
        }}
      >

        <h1 style={{ color: "#1976D2" }}>
          💳 Payment
        </h1>

        <hr />

        <h2>Consultation Fee</h2>

        <h1
          style={{
            color: "green",
            fontSize: "45px"
          }}
        >
          ₹{amount}
        </h1>

        <img
          src="https://api.qrserver.com/v1/create-qr-code/?size=220x220&data=SmartAppointmentPayment"
          alt="QR"
        />

        <br /><br />

        <button
          onClick={payNow}
          disabled={loading}
          style={{
            padding: "15px 35px",
            background: loading ? "#9E9E9E" : "#4CAF50",
            color: "white",
            border: "none",
            borderRadius: "10px",
            cursor: "pointer",
            fontSize: "18px",
            fontWeight: "bold"
          }}
        >
          {loading ? "⏳ Processing Payment..." : "💳 Pay Now"}
        </button>

      </div>

      {/* Notification Popup */}

      {showNotification && (

        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            width: "360px",
            background: "white",
            borderRadius: "15px",
            padding: "20px",
            boxShadow: "0px 15px 35px rgba(0,0,0,.25)",
            zIndex: 9999,
            borderLeft: "6px solid #4CAF50"
          }}
        >

          <h2
            style={{
              color: "#1976D2",
              marginTop: 0
            }}
          >
            🔔 Notification
          </h2>

          <p style={{ color: "green", fontWeight: "bold" }}>
            ✅ Payment Successful
          </p>

          <hr />

          <p>📱 SMS Notification Sent</p>

          <p>💬 WhatsApp Notification Sent</p>

          <hr />

          <p>
            <b>Patient</b><br />
            {localStorage.getItem("name")}
          </p>

          <p>
            <b>Doctor</b><br />
            {localStorage.getItem("doctorName")}
          </p>

          <p>
            <b>Specialization</b><br />
            {localStorage.getItem("specialization")}
          </p>

          <p>
            <b>Date</b><br />
            {localStorage.getItem("appointmentDate")}
          </p>

          <p>
            <b>Time</b><br />
            {localStorage.getItem("appointmentTime")}
          </p>

          <div
            style={{
              marginTop: "15px",
              padding: "10px",
              background: "#E8F5E9",
              borderRadius: "8px",
              color: "#2E7D32",
              fontWeight: "bold",
              textAlign: "center"
            }}
          >
            ✔ Notification Delivered Successfully
          </div>

        </div>

      )}

    </>

  );

}

export default Payment;