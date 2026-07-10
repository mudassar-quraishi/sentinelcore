import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useState } from "react";
import "../styles/Login.css";

function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleLogin = async () => {

        if (email === "" || password === "") {
            alert("Please enter email and password");
            return;
        }

        try {

            const response = await api.post("/auth/login", {
                email,
                password,
            });

          if (response.data === "Login Successful") {
               localStorage.setItem("isLoggedIn", "true");

                navigate("/dashboard");

                  } else {

                alert(response.data);

          }

        } catch (error) {

            alert("Login Failed");
            console.log(error);

        }
    };

    return (
        <div className="login-container">

            <div className="login-card">

                <h1>SentinelCore</h1>

                <h3>Cyber Threat Intelligence</h3>

                <input
                    type="email"
                    placeholder="Email Address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button onClick={handleLogin}>
                    Login
                </button>

            </div>

        </div>
    );
}

export default Login;