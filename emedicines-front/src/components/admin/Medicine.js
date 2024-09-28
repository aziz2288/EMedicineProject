import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import AdminHeader from "./AdminHeader";
import { baseUrl } from "../constant";

export default function Medicine() {
    const [data, setData] = useState([]);
    const [medicineId, setMedicineId] = useState("");
    const [name, setName] = useState("");
    const [manufacturer, setManufacturer] = useState("");
    const [unitPrice, setUnitPrice] = useState("");
    const [discount, setDiscount] = useState("");
    const [quantity, setQuantity] = useState("");
    const [expdate, setExpdate] = useState("");
    const [file, setFile] = useState("");
    const [fileName, setFileName] = useState("");
    const [addUpdateFlag, setAddUpdateFlag] = useState(true);

    useEffect(() => {
        getData();
    }, []);

    const getData = () => {
        const data = {
            type: "Get",
            Email: localStorage.getItem("loggedEmail"),
        };
        const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
        axios
            .get(url, { params: data })
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    setData(data.listMedicines);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const deleteMedicine = (e, id) => {
        e.preventDefault();
        const data = {
            Id: id,
            Type: "Delete",
        };
        const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
        axios
            .post(url, data)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    alert(data.statusMessage);
                    getData(); 
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const editMedicine = (e, id) => {
        e.preventDefault();
        setAddUpdateFlag(false);
        const data = {
            ID: id,
            Type: "GetByID",
        };
        const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
        axios
            .post(url, data)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    setMedicineId(id);
                    setName(data.listMedicines[0]["name"]);
                    setManufacturer(data.listMedicines[0]["manufacturer"]);
                    setUnitPrice(data.listMedicines[0]["unitPrice"]);
                    setDiscount(data.listMedicines[0]["discount"]);
                    setQuantity(data.listMedicines[0]["quantity"]);
                    setExpdate(data.listMedicines[0]["expdate"]);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const SaveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
    };

    const uploadFile = async (e) => {
        e.preventDefault();
        const formdata = new FormData();
        formdata.append("FormFile", file);
        formdata.append("FileName", fileName);
        try {
            const res = await axios.post(`${baseUrl}/api/Admin/UploadFile`, formdata);
            console.log(res);
            if (res.data.statusCode === 200 && res.data.statusMessage === "File uploaded") {
                const data = {
                    Name: name,
                    manufacturer: manufacturer,
                    unitPrice: unitPrice,
                    Discount: discount,
                    Quantity: quantity,
                    Expdate: expdate,
                    Status: 1,
                    ImageUrl: fileName,
                    Type: "Add",
                };
                const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
                axios
                    .post(url, data)
                    .then((result) => {
                        const data = result.data;
                        if (data.statusCode === 200) {
                            getData();
                            Clear();
                        }
                    })
                    .catch((error) => {
                        console.log("error");
                    });
            }
        } catch (ex) {
            console.log(ex);
        }
    };

    const Clear = () => {
        setName("");
        setManufacturer("");
        setUnitPrice("");
        setDiscount("");
        setExpdate("");
        setFile("");
        setFileName("");
        setQuantity("");
    };

    const updateMedicine = (e) => {
        e.preventDefault();
        const data = {
            Id: medicineId,
            Name: name,
            manufacturer: manufacturer,
            unitPrice: unitPrice,
            Discount: discount,
            Quantity: quantity,
            Expdate: expdate,
            Status: 1,
            Type: "Update",
        };
        const url = `${baseUrl}/api/Admin/addUpdateMedicine`;
        axios
            .post(url, data)
            .then((result) => {
                const data = result.data;
                if (data.statusCode === 200) {
                    getData();
                    Clear();
                    setAddUpdateFlag(true);
                }
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <Fragment>
            <AdminHeader />
            <div className="container mt-4">
                <h3>Medicine Management</h3>
                <form onSubmit={addUpdateFlag ? uploadFile : updateMedicine}>
                    <div className="form-group">
                        <label>Name</label>
                        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Manufacturer</label>
                        <input type="text" className="form-control" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Unit Price</label>
                        <input type="number" className="form-control" value={unitPrice} onChange={(e) => setUnitPrice(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Discount</label>
                        <input type="number" className="form-control" value={discount} onChange={(e) => setDiscount(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Quantity</label>
                        <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Expiry Date</label>
                        <input type="date" className="form-control" value={expdate} onChange={(e) => setExpdate(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Upload Image</label>
                        <input type="file" className="form-control" onChange={SaveFile} />
                    </div>
                    <button type="submit" className="btn btn-primary">{addUpdateFlag ? "Add Medicine" : "Update Medicine"}</button>
                </form>
                <table className="table table-striped mt-4">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Manufacturer</th>
                            <th>Unit Price</th>
                            <th>Discount</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data && data.map((med, index) => (
                            <tr key={med.id}>
                                <td>{index + 1}</td>
                                <td>{med.name}</td>
                                <td>{med.manufacturer}</td>
                                <td>{med.unitPrice}</td>
                                <td>{med.discount}</td>
                                <td>{med.quantity}</td>
                                <td>{new Date(med.expdate).toLocaleDateString()}</td>
                                <td>
                                    <button className="btn btn-primary mx-2" onClick={(e) => editMedicine(e, med.id)}>Edit</button>
                                    <button className="btn btn-danger" onClick={(e) => deleteMedicine(e, med.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Fragment>
    );
}
