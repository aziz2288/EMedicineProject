import React, { Fragment, useState } from 'react';
import axios from 'axios';
import Header from "../components/users/Header";
import { baseUrl } from "../components/constant";

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e) => {
        e.preventDefault();
        const data = {
            Email: email,
            Password: password,
        };
        const url = `${baseUrl}/api/Users/login`;
        axios
            .post(url, data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    localStorage.setItem("username", email);
                    
                    if (email === "admin" && password === "admin") {
                        window.location.href = "/admindashboard";
                    } else {
                        window.location.href = "/dashboard";
                    }
                } else {
                    alert(dt.statusMessage || "Invalid login credentials");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("An error occurred during login");
            });
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                                    <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                    <form onSubmit={handleLogin}>
                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="typeEmailX"
                                                className="form-control form-control-lg"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="typeEmailX">Email</label>
                                        </div>

                                        <div data-mdb-input-init className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="typePasswordX"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="typePasswordX">Password</label>
                                        </div>

                                        <p className="small mb-5 pb-lg-2">
                                            <a className="text-white-50" href="#!">Forgot password?</a>
                                        </p>

                                        <button
                                            data-mdb-button-init
                                            data-mdb-ripple-init
                                            className="btn btn-outline-light btn-lg px-5"
                                            type="submit"
                                        >
                                            Login
                                        </button>
                                    </form>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-0">Don't have an account? 
                                        <a href="/registration" className="text-white-50 fw-bold">Sign Up</a>
                                    </p>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
