import React, { useState, Fragment, useEffect } from 'react';
import axios from 'axios';
import Header from "./AdminHeader";
import { baseUrl } from "../constant";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export default function AdminOrders() {
    const [data, setData] = useState([]);
    const [itemData, setItemData] = useState([]);
    const [orderNo, setOrderNo] = useState("");
    const [orderStatus, setOrderStatus] = useState("");
    const [show, setShow] = useState(false);
    const [showOrderStatus, setShowOrderStatus] = useState(false);

    const handleClose = () => setShow(false);
    const handleCloseOrderStatus = () => setShowOrderStatus(false);

    useEffect(() => {
        getData("Admin", 0);  // Remplacement de getDefaultNormalizer
    }, []);

    const getData = (type, id) => {
        const data = {
            ID: id,
            type: type,
            Email: localStorage.getItem("username")
        };
        const url = `${baseUrl}/api/Medicines/orderList`;
        axios
            .post(url, data)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    type === "Admin" ? setData(data.listOrders) : setItemData(data.listOrders);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleItemDetail = (id) => {
        getData("UserItems", id);
        setShow(true);
    };

    const handleOrderStatusDetail = (orderNumber) => {
        setOrderNo(orderNumber);
        setShowOrderStatus(true);
    };

    const handleOrdersStatus = (e) => {
        e.preventDefault();
        const url = `${baseUrl}/api/Admin/updateOrderStatus`;
        const data = {
            OrderNo: orderNo,
            OrderStatus: orderStatus
        };
        axios
            .post(url, data)
            .then((result) => {
                setShowOrderStatus(false);  // Correction ici
                getData("Admin", 0);
                setOrderStatus("");
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
                <h3>All Orders</h3>
            </div>
            {data && data.length > 0 ? (
                <table className='table stripped table-hover mt-4'
                    style={{ backgroundColor: "white", width: "80%", margin: "0 auto" }}>
                    <thead className='thead-dark'>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Customer Name</th>
                            <th scope="col">Order Number</th>
                            <th scope="col">Total</th>
                            <th scope="col">Status</th>
                            <th scope="col">Order Date</th>
                            <th scope="col">Update Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((val, index) => (
                            <tr key={index}>
                                <th scope='row'>{index + 1}</th>
                                <td>{val.customerName}</td>
                                <td onClick={() => handleItemDetail(val.id)} style={{ cursor: 'pointer', color: 'blue' }}>
                                    {val.orderNo}
                                </td>
                                <td>{val.orderTotal}</td>
                                <td>{val.orderStatus}</td>
                                <td>{new Date(val.createdOn).toLocaleDateString()}</td>
                                <td>
                                    <Button variant='secondary' onClick={() => handleOrderStatusDetail(val.orderNo)}>
                                        Update
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No data found</p>
            )}
            <div style={{ width: "100%" }}>
                {/* Modal for Order Details */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Order Details for: {itemData && itemData.length > 0 ? itemData[0].orderNo : ""}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {itemData && itemData.length > 0 ? (
                            <table className='table stripped table-hover mt-4'>
                                <thead className='thead-dark'>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Medicine Name</th>
                                        <th scope="col">Manufacturer</th>
                                        <th scope="col">Unit Price</th>
                                        <th scope="col">Quantity</th>
                                        <th scope="col">Total Price</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {itemData.map((item, index) => (
                                        <tr key={index}>
                                            <th scope="row">{index + 1}</th>
                                            <td>{item.medicineName}</td>
                                            <td>{item.manufacturer}</td>
                                            <td>{item.unitPrice}</td>
                                            <td>{item.quantity}</td>
                                            <td>{item.totalPrice}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No item data found</p>
                        )}
                    </Modal.Body>
                </Modal>

                {/* Modal for Updating Order Status */}
                <Modal show={showOrderStatus} onHide={handleCloseOrderStatus}>
                    <Modal.Header closeButton>
                        <Modal.Title>Update Order Status</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleOrdersStatus}>
                            <div className="form-group">
                                <label>Order Number: {orderNo}</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Enter order status"
                                    value={orderStatus}
                                    onChange={(e) => setOrderStatus(e.target.value)}
                                />
                            </div>
                            <Button variant="primary" type="submit">
                                Update Status
                            </Button>
                        </form>
                    </Modal.Body>
                </Modal>
            </div>
        </Fragment>
    );
}
