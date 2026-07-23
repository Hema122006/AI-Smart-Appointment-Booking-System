import { useEffect, useState } from "react";
import {
  getDoctors,
  addDoctor,
  updateDoctor,
  deleteDoctor,
} from "../../services/doctorService";
import { toggleAvailability } from "../../services/doctorService";

const input = {
  width: "100%",
  padding: "12px",
  borderRadius: "8px",
  border: "1px solid #ccc",
  fontSize: "15px",
  boxSizing: "border-box" as const,
};

function DoctorManagement() {

  const emptyDoctor = {
    name: "",
    email: "",
    mobileNumber: "",
    specialization: "",
    qualification: "",
    experience: "",
    consultationFee: "",
    availableDays: "",
    availableTime: "",
    available: true,
    password: "",
  };

  const [doctors, setDoctors] = useState<any[]>([]);
  const [doctor, setDoctor] = useState<any>(emptyDoctor);
  const [editing, setEditing] = useState(false);

  const loadDoctors = () => {
    getDoctors().then((res) => {
      setDoctors(res.data);
    });
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const saveDoctor = async () => {

    try {

      if (editing && doctor.id) {

        await updateDoctor(doctor.id, doctor);

        alert("Doctor Updated Successfully");

      } else {

        // Send WITHOUT id
        const doctorData = {
          name: doctor.name,
          email: doctor.email,
          mobileNumber: doctor.mobileNumber,
          specialization: doctor.specialization,
          qualification: doctor.qualification,
          experience: doctor.experience,
          consultationFee: doctor.consultationFee,
          availableDays: doctor.availableDays,
          availableTime: doctor.availableTime,
          available: doctor.available,
          password: doctor.password,
        };

        await addDoctor(doctorData);

        alert("Doctor Added Successfully");
      }

      setDoctor(emptyDoctor);
      setEditing(false);
      loadDoctors();

    } catch (e: any) {

      console.error(e);

      if (e.response) {

        console.log(e.response.data);

        alert(
          "Status : " +
            e.response.status +
            "\n\n" +
            JSON.stringify(e.response.data, null, 2)
        );

      } else {

        alert(e.message);

      }
    }
  };

  const editDoctor = (doc: any) => {
    console.log(doc);

    setDoctor({ ...doc });

    setEditing(true);

  };

  const removeDoctor = async (id: number) => {

    if (!window.confirm("Delete this doctor?")) return;

    await deleteDoctor(id);

    loadDoctors();

  };

  return (
  <div
    style={{
      minHeight: "100vh",
      background: "transparent",
      padding: "35px",
    }}
  >
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: "30px",
      }}
    >
      <div>
        <h1
          style={{
            fontSize: "38px",
            color: "#1565C0",
            marginBottom: "5px",
          }}
        >
          👨‍⚕ Doctor Management
        </h1>

        <p
          style={{
            color: "#666",
          }}
        >
          Manage all hospital doctors from one place.
        </p>
      </div>

      <button
        onClick={() => {
          setDoctor(emptyDoctor);
          setEditing(false);
        }}
        style={{
          background: "#1976D2",
          color: "white",
          border: "none",
          padding: "15px 30px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        + Add Doctor
      </button>
    </div>

    <div
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        marginBottom: "35px",
        boxShadow: "0 5px 15px rgba(0,0,0,.15)",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
        }}
      >
        {editing ? "✏ Edit Doctor" : "➕ Add New Doctor"}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "20px",
        }}
      >
        <input
          style={input}
          placeholder="Doctor Name"
          value={doctor.name}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              name: e.target.value,
            })
          }
        />

        <input
          style={input}
          placeholder="Email"
          value={doctor.email}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              email: e.target.value,
            })
          }
        />

         <input
          style={input}
          placeholder="Password"
          value={doctor.password}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              password: e.target.value,
            })
          }
        />

        <div style={{ position: "relative" }}>
  <span
    style={{
      position: "absolute",
      left: "15px",
      top: "13px",
      color: "#555",
      fontWeight: "bold",
      fontSize: "16px",
    }}
  >
    +91
  </span>

  <input
    type="tel"
    maxLength={10}
    placeholder="9876543210"
    value={(doctor.mobileNumber ?? "").replace("+91", "")}
    onChange={(e) => {
      const number = e.target.value.replace(/\D/g, "");

      setDoctor({
        ...doctor,
        mobileNumber: "+91" + number,
      });
    }}
    style={{
      ...input,
      paddingLeft: "55px",
    }}
  />
