import { useEffect, useState } from "react";
import { getDoctors } from "../../services/doctorService";
import { bookAppointment } from "../../services/appointmentService";
import type { Doctor } from "../../services/doctorService";;

function Appointment() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  const [form, setForm] = useState({
    patientId: Number(localStorage.getItem("userId")),
    doctorId: 0,
    appointmentDate: "",
    appointmentTime: "",
    emergency: false,
    firstTimePatient: true,
  });

  useEffect(() => {
    getDoctors().then((res: any) => {
      setDoctors(res.data);
    });
  }, []);

  const submit = async () => {
    try {
      const res = await bookAppointment(form);
      alert("Appointment Booked Successfully");
      console.log(res.data);
    } catch (err) {
      alert("Booking Failed");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "30px" }}>
      <h2>Book Appointment</h2>

      <select
        onChange={(e) =>
          setForm({ ...form, doctorId: Number(e.target.value) })
        }
      >
        <option>Select Doctor</option>

        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            {doctor.name} - {doctor.specialization}
          </option>
        ))}
      </select>

      <br />
      <br />

      <input
        type="date"
        onChange={(e) =>
          setForm({ ...form, appointmentDate: e.target.value })
        }
      />

      <br />
      <br />

      <input
        type="time"
        onChange={(e) =>
          setForm({ ...form, appointmentTime: e.target.value })
        }
      />

      <br />
      <br />

      <label>
        Emergency
        <input
          type="checkbox"
          checked={form.emergency}
          onChange={(e) =>
            setForm({ ...form, emergency: e.target.checked })
          }
        />
      </label>

      <br />
      <br />

      <label>
        First Time Patient
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
      </label>

      <br />
      <br />

      <button onClick={submit}>
        Book Appointment
      </button>
    </div>
  );
}

export default Appointment;