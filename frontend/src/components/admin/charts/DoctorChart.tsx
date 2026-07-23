import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

export default function DoctorChart() {
  const data = {
    labels: [
      "Cardiology",
      "Neurology",
      "Orthopedic",
      "Dermatology",
    ],
    datasets: [
      {
        data: [12, 9, 8, 6],
        backgroundColor: [
          "#1976D2",
          "#4CAF50",
          "#FF9800",
          "#E91E63",
        ],
        borderWidth: 2,
        borderColor: "#ffffff",
        hoverOffset: 10,
        cutout: "65%",
        radius: "80%", // 🔥 Chart size reduce
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,

    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          boxWidth: 18,
          boxHeight: 18,
          padding: 15,
          font: {
            size: 13,
            weight: "bold" as const,
          },
        },
      },

      tooltip: {
        enabled: true,
      },
    },
  };

  return (
    <div
      style={{
        height: "230px",          // 🔥 Small chart
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Doughnut
        data={data}
        options={options}
      />
    </div>
  );
}