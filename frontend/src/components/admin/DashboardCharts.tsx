import {
    ResponsiveContainer,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
    Legend
} from "recharts";

function DashboardCharts({ stats }: any) {

    const appointmentData = [

        {
            name: "Pending",
            value: stats.pending || 0
        },

        {
            name: "Confirmed",
            value: stats.confirmed || 0
        },

        {
            name: "Completed",
            value: stats.completed || 0
        },

        {
            name: "Cancelled",
            value: stats.cancelled || 0
        }

    ];

    const revenueData = [

        {
            month: "Jan",
            revenue: 15000
        },

        {
            month: "Feb",
            revenue: 22000
        },

        {
            month: "Mar",
            revenue: 18000
        },

        {
            month: "Apr",
            revenue: 28000
        },

        {
            month: "May",
            revenue: 32000
        },

        {
            month: "Jun",
            revenue: stats.totalRevenue || 40000
        }

    ];

    const COLORS = [
        "#f39c12",
        "#3498db",
        "#2ecc71",
        "#e74c3c"
    ];

    return (

        <div
            style={{
                display: "grid",
                gridTemplateColumns: "2fr 1fr",
                gap: "20px",
                marginTop: "30px"
            }}
        >

            <div
                style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-8px)";
    e.currentTarget.style.boxShadow="0 15px 30px rgba(0,0,0,.18)";
}}

onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0px)";
    e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,.12)";
}}
            >

                <h2>Monthly Revenue</h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <BarChart data={revenueData}>

                        <CartesianGrid strokeDasharray="3 3"/>

                        <XAxis dataKey="month"/>

                        <YAxis/>

                        <Tooltip/>

                        <Legend/>

                        <Bar
                            dataKey="revenue"
                            fill="#2563EB"
                            radius={[10,10,0,0]}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

            <div
                style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    boxShadow: "0px 5px 15px rgba(0,0,0,0.1)"
                }}
                onMouseEnter={(e)=>{
    e.currentTarget.style.transform="translateY(-8px)";
    e.currentTarget.style.boxShadow="0 15px 30px rgba(0,0,0,.18)";
}}

onMouseLeave={(e)=>{
    e.currentTarget.style.transform="translateY(0px)";
    e.currentTarget.style.boxShadow="0 8px 20px rgba(0,0,0,.12)";
}}
            >

                <h2>Appointment Status</h2>

                <ResponsiveContainer
                    width="100%"
                    height={350}
                >

                    <PieChart>

                        <Pie

                            data={appointmentData}

                            dataKey="value"

                            nameKey="name"

                            outerRadius={120}

                            label

                        >

                            {

                                appointmentData.map((_,index)=>(

                                    <Cell
                                        key={index}
                                        fill={COLORS[index]}
                                    />

                                ))

                            }

                        </Pie>

                        <Tooltip/>

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>

    );

}

export default DashboardCharts;