import { useState } from "react";
import { addDoctor } from "../../services/adminDoctorService";

interface Props {
  onClose: () => void;
  onSuccess: () => void;
}

function DoctorForm({ onClose, onSuccess }: Props) {

  const [doctor, setDoctor] = useState({
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

  const saveDoctor = async () => {

    try {

      await addDoctor(doctor);

      alert("Doctor Added Successfully");

      onSuccess();

      onClose();

    } catch (err) {

      console.error(err);

      alert("Unable to Add Doctor");

    }

  };

  return (

    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0,0,0,0.5)",

        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >

      <div
        style={{
          background: "white",
          padding: "30px",
          width: "500px",
          borderRadius: "10px"
        }}
      >

        <h2>Add Doctor</h2>

        <input
          placeholder="Doctor Name"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              name: e.target.value,
            })
          }
        />

        <input
          placeholder="Email"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              email: e.target.value,
            })
          }
        />

        <input
          placeholder="Mobile Number"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              mobileNumber: e.target.value,
            })
          }
        />

        <input
          placeholder="Qualification"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              qualification: e.target.value,
            })
          }
        />

        <input
          placeholder="Specialization"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              specialization: e.target.value,
            })
          }
        />

        <input
          type="number"
          placeholder="Experience"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              experience: Number(e.target.value),
            })
          }
        />

        <input
          type="number"
          placeholder="Consultation Fee"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              consultationFee: Number(e.target.value),
            })
          }
        />

        <input
          placeholder="Available Days"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              availableDays: e.target.value,
            })
          }
        />

        <input
          placeholder="Available Time"
          style={input}
          onChange={(e) =>
            setDoctor({
              ...doctor,
              availableTime: e.target.value,
            })
          }
        />

        <label>

          <input
            type="checkbox"
            checked={doctor.available}
            onChange={(e) =>
              setDoctor({
                ...doctor,
                available: e.target.checked,
              })
            }
          />

          Available

        </label>

        <br /><br />

        <button
          onClick={saveDoctor}
          style={saveBtn}
        >
          Save Doctor
        </button>

        <button
          onClick={onClose}
          style={cancelBtn}
        >
          Cancel
        </button>

      </div>

    </div>

  );

}

const input = {

  width: "100%",
  padding: "10px",
  marginBottom: "10px"

};

const saveBtn = {

  background: "#4CAF50",
  color: "white",
  border: "none",
  padding: "10px 20px",
  marginRight: "10px",
  cursor: "pointer"

};

const cancelBtn = {

  background: "#F44336",
  color: "white",
  border: "none",
  padding: "10px 20px",
  cursor: "pointer"

};

export default DoctorForm;