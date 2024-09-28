import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import Header from "./Header";
import { baseUrl } from "../constant";

export default function Cart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const data = {
            Email: localStorage.getItem("username"),
        };
        const url = `${baseUrl}/api/Admin/cartList`;
        axios
            .post(url, data)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    setData(data.listCart);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();
        const data = {
            Email: localStorage.getItem("username"),
        };
        const url = `${baseUrl}/api/Admin/placeOrder`;
        axios
            .post(url, data)
            .then((result) => {
                const dt = result.data;
                if (dt.statusCode === 200) {
                    setData([]);
                    alert(dt.statusMessage);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleRemoveItem = (e, index) => {
        e.preventDefault();
        console.log(`Remove item at index: ${index}`);
    };

    return (
        <Fragment>
            <Header />
            <br />
            <div className="form-group col-md-12">
                <h3>Cart items</h3>
                {data && data.length ? (
                    <button className="btn btn-primary" onClick={handlePlaceOrder}>
                        Place Order
                    </button>
                ) : (
                    ""
                )}
            </div>
            <div
                style={{
                    backgroundColor: "white",
                    width: "80%",
                    margin: "0 auto",
                    borderRadius: "11px",
                }}
            >
                <div className="card-deck">
                    {data && data.length > 0 ? (
                        data.map((val, index) => {
                            return (
                                <div key={index} className="col-md-3" style={{ marginBottom: "21px" }}>
                                    <div className="card">
                                        <img
                                            className="card-img-top"
                                            src={`${baseUrl}/assets/images/${val.imageUrl}`}
                                            alt={`${val.medicineName} image`}
                                        />
                                        <div className="card-body">
                                            <h4 className="card-title">Name: {val.medicineName}</h4>
                                            <h4 className="card-title">Quantity: {val.quantity}</h4>
                                            <button
                                                className="btn btn-danger"
                                                onClick={(e) => handleRemoveItem(e, index)}
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        "No items to display, kindly add..."
                    )}
                </div>
            </div>
        </Fragment>
    );
}
