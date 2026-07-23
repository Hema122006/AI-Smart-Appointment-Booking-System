import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register } from "../../services/authService";

function Register() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    role: "PATIENT",
  });

  const submit = async () => {
  if (
    !form.name ||
    !form.email ||
    !form.mobileNumber ||
    !form.password
  ) {
    alert("Please fill all fields");
    return;
  }

  try {
    await register({
      ...form,
      mobileNumber: "+91" + form.mobileNumber,
    });

    alert("Registration Successful");
    navigate("/login");
  } catch (err) {
    alert("Registration Failed");
    console.log(err);
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
          "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <div
        style={{
          width: "1000px",
          display: "flex",
          background: "white",
          borderRadius: "20px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,.25)",
        }}
      >
        {/* LEFT PANEL */}

        <div
          style={{
            width: "50%",
            background:
              "linear-gradient(135deg,#1565C0,#42A5F5)",
            color: "white",
            padding: "60px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              fontSize: "42px",
              marginBottom: "20px",
            }}
          >
            🏥 Smart Appointment
          </h1>

          <h2>Create Your Account</h2>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.8",
              fontSize: "18px",
            }}
          >
            Register once and enjoy
            <br />
            ✓ Online Appointment Booking
            <br />
            ✓ Doctor Consultation
            <br />
            ✓ Payment Tracking
            <br />
            ✓ Appointment History
          </p>
        </div>

        {/* RIGHT PANEL */}

        <div
          style={{
            width: "50%",
            padding: "50px",
          }}
        >
          <h1
            style={{
              color: "#1565C0",
              textAlign: "center",
            }}
          >
            Register
          </h1>

          <p
            style={{
              textAlign: "center",
              color: "gray",
              marginBottom: "25px",
            }}
          >
            Create your account
          </p>

          <input
            placeholder="👤 Full Name"
            value={form.name}
            onChange={(e) =>
              setForm({
                ...form,
                name: e.target.value,
              })
            }
            style={input}
          />

          <input
            placeholder="📧 Email Address"
            value={form.email}
            onChange={(e) =>
              setForm({
                ...form,
                email: e.target.value,
              })
            }
            style={input}
          />

          <div
  style={{
    display: "flex",
    marginBottom: "18px",
    gap: "10px",
  }}
>
  <div
    style={{
      width: "80px",
      border: "1px solid #ddd",
      borderRadius: "10px",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f8f9fa",
      fontWeight: "bold",
      color: "#1565C0",
      fontSize: "17px",
    }}
  >
    +91
  </div>

  <input
    type="tel"
    placeholder="Mobile Number"
    maxLength={10}
    value={form.mobileNumber}
    onChange={(e) => {
      const value = e.target.value.replace(/\D/g, "");
      setForm({
        ...form,
        mobileNumber: value,
      });
    }}
    style={{
      ...input,
      marginBottom: 0,
    }}
  />
</div>

          <div
            style={{
              position: "relative",
            }}
          >
            <input
              type={showPassword ? "text" : "password"}
              placeholder="🔒 Password"
              value={form.password}
              onChange={(e) =>
                setForm({
                  ...form,
                  password: e.target.value,
                })
              }
              style={input}
            />

            <button
              onClick={() =>
                setShowPassword(!showPassword)
              }
              style={{
                position: "absolute",
                right: "10px",
                top: "12px",
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
          </div>

          <button
            onClick={submit}
            style={{
              width: "100%",
              padding: "15px",
              background: "#1976D2",
              color: "white",
              border: "none",
              borderRadius: "10px",
              fontWeight: "bold",
              fontSize: "18px",
              cursor: "pointer",
            }}
          >
            Register
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Already have an account?
          </p>

          <Link to="/login">
            <button
              style={{
                width: "100%",
                padding: "15px",
                marginTop: "10px",
                borderRadius: "10px",
                border: "2px solid #1976D2",
                background: "white",
                color: "#1976D2",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Login
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

const input = {
  width: "100%",
  padding: "15px",
  marginBottom: "18px",
  borderRadius: "10px",
  border: "1px solid #ddd",
  fontSize: "16px",
  outline: "none",
  boxSizing: "border-box" as const,
};

export default Register;