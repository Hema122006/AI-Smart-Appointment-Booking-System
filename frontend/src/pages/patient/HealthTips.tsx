import { useState } from "react";

const tips = [
  {
    title: "💧 Stay Hydrated",
    category: "Daily Care",
    description:
      "Drink at least 2-3 liters of water every day to keep your body hydrated.",
    color: "#E3F2FD",
  },
  {
    title: "🥗 Eat Healthy",
    category: "Nutrition",
    description:
      "Include fruits, vegetables, proteins and whole grains in your daily diet.",
    color: "#E8F5E9",
  },
  {
    title: "🏃 Exercise Daily",
    category: "Fitness",
    description:
      "Exercise for at least 30 minutes every day to stay fit and active.",
    color: "#FFF3E0",
  },
  {
    title: "😴 Sleep Well",
    category: "Lifestyle",
    description:
      "Get 7–8 hours of quality sleep every night for better health.",
    color: "#F3E5F5",
  },
  {
    title: "🧘 Reduce Stress",
    category: "Mental Health",
    description:
      "Practice meditation or yoga for 15 minutes every day.",
    color: "#E0F7FA",
  },
  {
    title: "🚭 Avoid Smoking",
    category: "Awareness",
    description:
      "Avoid smoking and alcohol to reduce the risk of chronic diseases.",
    color: "#FFEBEE",
  },
];

export default function HealthTips() {

  const [search, setSearch] = useState("");

  const filtered = tips.filter((tip) =>
    tip.title.toLowerCase().includes(search.toLowerCase()) ||
    tip.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundImage:
                           "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    overflowX: "auto",
        padding: "35px",
      }}
    >
      <h1 style={{ color: "#1565C0" }}>
        💡 Daily Health Tips
      </h1>

      <p style={{ color: "#666" }}>
        Small healthy habits make a big difference.
      </p>

      <input
        placeholder="Search health tips..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          width: "100%",
          padding: "14px",
          marginTop: "20px",
          marginBottom: "30px",
          borderRadius: "10px",
          border: "1px solid #ccc",
          fontSize: "16px",
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
          gap: "20px",
        }}
      >
        {filtered.map((tip, index) => (
          <div
            key={index}
            style={{
              background: tip.color,
              padding: "25px",
              borderRadius: "15px",
              boxShadow: "0 5px 15px rgba(0,0,0,.1)",
            }}
          >
            <h2>{tip.title}</h2>

            <span
              style={{
                background: "#1976D2",
                color: "white",
                padding: "4px 12px",
                borderRadius: "20px",
                fontSize: "13px",
              }}
            >
              {tip.category}
            </span>

            <p
              style={{
                marginTop: "15px",
                color: "#444",
                lineHeight: "28px",
              }}
            >
              {tip.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}