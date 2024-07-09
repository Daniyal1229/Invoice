import React from 'react';
import { Route, Routes } from "react-router-dom";
import { Signup } from './components/Signup.jsx';
import { Login } from './components/Login.jsx';
import { Home } from './components/Home.jsx';
import AddCustomer from './components/AddCustomer.jsx';
import Invoice from './components/Invoice.jsx';
function App() {
    return (
        <div className="App">
        <Routes>  
            <Route path='/' element={<Signup/>} />
            <Route path='home' element={<Home/>} />
            <Route path='login' element={<Login/>} />
            <Route path="/invoice/:id" element={<Invoice />} />
            <Route path='customer' element={<AddCustomer/>} />
            
        </Routes>
        </div>
    );
}

export default App;
