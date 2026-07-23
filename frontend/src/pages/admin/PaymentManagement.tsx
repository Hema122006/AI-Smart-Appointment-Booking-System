import { useEffect, useState } from "react";
import {
  getPayments,
  markPaid,
  markFailed,
  deletePayment,
} from "../../services/paymentService";

function PaymentManagement() {
  const [payments, setPayments] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPayments();
  }, []);

  const loadPayments = async () => {
    try {
      const res = await getPayments();
      setPayments(res.data);
    } catch (err) {
      console.log(err);
      alert("Unable to load payments");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "transparent",
        padding: 35,
      }}
    >
      <h1
        style={{
          color: "#1565C0",
          fontSize: 35,
          marginBottom: 10,
        }}
      >
        💳 Payment Management
      </h1>

      <p
        style={{
          color: "#777",
          marginBottom: 30,
        }}
      >
        View and manage all payments.
      </p>

      <div
        style={{
          background: "white",
          borderRadius: 15,
          overflow: "hidden",
          boxShadow: "0 5px 18px rgba(0,0,0,.15)",
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
              <th style={th}>ID</th>
              <th style={th}>Patient</th>
              <th style={th}>Doctor</th>
              <th style={th}>Amount</th>
              <th style={th}>Method</th>
              <th style={th}>Status</th>
              <th style={th}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} style={td}>
                  Loading...
                </td>
              </tr>
            ) : payments.length === 0 ? (
              <tr>
                <td colSpan={7} style={td}>
                  No Payments Found
                </td>
              </tr>
            ) : (
              payments.map((payment) => (
                <tr key={payment.id}>
                  <td style={td}>{payment.id}</td>

                  <td style={td}>
                    {payment.appointment?.patient?.name}
                  </td>

                  <td style={td}>
                    {payment.appointment?.doctor?.name}
                  </td>

                  <td style={td}>
                    ₹ {payment.amount}
                  </td>

                  <td style={td}>
                    {payment.paymentMethod}
                  </td>

                  <td style={td}>
                    <span
                      style={{
                        background:
                          payment.paymentStatus === "PAID"
                            ? "#4CAF50"
                            : "#F44336",
                        color: "white",
                        padding: "6px 15px",
                        borderRadius: 20,
                        fontWeight: "bold",
                      }}
                    >
                      {payment.paymentStatus}
                    </span>
                  </td>

                  <td style={td}>
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        justifyContent: "center",
                      }}
                    >
                      <button
                        style={green}
                        onClick={async () => {
                          await markPaid(payment.id);
                          loadPayments();
                        }}
                      >
                        Paid
                      </button>

                      <button
                        style={orange}
                        onClick={async () => {
                          await markFailed(payment.id);
                          loadPayments();
                        }}
                      >
                        Failed
                      </button>

                      <button
                        style={red}
                        onClick={async () => {
                          if (window.confirm("Delete Payment?")) {
                            await deletePayment(payment.id);
                            loadPayments();
                          }
                        }}
                      >
                        Delete
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
  padding: 15,
  textAlign: "center" as const,
};

const td = {
  padding: 15,
  textAlign: "center" as const,
  borderBottom: "1px solid #EEE",
};

const green = {
  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};

const orange = {
  background: "#FB8C00",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};

const red = {
  background: "#F44336",
  color: "white",
  border: "none",
  padding: "8px 14px",
  borderRadius: 8,
  cursor: "pointer",
};

export default PaymentManagement;