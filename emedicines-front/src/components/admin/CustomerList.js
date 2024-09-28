import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./AdminHeader";
import { baseUrl } from "../constant";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function CustomerList() {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [email, setEmail] = useState("");
    const [funds, setFunds] = useState(0);


    const handleClose = () => setShow(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const url = `${baseUrl}/api/Admin/userList`;
        axios
            .get(url)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    setData(data.listUsers);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleItemDetail = (email) => {
        setEmail(email);
        setShow(true);
    };

    const handleManageFunds = (e) => {
        e.preventDefault();
        const url = `${baseUrl}/api/Admin/updateFund`;
        const data = {
            Email: email,
            Fund: funds
        };
        axios
            .post(url, data)
            .then((result) => {
                setShow(false);
                getData();
                setFunds(0);
                const dt = result.data;
                alert(dt.statusMessage);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Fragment>
            <Header />
            <br />
            <div className='form-group col-md-12'>
                <h3>Customer List</h3>
            </div>
            {data && data.length > 0 ? (
                <table className='table stripped table-hover mt-4'
                    style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope='col'>#</th>
                            <th scope='col'>First Name</th>
                            <th scope='col'>Last Name</th>
                            <th scope='col'>Email</th>
                            <th scope='col'>Password</th>
                            <th scope='col'>Funds</th>
                            <th scope='col'>Status</th>
                            <th scope='col'>Registration Date</th>
                            <th scope='col'>Manage Funds</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{val.firstName}</td>
                                <td>{val.lastName}</td>
                                <td>{val.email}</td>
                                <td>{val.password}</td>
                                <td>{val.fund}</td>
                                <td>{val.status}</td>
                                <td>{new Date(val.registrationDate).toLocaleDateString()}</td> {/* Affichage formaté de la date */}
                                <td>
                                    <Button
                                        variant='secondary'
                                        onClick={() => handleItemDetail(val.email)} // Correction pour passer l'email
                                    >
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                "No data found"
            )}

            {/* Modal pour gérer les fonds */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Manage Funds for: {email}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleManageFunds}>
                        <div className='form-group'>
                            <label>Email: {email}</label>
                        </div>
                        <div className='form-group'>
                            <label>Funds</label>
                            <input
                                type='number'
                                className='form-control'
                                placeholder='Enter funds amount'
                                value={funds}
                                onChange={(e) => setFunds(e.target.value)}
                            />
                        </div>
                        <Button variant='primary' type='submit'>
                            Update Funds
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </Fragment>
    );
}
