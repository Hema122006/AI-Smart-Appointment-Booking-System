import {
  FaUserMd,
  FaUsers,
  FaCalendarCheck,
  FaMoneyBillWave,
} from "react-icons/fa";

function DashboardCards({ data }: any) {

  const cards = [

    {
      title: "Doctors",
      value: data.Doctors || 0,
      color: "#3B82F6",
      icon: <FaUserMd />
    },

    {
      title: "Patients",
      value: data.patients || 0,
      color: "#10B981",
      icon: <FaUsers />
    },

    {
      title: "Appointments",
      value: data.doctors || 0,
      color: "#F59E0B",
      icon: <FaCalendarCheck />
    },

    {
      title: "Revenue",
      value: "₹ " + (data.Revenue || 0),
      color: "#EF4444",
      icon: <FaMoneyBillWave />
    }

    

  ];


  return (

    <div className="cards">

      {cards.map((card) => (

        <div
          className="card"
          key={card.title}
        >

          <div>

            <h4>{card.title}</h4>

            <h2>{card.value}</h2>

          </div>

          <div
            className="card-icon"
            style={{
              background: card.color
            }}
          >

            {card.icon}

          </div>

        </div>

      ))}

    </div>

  );
}

export default DashboardCards;