</div>

        <input
          style={input}
          placeholder="Specialization"
          value={doctor.specialization}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              specialization: e.target.value,
            })
          }
        />

        <input
          style={input}
          placeholder="Qualification"
          value={doctor.qualification}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              qualification: e.target.value,
            })
          }
        />

        <input
          style={input}
          placeholder="Experience"
          value={doctor.experience}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              experience: Number(e.target.value),
            })
          }
        />

        <input
          style={input}
          placeholder="Consultation Fee"
          value={doctor.consultationFee}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              consultationFee: Number(e.target.value),
            })
          }
        />

        <input
          style={input}
          placeholder="Available Days"
          value={doctor.availableDays}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              availableDays: e.target.value,
            })
          }
        />

        <input
          style={input}
          placeholder="Available Time"
          value={doctor.availableTime}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              availableTime: e.target.value,
            })
          }
        />
      </div>

      <button
        onClick={saveDoctor}
        style={{
          marginTop: "25px",
          background: editing ? "#FF9800" : "#4CAF50",
          color: "white",
          border: "none",
          padding: "15px 35px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        {editing ? "Update Doctor" : "Add Doctor"}
      </button>
    </div>

      <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill,minmax(340px,1fr))",
    gap: "25px",
  }}
>
  {doctors.map((doc) => (
    <div
      key={doc.id}
      style={{
        background: "white",
        borderRadius: "15px",
        padding: "25px",
        boxShadow: "0 15px 35px rgba(0,0,0,.12)",
        transition: ".3s",
      }}
    >
      <h2
        style={{
          color: "#1565C0",
          marginBottom: "15px",
        }}
      >
        👨‍⚕️ {doc.name}
      </h2>

      <p>
        <b>📧 Email</b>
        <br />
        {doc.email}
      </p>

      <p>
        <b>📱 Mobile</b>
        <br />
        <a
  href={`tel:${doc.mobileNumber}`}
  style={{
    textDecoration: "none",
    color: "#1565C0",
    fontWeight: "bold",
  }}
>
  {doc.mobileNumber}
</a>
      </p>

      <p>
        <b>🩺 Specialization</b>
        <br />
        {doc.specialization}
      </p>

      <p>
        <b>🎓 Qualification</b>
        <br />
        {doc.qualification}
      </p>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "15px",
          flexWrap: "wrap",
        }}
      >
        <span
          style={{
            background: "#E3F2FD",
            color: "#1565C0",
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          🏆 {doc.experience} Years
        </span>

        <span
          style={{
            background: "#FFF3E0",
            color: "#E65100",
            padding: "6px 12px",
            borderRadius: "20px",
            fontWeight: "bold",
          }}
        >
          💰 ₹{doc.consultationFee}
        </span>
      </div>

      <div
  style={{
    marginTop: "20px",
  }}
>
  <span
    style={{
      background: doc.available ? "#4CAF50" : "#E53935",
      color: "white",
      padding: "8px 15px",
      borderRadius: "20px",
      fontWeight: "bold",
    }}
  >
    {doc.available ? "🟢 Available" : "🔴 Unavailable"}
  </span>
</div>

      <p>
        <b>📅 Days</b>
        <br />
        {doc.availableDays}
      </p>

      <p>
        <b>🕒 Time</b>
        <br />
        {doc.availableTime}
      </p>

      <div
  style={{
    display: "flex",
    gap: "10px",
    marginTop: "20px",
    flexWrap: "wrap",
  }}
>

  <button
    onClick={() => editDoctor(doc)}
    style={{
      flex: 1,
      background: "#1976D2",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ✏ Edit
  </button>

  <button
    onClick={async () => {
      await toggleAvailability(doc.id);
      loadDoctors();
    }}
    style={{
      flex: 1,
      background: doc.available ? "#FB8C00" : "#4CAF50",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    {doc.available ? "🚫 Disable" : "✅ Enable"}
  </button>

  <button
    onClick={() => removeDoctor(doc.id)}
    style={{
      flex: 1,
      background: "#E53935",
      color: "white",
      border: "none",
      padding: "12px",
      borderRadius: "10px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    🗑 Delete
  </button>

</div>
    </div>
  ))}
</div>

    </div>
  );

  
}

export default DoctorManagement;