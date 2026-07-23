import { useState } from "react";
import { login } from "../../services/authService";
import { useNavigate, Link } from "react-router-dom";


function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    mobileNumber: "",
    password: "",
  
  });

  const submit = async () => {
    try {
      const res = await login({
    mobileNumber: "+91" + form.mobileNumber,
    password: form.password,
});

      const data = res.data;
      console.log(data);
    

      localStorage.setItem("token", data.token);
      localStorage.setItem("role", data.role);


      if (data.userId)
            localStorage.setItem("userId", data.userId.toString());
      if (data.name) localStorage.setItem("name", data.name);

      alert("Login Successful");
          localStorage.setItem("doctorId", data.userId.toString());

      if (data.role === "DOCTOR") {
    localStorage.setItem("doctorName", data.name);
}


      switch (data.role) {
        case "ADMIN":
          navigate("/admin-dashboard");
          break;

        case "DOCTOR":
          navigate("/doctor-dashboard");
          break;

        default:
          navigate("/patient-dashboard");
      }
    } catch (err) {
      alert("Invalid Mobile Number or Password");
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
          width: "950px",
          display: "flex",
          overflow: "hidden",
          borderRadius: "20px",
          background: "white",
          boxShadow: "0px 20px 40px rgba(0,0,0,.25)",
        }}
      >
        {/* LEFT */}

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

          <h2>Hospital Management System</h2>

          <p
            style={{
              marginTop: "20px",
              lineHeight: "1.8",
              fontSize: "18px",
            }}
          >
            Book appointments easily.
            <br />
            Manage Doctors.
            <br />
            Track Payments.
            <br />
            View Reports.
            <br />
            Fast, Secure & Smart.
          </p>
        </div>

        {/* RIGHT */}

        <div
          style={{
            width: "50%",
            padding: "55px",
          }}
        >
          <h1
  style={{
    fontSize: "42px",
    fontWeight: "700",
    color: "#1565C0",
    letterSpacing: "1px",
    textAlign: "center",
  }}
>
  Welcome Back 👋
</h1>

          <p
            style={{
              textAlign: "center",
              color: "gray",
              marginBottom: "30px",
            }}
          >
            Login to continue
          </p>

        <div style={{ position: "relative" }}>
  <span
    style={{
      position: "absolute",
      left: "15px",
      top: "14px",
      fontWeight: "bold",
      color: "#555",
    }}
  >
    +91
  </span>

  <input
    type="tel"
    maxLength={10}
    placeholder="9876543210"
    value={form.mobileNumber}
    onChange={(e) =>
      setForm({
        ...form,
        mobileNumber: e.target.value.replace(/\D/g, ""),
      })
    }
    style={{
      ...input,
      paddingLeft: "55px",
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
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: "18px",
              }}
            >
              {showPassword ? "🙈" : "👁"}
            </button>
            <div
    style={{
      textAlign: "right",
      marginTop: "8px",
      marginBottom: "10px",
    }}
  >
    <Link
      to="/forgot-password"
      style={{
        color: "#1976D2",
        textDecoration: "none",
        fontWeight: "bold",
        fontSize: "14px",
      }}
    >
      Forgot Password?
    </Link>
  </div>
          </div>

          
          

          <button
            onClick={submit}
            style={{
              width: "100%",
              padding: "15px",
              border: "none",
              borderRadius: "10px",
              background: "#1976D2",
              color: "white",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              transition: ".3s",
            }}
          >
            Login
          </button>

          <p
            style={{
              textAlign: "center",
              marginTop: "25px",
            }}
          >
            Don't have an account?
          </p>

          <Link to="/register">
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
              Create Account
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

export default Login;