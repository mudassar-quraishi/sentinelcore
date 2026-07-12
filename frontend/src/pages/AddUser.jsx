import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import api from "../services/api";

function AddUser() {

    const navigate = useNavigate();

    const [roles, setRoles] = useState([]);

    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        role: {
            id: ""
        }
    });

    useEffect(() => {
        fetchRoles();
    }, []);

    const fetchRoles = async () => {

        try {

            const response = await api.get("/roles");

            setRoles(response.data);

        } catch (error) {

            console.error("Failed to load roles:", error);

            if (error.response) {
                console.log("Status:", error.response.status);
                console.log("Data:", error.response.data);
            }

            alert("Failed to load roles");

        }

    };

    const handleChange = (e) => {

        const { name, value } = e.target;

        if (name === "role") {

            setUser({
                ...user,
                role: {
                    id: Number(value)
                }
            });

        } else {

            setUser({
                ...user,
                [name]: value
            });

        }

    };

    const saveUser = async () => {

        try {

            console.log("Sending User:", user);

            const response = await api.post("/users", user);

            console.log("Response:", response.data);

            alert("User Added Successfully");

            navigate("/users");

        } catch (error) {

            console.error("FULL ERROR:", error);

            if (error.response) {

                console.log("Status:", error.response.status);
                console.log("Response:", error.response.data);

                alert(
                    "Backend Error\n\nStatus : "
                    + error.response.status
                    + "\n\n"
                    + JSON.stringify(error.response.data)
                );

            } else if (error.request) {

                console.log(error.request);

                alert("No response received from backend.");

            } else {

                console.log(error.message);

                alert(error.message);

            }

        }

    };

    return (

        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

                    <h1 className="text-3xl font-bold mb-6">
                        Add User
                    </h1>

                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={user.name}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={user.email}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={user.password}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-4"
                    />

                    <select
                        name="role"
                        value={user.role.id}
                        onChange={handleChange}
                        className="w-full border p-3 rounded mb-6"
                    >

                        <option value="">
                            Select Role
                        </option>

                        {roles.map((role) => (

                            <option
                                key={role.id}
                                value={role.id}
                            >
                                {role.name}
                            </option>

                        ))}

                    </select>

                    <button
                        onClick={saveUser}
                        className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg"
                    >
                        Save User
                    </button>

                </div>

            </main>

        </>

    );

}

export default AddUser;