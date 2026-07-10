import { useState } from "react";
import api from "../services/api";

function AddThreat() {

    const [title, setTitle] = useState("");
    const [severity, setSeverity] = useState("");
    const [source, setSource] = useState("");
    const [status, setStatus] = useState("");

    const saveThreat = async () => {

        try {

            await api.post("/threats", {
                title,
                severity,
                source,
                status
            });

            alert("Threat Added Successfully");

            setTitle("");
            setSeverity("");
            setSource("");
            setStatus("");

        } catch (error) {

            console.log(error);

            alert("Failed to Add Threat");

        }

    };

    return (

        <div className="ml-64 mt-16 p-8">

            <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl">

                <h1 className="text-3xl font-bold mb-6">
                    Add New Threat
                </h1>

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Threat Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <select
                    className="w-full border p-3 rounded mb-4"
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                >
                    <option value="">Select Severity</option>
                    <option>Critical</option>
                    <option>High</option>
                    <option>Medium</option>
                    <option>Low</option>
                </select>

                <input
                    className="w-full border p-3 rounded mb-4"
                    placeholder="Source"
                    value={source}
                    onChange={(e) => setSource(e.target.value)}
                />

                <select
                    className="w-full border p-3 rounded mb-6"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                    <option value="">Select Status</option>
                    <option>Open</option>
                    <option>Resolved</option>
                </select>

                <button
                    onClick={saveThreat}
                    className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                >
                    Add Threat
                </button>

            </div>

        </div>

    );

}

export default AddThreat;