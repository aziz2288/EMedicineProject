import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";
import { baseUrl } from "../constant";

export default function Profile() {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const data = {
            Email: localStorage.getItem("username"),
        };
        const url = `${baseUrl}/api/Users/viewUser`;
        axios
            .post(url, data)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    setFirstName(data.user.firstName);
                    setLastName(data.user.lastName);
                    setEmail(data.user.email);
                    setPassword(data.user.password);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        const data = {
            FirstName: firstName,
            LastName: lastName,
            Email: email,
            Password: password,
            actionType: "Update"
        };
        const res = await axios.post(`${baseUrl}/api/Users/updateProfile`, data);
        if (res.data.statusCode === 200) {
            getData();
            Clear();
            alert("Profile updated successfully");
        } else {
            alert(res.data.statusMessage);
        }
    };

    const Clear = () => {
        setFirstName("");
        setLastName("");
        setPassword("");
    };

    return (
        <Fragment>
            <Header />
            <br />
            <form>
                <div className="form-row" style={{ width: "80%", backgroundColor: "white", margin: "0 auto", padding: "20px", borderRadius: "8px" }}>
                    <div className="form-group col-md-12">
                        <h3>My Profile</h3>
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="text"
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="First Name"
                            className="form-control"
                            required
                            value={firstName}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="text"
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last Name"
                            className="form-control"
                            required
                            value={lastName}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="text"
                            id="validationTextarea"
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email"
                            className="form-control"
                            required
                            value={email}
                            disabled
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <input
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className="form-control"
                            required
                            value={password}
                        />
                    </div>
                    <div className="form-group col-md-6">
                        <button
                            className="btn btn-primary"
                            style={{ width: "150px", float: "left" }}
                            onClick={(e) => uploadFile(e)}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="btn btn-secondary"
                            style={{ width: "150px", marginLeft: "10px" }}
                            onClick={Clear}
                        >
                            Clear
                        </button>
                    </div>
                </div>
            </form>
        </Fragment>
    );
}