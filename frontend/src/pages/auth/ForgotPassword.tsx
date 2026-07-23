import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function ForgotPassword() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    mobileNumber: "",
    password: "",
    confirmPassword: "",
  });

  const submit = async () => {
    if (
      !form.mobileNumber ||
      !form.password ||
      !form.confirmPassword
    ) {
      alert("Please fill all fields");
      return;
    }

    if (form.password !== form.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      await axios.put(
        "https://ai-smart-appointment-booking-system-2.onrender.com/api/auth/change-password",
        {
          mobileNumber: "+91" + form.mobileNumber,
          password: form.password,
        }
      );

      alert("✅ Password Changed Successfully");

      navigate("/login");

    } catch (err) {
      console.log(err);
      alert("Mobile Number Not Found");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background:
          "linear-gradient(rgba(255,255,255,.6),rgba(255,255,255,.4)),url('/images/hospital-bg.png')",
        backgroundSize: "cover",
      }}
    >
      <div
        style={{
          width: "450px",
          background: "white",
          borderRadius: "15px",
          padding: "40px",
          boxShadow: "0 15px 35px rgba(0,0,0,.2)",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            color: "#1565C0",
          }}
        >
          🔒 Forgot Password
        </h1>

        <p
          style={{
            textAlign: "center",
            color: "gray",
            marginBottom: "30px",
          }}
        >
          Create a new password
        </p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginBottom: "18px",
          }}
        >
          <div
            style={{
              width: "80px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              border: "1px solid #ddd",
              borderRadius: "8px",
              background: "#f8f9fa",
              fontWeight: "bold",
            }}
          >
            +91
          </div>

          <input
            placeholder="Mobile Number"
            maxLength={10}
            value={form.mobileNumber}
            onChange={(e) =>
              setForm({
                ...form,
                mobileNumber: e.target.value.replace(/\D/g, ""),
              })
            }
            style={input}
          />
        </div>

        <input
          type="password"
          placeholder="New Password"
          value={form.password}
          onChange={(e) =>
            setForm({
              ...form,
              password: e.target.value,
            })
          }
          style={input}
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={form.confirmPassword}
          onChange={(e) =>
            setForm({
              ...form,
              confirmPassword: e.target.value,
            })
          }
          style={input}
        />

        <button
          onClick={submit}
          style={{
            width: "100%",
            padding: "15px",
            background: "#1565C0",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Update Password
        </button>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "15px",
  border: "1px solid #ddd",
  borderRadius: "10px",
  fontSize: "16px",
  marginBottom: "18px",
  boxSizing: "border-box" as const,
};

export default ForgotPassword;