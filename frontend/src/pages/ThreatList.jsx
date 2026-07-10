import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function ThreatList() {

    const navigate = useNavigate();

    const [threats, setThreats] = useState([]);

    useEffect(() => {
        fetchThreats();
    }, []);

    const fetchThreats = async () => {
        try {
            const response = await api.get("/threats");
            setThreats(response.data);
        } catch (error) {
            console.log(error);
        }
    };

    const deleteThreat = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this threat?"
        );

        if (!confirmDelete) {
            return;
        }

        try {

            await api.delete(`/threats/${id}`);

            alert("Threat Deleted Successfully");

            fetchThreats();

        } catch (error) {

            console.log(error);

            alert("Failed to Delete Threat");

        }
    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <h1 className="text-3xl font-bold mb-6">
                    Threat List
                </h1>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-800 text-white">
                            <tr>
                                <th className="p-4">ID</th>
                                <th className="p-4">Title</th>
                                <th className="p-4">Severity</th>
                                <th className="p-4">Source</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>

                        <tbody>

                            {threats.length > 0 ? (

                                threats.map((threat) => (

                                    <tr
                                        key={threat.id}
                                        className="border-b hover:bg-gray-100 text-center"
                                    >
                                        <td className="p-4">{threat.id}</td>

                                        <td className="p-4">
                                            {threat.title}
                                        </td>

                                        <td className="p-4">
                                            {threat.severity}
                                        </td>

                                        <td className="p-4">
                                            {threat.source}
                                        </td>

                                        <td className="p-4">
                                            {threat.status}
                                        </td>

                                        <td className="p-4">

                                            <button
                                                onClick={() => navigate(`/edit-threat/${threat.id}`)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() => deleteThreat(threat.id)}
                                                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                ))

                            ) : (

                                <tr>

                                    <td
                                        colSpan="6"
                                        className="text-center p-6 text-gray-500"
                                    >
                                        No Threats Found
                                    </td>

                                </tr>

                            )}

                        </tbody>

                    </table>

                </div>

            </main>

        </>
    );
}

export default ThreatList;