function DashboardHeader() {

    return (

        <div
            style={{
                background: "#1565C0",
                color: "white",
                padding: "20px 35px",
                borderRadius: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "30px",
                boxShadow: "0 5px 15px rgba(0,0,0,0.15)"
            }}
        >

            <div>

                <h1 style={{ margin: 0 }}>
                    🏥 Smart Appointment System
                </h1>

                <p style={{ marginTop: "8px" }}>
                    Welcome Admin 👋
                </p>

            </div>

            <div style={{ fontSize: "28px" }}>

                🔔&nbsp;&nbsp;👤

            </div>

        </div>

    );

}

export default DashboardHeader;