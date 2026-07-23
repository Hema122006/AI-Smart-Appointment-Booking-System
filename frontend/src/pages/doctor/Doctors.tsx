import { useEffect, useState } from "react";
import { getDoctors } from "../../services/doctorService";
import type { Doctor } from "../../services/doctorService"

function Doctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);

  useEffect(() => {
    getDoctors().then((res) => {
      setDoctors(res.data);
    });
  }, []);

  return (
    <div style={{ padding: "30px" }}>
      <h2>Doctors</h2>

      <table border={1} cellPadding={10}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Available</th>
          </tr>
        </thead>

        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td>{doctor.name}</td>
              <td>{doctor.specialization}</td>
              <td>{doctor.available ? "Available" : "Not Available"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Doctors;