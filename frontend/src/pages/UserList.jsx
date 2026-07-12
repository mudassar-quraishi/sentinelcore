import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

function UserList() {

    const navigate = useNavigate();

    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {

        try {

            const response = await api.get("/users");

            setUsers(response.data);

        } catch (error) {

            console.error(error);

            alert("Failed to load users.");

        }

    };

    const deleteUser = async (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this user?"
        );

        if (!confirmDelete) return;

        try {

            await api.delete(`/users/${id}`);

            alert("User deleted successfully");

            fetchUsers();

        } catch (error) {

            console.error(error);

            alert("Failed to delete user.");

        }

    };

    return (

        <>
            <Navbar />
            <Sidebar />

            <main className="ml-64 mt-16 p-8 bg-slate-100 min-h-screen">

                <div className="flex justify-between items-center mb-6">

                    <h1 className="text-3xl font-bold text-slate-800">
                        User Management
                    </h1>

                    <button
                        onClick={() => navigate("/add-user")}
                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg shadow"
                    >
                        + Add User
                    </button>

                </div>

                <div className="bg-white rounded-xl shadow-lg overflow-hidden">

                    <table className="w-full">

                        <thead className="bg-slate-900 text-white">

                            <tr>

                                <th className="p-4">ID</th>

                                <th className="p-4">Name</th>

                                <th className="p-4">Email</th>

                                <th className="p-4">Role</th>

                                <th className="p-4">Status</th>

                                <th className="p-4">Actions</th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.length > 0 ? (

                                users.map((user) => (

                                    <tr
                                        key={user.id}
                                        className="border-b hover:bg-gray-50 text-center"
                                    >

                                        <td className="p-4">
                                            {user.id}
                                        </td>

                                        <td className="p-4">
                                            {user.name}
                                        </td>

                                        <td className="p-4">
                                            {user.email}
                                        </td>

                                        <td className="p-4">

                                            <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 font-semibold">

                                                {user.role?.name}

                                            </span>

                                        </td>

                                        <td className="p-4">

                                            {user.enabled ? (

                                                <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 font-semibold">

                                                    Active

                                                </span>

                                            ) : (

                                                <span className="px-3 py-1 rounded-full bg-red-100 text-red-700 font-semibold">

                                                    Disabled

                                                </span>

                                            )}

                                        </td>

                                        <td className="p-4">

                                            <button
                                                onClick={() =>
                                                    navigate(`/edit-user/${user.id}`)
                                                }
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded mr-2"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                onClick={() =>
                                                    deleteUser(user.id)
                                                }
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
                                        className="p-8 text-center text-gray-500"
                                    >

                                        No Users Found

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

export default UserList;