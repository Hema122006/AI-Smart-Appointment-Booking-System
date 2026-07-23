import { useState } from "react";

function NotificationPanel() {

    const [notifications] = useState([
        {
            id: 1,
            message: "Appointment #102 confirmed",
            color: "#4CAF50"
        },
        {
            id: 2,
            message: "New patient registered",
            color: "#2196F3"
        },
        {
            id: 3,
            message: "Doctor Kumar updated availability",
            color: "#FF9800"
        },
        {
            id: 4,
            message: "Appointment cancelled",
            color: "#F44336"
        }
    ]);

    return (

        <div
            style={{
                marginTop: 30,
                background: "white",
                borderRadius: 15,
                padding: 25,
                boxShadow: "0 5px 15px rgba(0,0,0,.15)"
            }}
        >

            <h2>🔔 Notifications</h2>

            {notifications.map(n => (

                <div
                    key={n.id}
                    style={{
                        borderLeft: `6px solid ${n.color}`,
                        padding: 15,
                        marginTop: 12,
                        background: "#f8f9fa",
                        borderRadius: 8
                    }}
                >

                    {n.message}

                </div>

            ))}

        </div>

    );

}

export default NotificationPanel;