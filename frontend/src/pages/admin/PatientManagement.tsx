import { useEffect, useState } from "react";
import {
  getPatients,
  searchPatients,
  updatePatient,
  deletePatient,
} from "../../services/patientService";

function PatientManagement() {
  const [patients, setPatients] = useState<any[]>([]);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    loadPatients();
  }, []);

  const loadPatients = async () => {
    try {
      const res = await getPatients();
      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const search = async () => {
    try {
      if (keyword.trim() === "") {
        loadPatients();
        return;
      }

      const res = await searchPatients(keyword);

      setPatients(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const remove = async (id: number) => {
    if (!window.confirm("Delete this patient?")) return;

    try {
      await deletePatient(id);

      alert("Patient deleted successfully");

      loadPatients();
    } catch (err) {
      console.error(err);
      alert("Unable to delete patient");
    }
  };

  const viewPatient = (patient: any) => {
    alert(`
Patient Details

Name : ${patient.name}

Email : ${patient.email}

Mobile : ${patient.mobileNumber}

First Time Patient :
${patient.firstTimePatient ? "Yes" : "No"}
`);
  };

  const editPatient = async (patient: any) => {
    const name = prompt("Patient Name", patient.name);

    if (name == null) return;

    const email = prompt("Email", patient.email);

    if (email == null) return;

    const mobileNumber = prompt(
      "Mobile Number",
      patient.mobileNumber
    );

    if (mobileNumber == null) return;

    try {
      await updatePatient(patient.id, {
        ...patient,
        name,
        email,
        mobileNumber,
      });

      alert("Patient Updated Successfully");

      loadPatients();
    } catch (err) {
      console.error(err);

      alert("Update Failed");
    }
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

      <div style={{ marginBottom: "35px" }}>
        <h1
          style={{
            fontSize: "40px",
            color: "#1565C0",
            marginBottom: "5px",
          }}
        >
          👥 Patient Management
        </h1>

        <p
          style={{
            color: "#666",
            fontSize: "18px",
          }}
        >
          Manage all registered patients efficiently.
        </p>
      </div>

      {/* Search */}

      <div
        style={{
          display: "flex",
          gap: "15px",
          marginBottom: "35px",
        }}
      >
        <input
          type="text"
          placeholder="Search patient by name or email..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            flex: 1,
            padding: "15px",
            fontSize: "16px",
            borderRadius: "10px",
            border: "1px solid #ccc",
            outline: "none",
          }}
        />

        <button
          onClick={search}
          style={{
            background: "#1976D2",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔍 Search
        </button>

        <button
          onClick={loadPatients}
          style={{
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "15px 30px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🔄 Refresh
        </button>
      </div>

      {/* Cards */}

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(auto-fill,minmax(330px,1fr))",
          gap: "25px",
        }}
      >
        {patients.length === 0 ? (
          <div
            style={{
              background: "white",
              padding: "40px",
              borderRadius: "15px",
              textAlign: "center",
              gridColumn: "1/-1",
            }}
          >
            <h2>No Patients Found</h2>
          </div>
        ) : (
          patients.map((patient) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              onView={() => viewPatient(patient)}
              onEdit={() => editPatient(patient)}
              onDelete={() => remove(patient.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
type PatientCardProps = {
  patient: any;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
};

function PatientCard({
  patient,
  onView,
  onEdit,
  onDelete,
}: PatientCardProps) {
  return (
    <div
      style={{
        background: "white",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,.12)",
        transition: ".3s",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginBottom: "20px",
        }}
      >
        <div
          style={{
            width: "65px",
            height: "65px",
            borderRadius: "50%",
            background: "#1976D2",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          {patient.name?.charAt(0).toUpperCase()}
        </div>

        <div>
          <h2
            style={{
              margin: 0,
              color: "#1565C0",
            }}
          >
            {patient.name}
          </h2>

          <p
            style={{
              margin: "5px 0 0",
              color: "#666",
            }}
          >
            Registered Patient
          </p>
        </div>
      </div>

      <InfoRow label="Email" value={patient.email} />

      <InfoRow
        label="Mobile"
        value={patient.mobileNumber}
      />

      <InfoRow
        label="First Visit"
        value={
          patient.firstTimePatient
            ? "Yes"
            : "No"
        }
      />

      <div
        style={{
          marginTop: "15px",
          display: "inline-block",
          padding: "8px 15px",
          borderRadius: "20px",
          background: "#E8F5E9",
          color: "#2E7D32",
          fontWeight: "bold",
        }}
      >
        🟢 Active
      </div>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginTop: "25px",
        }}
      >
        <button
          onClick={onView}
          style={{
            flex: 1,
            background: "#2196F3",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          👁 View
        </button>

        <button
          onClick={onEdit}
          style={{
            flex: 1,
            background: "#4CAF50",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ✏ Edit
        </button>

        <button
          onClick={onDelete}
          style={{
            flex: 1,
            background: "#F44336",
            color: "white",
            border: "none",
            padding: "12px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          🗑 Delete
        </button>
      </div>
    </div>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: any;
}) {
  return (
    <div
      style={{
        marginBottom: "12px",
      }}
    >
      <b>{label}</b>

      <br />

      <span
        style={{
          color: "#555",
        }}
      >
        {value}
      </span>
    </div>
  );
}

export default PatientManagement;