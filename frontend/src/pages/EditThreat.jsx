import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function EditThreat() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [threat, setThreat] = useState({
        title: "",
        severity: "",
        source: "",
        status: "",
    });

    useEffect(() => {
        loadThreat();
    }, []);

    const loadThreat = async () => {

        const response = await api.get(`/threats/${id}`);

setThreat(response.data);
    };

    const updateThreat = async () => {

        try {

            await api.put(`/threats/${id}`, threat);

            alert("Threat Updated Successfully");

            navigate("/threat-list");

        } catch (error) {

            console.log(error);

            alert("Update Failed");

        }

    };

    return (
        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="bg-white p-8 rounded-xl shadow-lg max-w-xl">

                    <h1 className="text-3xl font-bold mb-6">
                        Edit Threat
                    </h1>

                    <input
                        className="w-full border p-3 rounded mb-4"
                        value={threat.title}
                        onChange={(e) =>
                            setThreat({
                                ...threat,
                                title: e.target.value,
                            })
                        }
                    />

                    <input
                        className="w-full border p-3 rounded mb-4"
                        value={threat.severity}
                        onChange={(e) =>
                            setThreat({
                                ...threat,
                                severity: e.target.value,
                            })
                        }
                    />

                    <input
                        className="w-full border p-3 rounded mb-4"
                        value={threat.source}
                        onChange={(e) =>
                            setThreat({
                                ...threat,
                                source: e.target.value,
                            })
                        }
                    />

                    <input
                        className="w-full border p-3 rounded mb-6"
                        value={threat.status}
                        onChange={(e) =>
                            setThreat({
                                ...threat,
                                status: e.target.value,
                            })
                        }
                    />

                    <button
                        onClick={updateThreat}
                        className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700"
                    >
                        Update Threat
                    </button>

                </div>

            </main>
        </>
    );
}

export default EditThreat;