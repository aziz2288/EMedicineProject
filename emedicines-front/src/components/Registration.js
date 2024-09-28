import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { baseUrl } from "../components/constant";

export default function Registration() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSave = (e) => {
        e.preventDefault();
        let error = '';
        if (firstName === '') error += 'First Name, ';
        if (lastName === '') error += 'Last Name, ';
        if (email === '') error += 'Email, ';
        if (password === '') error += 'Password, ';

        if (error.length > 0) {
            error = error.substring(0, error.length - 2) + ' cannot be blank.';
            alert(error);
            return;
        }

        const url = `${baseUrl}/api/Users/registration`;
        const data = {
            firstName,
            lastName,
            Email: email,
            Password: password,
        };

        axios.post(url, data)
            .then((result) => {
                clear();
                const dt = result.data;
                alert(dt.statusMessage);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const clear = () => {
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
    };

    return (
        <section className="vh-100 gradient-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                        <div className="card bg-dark text-white" style={{ borderRadius: '1rem' }}>
                            <div className="card-body p-5 text-center">
                                <div className="mb-md-5 mt-md-4 pb-5">
                                    <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                                    <p className="text-white-50 mb-5">Please enter your details to create an account!</p>

                                    <form onSubmit={handleSave}>
                                        {/* First Name */}
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="text"
                                                id="firstName"
                                                className="form-control form-control-lg"
                                                value={firstName}
                                                onChange={(e) => setFirstName(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="firstName">First Name</label>
                                        </div>

                                        {/* Last Name */}
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="text"
                                                id="lastName"
                                                className="form-control form-control-lg"
                                                value={lastName}
                                                onChange={(e) => setLastName(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="lastName">Last Name</label>
                                        </div>

                                        {/* Email */}
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="email"
                                                id="email"
                                                className="form-control form-control-lg"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="email">Email</label>
                                        </div>

                                        {/* Password */}
                                        <div className="form-outline form-white mb-4">
                                            <input
                                                type="password"
                                                id="password"
                                                className="form-control form-control-lg"
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                required
                                            />
                                            <label className="form-label" htmlFor="password">Password</label>
                                        </div>

                                        <button className="btn btn-outline-light btn-lg px-5" type="submit">
                                            Register
                                        </button>
                                    </form>

                                    <div className="d-flex justify-content-center text-center mt-4 pt-1">
                                        <a href="#!" className="text-white"><i className="fab fa-facebook-f fa-lg"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-twitter fa-lg mx-4 px-2"></i></a>
                                        <a href="#!" className="text-white"><i className="fab fa-google fa-lg"></i></a>
                                    </div>
                                </div>

                                <div>
                                    <p className="mb-0">Already have an account? <Link to="/" className="text-white-50 fw-bold">Login here</Link></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
