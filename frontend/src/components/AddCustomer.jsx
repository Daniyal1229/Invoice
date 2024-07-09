import React, { useState } from 'react';
import '../css/addCustomer.css';
import Nav2 from './Nav2.jsx';
import { useNavigate } from 'react-router-dom';

const AddCustomer = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        address: '',
        accountNumber: '',
        vehicleNo: '',
        bankName: '',
        bankDetails: '',
        nameOfItem: '',
        type: '',
        quantity: 0,
        discount: 0,
        gst: 0,
        amount: 0,
        invoiceDate: '',
        referenceNo: '',
        invoiceNo:'',
        narration: '',
        shippingAddress: '',
        billingAddress: '',
        gstInvoice: true,
        normalInvoice: false
    });

    // Function to handle input changes
    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        const inputValue = type === 'checkbox' ? checked : value;

        setFormData({
            ...formData,
            [name]: inputValue
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        try {
            const response = await fetch('http://localhost:5000/customer/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            
            if (response.ok) {
                const data = await response.json();
                const invoiceId = data._id;
                console.log('Customer added successfully!');
                setFormData({
                    name: '',
                    phone: '',
                    address: '',
                    accountNumber: '',
                    vehicleNo: '',
                    bankName: '',
                    bankDetails: '',
                    nameOfItem: '',
                    type: '',
                    quantity: 0,
                    discount: 0,
                    gst: 0,
                    amount: 0,
                    invoiceDate: '',
                    referenceNo: '',
                    invoiceNo:'',
                    narration: '',
                    shippingAddress: '',
                    billingAddress: '',
                    gstInvoice: true,
                    normalInvoice: false
                });
                navigate(`/invoice/${invoiceId}`, { replace: true });
            } else {
                console.error('Error adding customer:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding customer:', error);
        }
    };

    return (
        <div className="add-customer-container">
            <Nav2 />
            <form onSubmit={handleSubmit} className="customer-form">
                <div className="form-group">
                    <label>Billing Address:</label>
                    <textarea name="billingAddress" value={formData.billingAddress} onChange={handleInputChange} rows={4}></textarea>
                </div>
                <div className="form-group">
                    <label>Shipping Address:</label>
                    <textarea name="shippingAddress" value={formData.shippingAddress} onChange={handleInputChange} rows={4}></textarea>
                </div>

                <div className="form-group">
                    <label>Narration:</label>
                    <input type="text" name="narration" value={formData.narration} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Reference No:</label>
                    <input type="text" name="referenceNo" value={formData.referenceNo} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Invoice No:</label>
                    <input type="text" name="invoiceNo" value={formData.invoiceNo} onChange={handleInputChange} />
                </div>
                
                <div className="form-group">
                    <label>Invoice Date:</label>
                    <input type="text" name="invoiceDate" value={formData.invoiceDate} onChange={handleInputChange} />
                </div>
                
                <div className="form-group">
                    <label>Vehicle Number:</label>
                    <input type="text" name="vehicleNo" value={formData.vehicleNo} onChange={handleInputChange} />
                </div>
                
                <div className="form-group">
                    <label>Name:</label>
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Phone:</label>
                    <input type="text" name="phone" value={formData.phone} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Address:</label>
                    <textarea name="address" value={formData.address} onChange={handleInputChange} rows={4}></textarea>
                </div>

                <div className="form-group">
                    <label>Account Number:</label>
                    <input type="text" name="accountNumber" value={formData.accountNumber} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Bank Name:</label>
                    <input type="text" name="bankName" value={formData.bankName} onChange={handleInputChange} />
                </div>

                <div className="form-group">
                    <label>Bank Details:</label>
                    <input type="text" name="bankDetails" value={formData.bankDetails} onChange={handleInputChange} />
                </div>

                <div className="form-row">
                    <div className="form-group">
                        <label>Name of Item:</label>
                        <input type="text" name="nameOfItem" value={formData.nameOfItem} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Type:</label>
                        <input type="text" name="type" value={formData.type} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Quantity:</label>
                        <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Discount:</label>
                        <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>GST:</label>
                        <input type="number" name="gst" value={formData.gst} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Amount:</label>
                        <input type="number" name="amount" value={formData.amount} onChange={handleInputChange} />
                    </div>
                    
                    <div className="form-group">
                        <label>Include GST in Invoice:</label>
                        <input type="checkbox" name="gstInvoice" checked={formData.gstInvoice} onChange={handleInputChange} />
                    </div>

                    <div className="form-group">
                        <label>Normal Invoice:</label>
                        <input type="checkbox" name="normalInvoice" checked={formData.normalInvoice} onChange={handleInputChange} />
                    </div>
                </div>

                <button type="submit" className="submit-button">Generate Invoice</button>
            </form>
        </div>
    );
};

export default AddCustomer;
