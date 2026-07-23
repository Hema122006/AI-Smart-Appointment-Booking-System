function Notifications() {

  const notifications = [

    {
      title: "Appointment Confirmed",
      message: "Your appointment with Dr. Priya has been confirmed.",
      date: "Today",
      icon: "✅",
      color: "#E8F5E9",
    },

    {
      title: "Payment Successful",
      message: "Your consultation fee payment was received.",
      date: "Yesterday",
      icon: "💳",
      color: "#E3F2FD",
    },

    {
      title: "Health Tip",
      message: "Drink at least 2 litres of water today.",
      date: "Yesterday",
      icon: "💡",
      color: "#FFF8E1",
    },

    {
      title: "Appointment Reminder",
      message: "You have an appointment tomorrow at 10:00 AM.",
      date: "Tomorrow",
      icon: "🔔",
      color: "#F3E5F5",
    }

  ];

  return (

    <div
      style={{
        minHeight:"100vh",
        backgroundImage:
                           "linear-gradient(rgba(255,255,255,0.55), rgba(255,255,255,0.35)), url('/images/hospital-bg.png')",

                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundAttachment: "fixed",
                    overflowX: "auto",
        padding:"35px"
      }}
    >

      <h1 style={{color:"#1565C0"}}>
        🔔 Notifications
      </h1>

      <p style={{color:"#666",marginBottom:"30px"}}>
        Stay updated with your appointments.
      </p>

      {notifications.map((n,index)=>(

        <div
          key={index}
          style={{
            background:n.color,
            padding:"25px",
            marginBottom:"20px",
            borderRadius:"15px",
            boxShadow:"0 5px 12px rgba(0,0,0,.1)"
          }}
        >

          <h2>{n.icon} {n.title}</h2>

          <p>{n.message}</p>

          <small>{n.date}</small>

        </div>

      ))}

    </div>

  );

}

export default Notifications;