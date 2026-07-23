import { useState } from "react";

function SymptomChecker() {

  const [symptom, setSymptom] = useState("");
  const [result, setResult] = useState("");
  const [doctor, setDoctor] = useState("");
  <p>Recommended Doctor: {doctor}</p>
  
  const checkSymptoms = () => {

    const s = symptom.toLowerCase();

    if (s.includes("fever") || s.includes("cold")) {

        setDoctor("General Physician");

        setResult(
            "🤒 Possible Viral Fever\n\nRecommended Doctor : General Physician"
        );

    }

    else if (s.includes("skin") || s.includes("rash")) {

        setDoctor("Dermatologist");

        setResult(
            "🩺 Possible Skin Allergy\n\nRecommended Doctor : Dermatologist"
        );

    }

    else if (s.includes("heart") || s.includes("chest")) {

        setDoctor("Cardiologist");

        setResult(
            "❤️ Possible Heart Problem\n\nRecommended Doctor : Cardiologist"
        );

    }

    else if (s.includes("bone") || s.includes("joint")) {

        setDoctor("Orthopedic");

        setResult(
            "🦴 Possible Bone Problem\n\nRecommended Doctor : Orthopedic"
        );

    }

    else {

        setDoctor("General Physician");

        setResult(
            "Please consult a General Physician."
        );

    }

};

  return (

    <div
      style={{
        marginTop: 30,
        padding: 25,
        background: "white",
        borderRadius: 12,
        boxShadow: "0 3px 12px rgba(0,0,0,.1)"
      }}
    >

      <h2>🤖 AI Symptom Checker</h2>

      <input
        type="text"
        placeholder="Enter your symptoms..."
        value={symptom}
        onChange={(e) => setSymptom(e.target.value)}
        style={{
          width: "100%",
          padding: 12,
          borderRadius: 8,
          border: "1px solid #ccc"
        }}
      />

      <br /><br />

      <button
        onClick={checkSymptoms}
        style={{
          padding: "10px 20px",
          background: "#1976D2",
          color: "white",
          border: "none",
          borderRadius: 8
        }}
      >
        Check Symptoms
      </button>

      {result && (

        <div
          style={{
            marginTop: 20,
            padding: 15,
            background: "#E8F5E9",
            borderRadius: 8
          }}
        >
          {result}
        </div>

      )}

    </div>

  );

}

export default SymptomChecker;