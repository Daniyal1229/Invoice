import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../css/customerList.css";
import { useNavigate } from "react-router-dom";

export const CustomerList = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const response = await axios.get('http://localhost:5000/customer/');
                setCustomers(response.data.customers);
            } catch (error) {
                console.error('Error fetching customer data:', error);
            }
        };

        fetchCustomers();
    }, []);
    
    const showAdmin = ()=>{
        console.log("admin");
    }
    const addCustomer = ()=>{
        navigate("/customer", { replace: true });
    }
    const handleEdit = (index) => {
        console.log(`Edit customer at index ${index}`);
    };

    const handleDelete = (index) => {
        console.log(`Delete customer at index ${index}`);
    };

    const handleView = (index) => {
        console.log(`View customer at index ${index}`);
    };

    const handleSearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const filteredCustomers = customers.filter(customer =>
        customer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className='CustomerList'>
            <div className="search">
                <input
                    type="search"
                    placeholder='Search by name'
                    value={searchTerm}
                    onChange={handleSearch}
                />
                <button className="admin"
                    onClick={showAdmin}
                >
                    admin
                </button>
            </div>
            <div className='addCustomer'>
                <h1>Customer</h1>
                <button
                    onClick={addCustomer}
                >Add Customer</button>
            </div>
            <table className='customerTable'>
                <thead>
                    <tr>
                        <th>Sl. No</th>
                        <th>Name</th>
                        <th>Phone No</th>
                        <th>Address</th>
                        <th>Vehicle No</th>
                        <th>Account Number</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filteredCustomers.length > 0 ? (
                        filteredCustomers.map((customer, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{customer.name}</td>
                                <td>{customer.phone}</td>
                                <td>{customer.address}</td>
                                <td>{customer.vehicleNo}</td>
                                <td>{customer.accountNumber}</td>
                                <td>
                                    <div className='buttonContainer'>
                                        <button className='edit' onClick={() => handleEdit(index)}>Edit</button>
                                        <button className='delete' onClick={() => handleDelete(index)}>Delete</button>
                                        <button className='view' onClick={() => handleView(index)}>View</button>
                                    </div>
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan='7'>No customers found.</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};
