import "../styles/RecentAlerts.css";

function RecentAlerts() {

    const alerts = [
        {
            severity: "Critical",
            threat: "SQL Injection",
            status: "Open",
            time: "10:15 AM"
        },
        {
            severity: "High",
            threat: "Malware Detected",
            status: "Open",
            time: "09:40 AM"
        },
        {
            severity: "Medium",
            threat: "Port Scan",
            status: "Resolved",
            time: "08:20 AM"
        },
        {
            severity: "Low",
            threat: "Suspicious Login",
            status: "Open",
            time: "07:55 AM"
        }
    ];

    return (
        <div className="alerts-container">

            <h2>Recent Alerts</h2>

            <table>

                <thead>

                    <tr>
                        <th>Severity</th>
                        <th>Threat</th>
                        <th>Status</th>
                        <th>Time</th>
                    </tr>

                </thead>

                <tbody>

                    {alerts.map((alert, index) => (

                        <tr key={index}>
                            <td>{alert.severity}</td>
                            <td>{alert.threat}</td>
                            <td>{alert.status}</td>
                            <td>{alert.time}</td>
                        </tr>

                    ))}

                </tbody>

            </table>

        </div>
    );
}

export default RecentAlerts;