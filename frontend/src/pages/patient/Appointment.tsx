import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getDoctors } from "../../services/doctorService";
import { bookAppointment } from "../../services/appointmentService";
import { recommendDoctor } from "../../services/aiService";

import type { Doctor } from "../../services/doctorService";
import {
  getDoctorRating,
  getDoctorReviews,
} from "../../services/reviewService";

function Appointment() {

  const navigate = useNavigate();

  const patientId = Number(localStorage.getItem("userId"));

  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [recommendedDoctor, setRecommendedDoctor] = useState<any>(null);
  const [ratings, setRatings] = useState<{ [key: number]: number }>({});
  const [reviews, setReviews] = useState<{ [key: number]: any[] }>({});
  const [form, setForm] = useState({
    patientId: patientId,
    doctorId: 0,
    appointmentDate: "",
    appointmentTime: "",
    emergency: false,
    firstTimePatient: true,
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  const loadDoctors = async () => {
  try {

    const res = await getDoctors();

    setDoctors(res.data);

    const ratingMap: { [key: number]: number } = {};

    for (const doctor of res.data) {

      try {

        const rating = await getDoctorRating(doctor.id!);

        ratingMap[doctor.id!] = rating.data;

      } catch {

        ratingMap[doctor.id!] = 0;

      }
      try {

    const reviewRes = await getDoctorReviews(doctor.id!);

    reviews[doctor.id!] = reviewRes.data;

} catch {

    reviews[doctor.id!] = [];

}

    }

    setRatings(ratingMap);
    setReviews({ ...reviews });

  } catch (err) {

    console.log(err);

  }
  
};

  const chooseDoctor = async (doctor: Doctor) => {

    setSelectedDoctor(doctor);

    setForm({
      ...form,
      doctorId: doctor.id ?? 0,
    });

    try {

      const res = await recommendDoctor(doctor.specialization);

      setRecommendedDoctor(res.data);

    } catch (err) {

      console.log(err);

    }

  };

  const submit = async () => {

    if (form.doctorId === 0) {
      alert("Please select a doctor");
      return;
    }

    if (!form.appointmentDate) {
      alert("Please select appointment date");
      return;
    }

    if (!form.appointmentTime) {
      alert("Please select appointment time");
      return;
    }

    try {

      const res = await bookAppointment(form);

      if (form.firstTimePatient) {

        localStorage.setItem("doctorName", selectedDoctor?.name || "");

localStorage.setItem(
    "specialization",
    selectedDoctor?.specialization || ""
);

localStorage.setItem(
    "appointmentDate",
    form.appointmentDate
);

localStorage.setItem(
    "appointmentTime",
    form.appointmentTime
);
        navigate("/payment", {
          state: {
            appointmentId: res.data.id,
            amount: res.data.paymentAmount,
          },
        });

      } else {

        alert("Appointment Booked Successfully");

      }

    } catch (err) {

      console.log(err);

      alert("Booking Failed");

    }

  };

  return (

    <div
      style={{
        minHeight: "100vh",
        padding: "35px",
        background:
          "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >

      <h1
  style={{
    fontSize: "42px",
    fontWeight: "700",
    color: "#1565C0",
    letterSpacing: "1px",
    marginBottom: "5px",
  }}
>
  📅 Book Appointment
</h1>

      <p
        style={{
          color: "#666",
          marginBottom: "35px",
        }}
      >
        Choose your preferred doctor and schedule your appointment.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.2fr 0.8fr",
          gap: "30px",
        }}
      >

        {/* LEFT SIDE */}

        <div>

          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 15px 35px rgba(0,0,0,.12)",
            }}
          >

            <h2>Select Doctor</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill,minmax(250px,1fr))",
                gap: "20px",
                marginTop: "20px",
              }}
            >

              {doctors.map((doctor) => (

                <div
                  key={doctor.id}
                  onClick={() => chooseDoctor(doctor)}
                  style={{
                    cursor: "pointer",
                    border:
                      selectedDoctor?.id === doctor.id
                        ? "3px solid #1976D2"
                        : "1px solid #ddd",
                    borderRadius: "12px",
                    padding: "20px",
                    background:
                      selectedDoctor?.id === doctor.id
                        ? "#E3F2FD"
                        : "white",
                    transition: ".3s",
                  }}
                >

                  <h3 style={{ margin: 0 }}>
                    👨‍⚕️ {doctor.name}
                  </h3>

                  <p
  style={{
    color: "#FF9800",
    fontWeight: "bold",
    marginTop: "8px",
    marginBottom: "8px",
  }}
>
  ⭐ {Number (ratings[doctor.id!]) ? Number(ratings[doctor.id!] || 0).toFixed(1) : "No Ratings"}

  {reviews[doctor.id!]?.length > 0 && (

<div
style={{
background:"#F8F9FA",
padding:"10px",
borderRadius:"8px",
marginTop:"10px"
}}
>

<b>Latest Review</b>

<p
style={{
fontSize:"14px",
color:"#555",
marginTop:"5px"
}}
>

"{reviews[doctor.id!][0].comment}"

</p>

</div>

)}
</p>

                  <p>
                    <b>Specialization:</b><br />
                    {doctor.specialization}
                  </p>

                  <p>
                    <b>Experience:</b><br />
                    {doctor.experience} Years
                  </p>

                  <p>
                    <b>Fee:</b><br />
                    ₹{doctor.consultationFee}
                  </p>

                  <p
                    style={{
                      color: doctor.available ? "green" : "red",
                      fontWeight: "bold",
                    }}
                  >
                    {doctor.available
                      ? "🟢 Available"
                      : "🔴 Not Available"}
                  </p>

                </div>

              ))}

            </div>

          </div>

          <div
            style={{
              marginTop: "30px",
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 15px 35px rgba(0,0,0,.12)",
            }}
          >

            <h2>Appointment Details</h2>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "20px",
                marginTop: "20px",
              }}
            >

              <div>

                <label>Date</label>

                <input
                  type="date"
                  value={form.appointmentDate}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      appointmentDate: e.target.value,
                    })
                  }
                  style={input}
                />

              </div>

              <div>

                <label>Time</label>

                <input
                  type="time"
                  value={form.appointmentTime}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      appointmentTime: e.target.value,
                    })
                  }
                  style={input}
                />

              </div>

            </div>
                        <div
              style={{
                marginTop: "25px",
                display: "flex",
                flexDirection: "column",
                gap: "15px",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "17px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.emergency}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      emergency: e.target.checked,
                    })
                  }
                />

                🚑 Emergency Appointment
              </label>

              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  fontSize: "17px",
                }}
              >
                <input
                  type="checkbox"
                  checked={form.firstTimePatient}
                  onChange={(e) =>
                    setForm({
                      ...form,
                      firstTimePatient: e.target.checked,
                    })
                  }
                />

                👤 First Time Patient
                {form.emergency && (

<div
style={{
marginTop:"20px",
padding:"15px",
background:"#FFEBEE",
border:"2px solid red",
borderRadius:"10px",
color:"#D32F2F",
fontWeight:"bold"
}}
>

🚑 Emergency Appointment
Doctor will receive this appointment with HIGH PRIORITY.

</div>

)}
              </label>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div>

          {/* Booking Summary */}

          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 15px 35px rgba(0,0,0,.12)",
            }}
          >
            <h2>📋 Booking Summary</h2>

            {selectedDoctor ? (
              <>
                <p>
                  <b>Doctor</b><br />
                  {selectedDoctor.name}
                </p>

                <p>
                  <b>Specialization</b><br />
                  {selectedDoctor.specialization}
                </p>

                <p>
                  <b>Date</b><br />
                  {form.appointmentDate || "-"}
                </p>

                <p>
                  <b>Time</b><br />
                  {form.appointmentTime || "-"}
                </p>

                <p>
                  <b>Consultation Fee</b><br />
                  ₹
                  {form.firstTimePatient
                    ? selectedDoctor.consultationFee
                    : 0}
                </p>

                <p>
                  <b>Payment</b><br />
                  {form.firstTimePatient
                    ? "Payment Required"
                    : "No Payment"}
                </p>

                <button
                  onClick={submit}
                  style={{
                    width: "100%",
                    marginTop: "20px",
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
                  📅 Book Appointment
                </button>
              </>
            ) : (
              <p>Please select a doctor.</p>
            )}
          </div>

          {/* AI Recommendation */}

          {recommendedDoctor && (
            <div
              style={{
                marginTop: "25px",
                background: "#E3F2FD",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 15px 35px rgba(0,0,0,.12)",
              }}
            >
              <h2>🤖 AI Recommendation</h2>

                  <h3>
                      {recommendedDoctor.name}
                  </h3>

              <p>
                <b>Specialization</b><br />
                {recommendedDoctor.specialization}
              </p>

              <p>
                <b>Experience</b><br />
                {recommendedDoctor.experience} Years
              </p>

              <p>
                <b>Recommendation</b><br />
                Based on your selected specialization,
                this doctor is highly suitable for your
                appointment.
              </p>
            </div>
          )}

        </div>

      </div>

    </div>

  );

}

const input = {
  width: "100%",
  padding: "12px",
  marginTop: "8px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "16px",
  boxSizing: "border-box" as const,
};

export default Appointment;