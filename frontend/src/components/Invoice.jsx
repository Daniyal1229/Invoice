import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "../css/invoice.css"

const Invoice = () => {
    const { id } = useParams(); 
    const [invoice, setInvoice] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInvoice = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/invoice/${id}`);
                setInvoice(response.data);
            } catch (err) {
                setError(err.response ? err.response.data.message : err.message);
            }
        };

        fetchInvoice();
    }, [id]);

    if (error) {
        return <div className="error">{error}</div>;
    }

    if (!invoice) {
        return <div className="loading">Loading...</div>;
    }

    return (
        <div className="invoice-container">
            <h1>Invoice</h1>
            <table className="invoice-table">
                <thead>
                    <tr>
                    <th>Name of Item</th>
                        <th>Type</th>
                        <th>Quantity</th>
                        <th>Reference No</th>
                        <th>Invoice No</th>
                        <th>Invoice Date</th>
                        <th>Amount</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{invoice.nameOfItem}</td>
                        <td>{invoice.type}</td>
                        <td>{invoice.quantity}</td>
                        <td>{invoice.referenceNo}</td>
                        <td>{invoice.invoiceNo}</td>
                        <td>{new Date(invoice.invoiceDate).toLocaleDateString()}</td>
                        <td>{invoice.amount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default Invoice;
