import { useEffect, useState } from "react";
import {
  getDoctorProfile,
  updateDoctorProfile,
} from "../../services/doctorProfileService";

function DoctorProfile() {
  // Later replace with localStorage doctor id
  const doctorId = 1;

  const [loading, setLoading] = useState(true);

  const [doctor, setDoctor] = useState({
    id: 0,
    name: "",
    email: "",
    mobileNumber: "",
    specialization: "",
    qualification: "",
    experience: 0,
    consultationFee: 0,
    availableDays: "",
    availableTime: "",
    available: true,
  });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);

      const res = await getDoctorProfile(doctorId);

      setDoctor(res.data);
    } catch (err) {
      console.error(err);
      alert("Unable to load profile");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      await updateDoctorProfile(doctor.id, doctor);

      alert("Profile Updated Successfully");

      loadProfile();
    } catch (err) {
      console.error(err);
      alert("Update Failed");
    }
  };

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "24px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#EEF5FF",
        minHeight: "100vh",
        padding: "40px",
      }}
    >
      <h1
        style={{
          color: "#1565C0",
          marginBottom: "10px",
        }}
      >
        👨‍⚕ Doctor Profile
      </h1>

      <p
        style={{
          color: "#666",
          marginBottom: "30px",
        }}
      >
        View and update your professional information.
      </p>

      <div
        style={{
          background: "#fff",
          borderRadius: "15px",
          padding: "35px",
          boxShadow: "0 8px 20px rgba(0,0,0,.12)",
        }}
      >
        {/* Header */}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "25px",
            marginBottom: "40px",
          }}
        >
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "50%",
              background: "#1976D2",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "55px",
              color: "white",
            }}
          >
            👨‍⚕️
          </div>

          <div>
            <h2>{doctor.name}</h2>

            <p>{doctor.specialization}</p>

            <span
              style={{
                background: doctor.available ? "#4CAF50" : "#F44336",
                color: "white",
                padding: "8px 18px",
                borderRadius: "25px",
                fontWeight: "bold",
              }}
            >
              {doctor.available ? "Available" : "Unavailable"}
            </span>
          </div>
        </div>

        {/* Form */}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
          }}
        >
          <Field
            label="Name"
            value={doctor.name}
            onChange={(v) => setDoctor({ ...doctor, name: v })}
          />

          <Field
            label="Email"
            value={doctor.email}
            onChange={(v) => setDoctor({ ...doctor, email: v })}
          />

          <Field
            label="Mobile Number"
            value={doctor.mobileNumber}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                mobileNumber: v,
              })
            }
          />

          <Field
            label="Specialization"
            value={doctor.specialization}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                specialization: v,
              })
            }
          />

          <Field
            label="Qualification"
            value={doctor.qualification}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                qualification: v,
              })
            }
          />

          <NumberField
            label="Experience"
            value={doctor.experience}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                experience: v,
              })
            }
          />

          <NumberField
            label="Consultation Fee"
            value={doctor.consultationFee}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                consultationFee: v,
              })
            }
          />

          <Field
            label="Available Days"
            value={doctor.availableDays}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                availableDays: v,
              })
            }
          />

          <Field
            label="Available Time"
            value={doctor.availableTime}
            onChange={(v) =>
              setDoctor({
                ...doctor,
                availableTime: v,
              })
            }
          />

          <div>
            <label>Availability</label>

            <select
              style={inputStyle}
              value={doctor.available ? "true" : "false"}
              onChange={(e) =>
                setDoctor({
                  ...doctor,
                  available: e.target.value === "true",
                })
              }
            >
              <option value="true">Available</option>
              <option value="false">Unavailable</option>
            </select>
          </div>
        </div>

        <div
          style={{
            marginTop: "40px",
            textAlign: "center",
          }}
        >
          <button
            onClick={saveProfile}
            style={{
              background: "#1565C0",
              color: "white",
              border: "none",
              padding: "14px 40px",
              borderRadius: "10px",
              cursor: "pointer",
              fontWeight: "bold",
              fontSize: "16px",
            }}
          >
            💾 Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: any;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        style={inputStyle}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}

function NumberField({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div>
      <label>{label}</label>

      <input
        type="number"
        style={inputStyle}
        value={value}
        onChange={(e) =>
          onChange(Number(e.target.value))
        }
      />
    </div>
  );
}

const inputStyle = {
  width: "100%",
  marginTop: "8px",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

export default DoctorProfile;