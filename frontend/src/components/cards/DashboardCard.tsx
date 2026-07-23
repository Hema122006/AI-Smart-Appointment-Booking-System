type Props = {
  title: string;
  value: number | string;
  icon: string;
  color: string;
};

const DashboardCard = ({ title, value, icon, color }: Props) => {
  return (
    <div
      style={{
        background: color,
        color: "white",
        borderRadius: "16px",
        padding: "25px",
        boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
        transition: "all 0.3s ease",
        cursor:"pointer",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div>
          <h3>{title}</h3>

          <h1
            style={{
              marginTop: "15px",
              fontSize: "40px",
            }}
          >
            {value}
          </h1>
        </div>

        <div
          style={{
            fontSize: "55px",
          }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
};

export default DashboardCard;