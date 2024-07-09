import express from "express";
import mongoose from 'mongoose';
import dotenv from "dotenv";
import cors from 'cors'

dotenv.config();
const MONGODB_URL = process.env.MONGODB_URL;
const app = express();

//  db connection

async function db() {
    try {
        let conn = await mongoose.connect(MONGODB_URL);
        console.log(`db is connected on `,conn.connection.host);
    } catch (error) {
        console.log(error.message);
        process.exit(1)
    }
}

db()

//  schema
const SignupSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required: true,
    },
    password:{
        type:String,
        required:true
    }
})

//  collection
const Signup = mongoose.model("Signup",SignupSchema);

// Middlewares
app.use(express.json());
app.use(cors())
app.use(express.urlencoded({extended:true}))


// Routes
//  Signup
app.post("/signup", async(req,res,next)=>{
    const {name, email, password} = req.body;
    console.log(name,email,password);
    if (!name || !email || !password) {
        return res.status(400).json("Please fill all the fields");
    }
    else{
        try {
            const newuser = await Signup.create(
                {
                    name:name,
                    email:email,
                    password:password
                }
            );
            console.log(newuser);
            res.status(201).json(newuser);
        } catch (error) {
            res.status(400).json({message:"could not register",error:error.message})
        }
    }
})


//  login
app.post("/login", async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json("Please fill all the fields");
    }
    try {
        const user = await Signup.findOne({ email: email });
        if (!user) {
            return res.status(400).json("no user found");
        }
        if (user.password !== password) {
            return res.status(400).json("incorrect password");
        }
        res.status(200).json({ message: "Login successful", user:{name:user.name,email:user.email}});
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
})

// customer 

// Customer schema
const CustomerSchema = new mongoose.Schema({
    billingAddress: String,
    shippingAddress: String,
    narration: String,
    referenceNo: String,
    invoiceNo: String,
    invoiceDate: Date,
    vehicleNo: String,
    name: String,
    phone:Number,
    address: String,
    accountNumber: String,
    bankName: String,
    bankDetails: String,
    nameOfItem: String,
    type: String,
    quantity: Number,
    discount: Number,
    gst: Number,
    amount: Number,
    gstInvoice: Boolean,
    normalInvoice: Boolean
});

// Customer collection
const Customer = mongoose.model("Customer", CustomerSchema);

//  customer routes
app.post("/customer", async (req, res, next) => {
    const {
        billingAddress,
        shippingAddress,
        narration,
        referenceNo,  // invoice
        invoiceNo,    // invoice
        invoiceDate,    // invoice
        vehicleNo,
        name,
        phone,
        address,
        accountNumber,
        bankName,
        bankDetails,
        nameOfItem,     // invoice
        type,           // invoice
        quantity,       // invoice
        discount,
        gst,
        amount,         // invoice
        gstInvoice,
        normalInvoice
    } = req.body;

    try {
        const newCustomer = await Customer.create({
            billingAddress,
            shippingAddress,
            narration,
            referenceNo,
            invoiceNo,
            invoiceDate,
            vehicleNo,
            name,
            phone,
            address,
            accountNumber,
            bankName,
            bankDetails,
            nameOfItem,
            type,
            quantity,
            discount,
            gst,
            amount,
            gstInvoice,
            normalInvoice
        });
        res.status(201).json(newCustomer);
    } catch (error) {
        res.status(400).json({ message: "could not create customer", error: error.message });
    }
});

//  get customers data
app.get("/customer", async (req, res, next) => {
    try {
        const customers = await Customer.find();
        const customerDetails = customers.map(customer => ({
            name: customer.name,
            phone: customer.phone,
            address: customer.address,
            vehicleNo: customer.vehicleNo,
            accountNumber: customer.accountNumber
        }));
        res.status(200).json({ customers: customerDetails });
    } catch (error) {
        res.status(400).json({ message: "Could not find any customers", error: error.message });
    }
});

//  customer edit
app.put("/customer/:id", async (req, res, next) => {
    try {
    const customer = await Customer.findById(req.params.id);
    const updatedCustomer = await Customer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json({ message: "Customer updated successfully", updatedCustomer });
    } catch (error) {
    res.status(400).json({ message: "Could not update customer", error: error.message });
    }
});

//  delelte customer
app.delete("/customer/:id", async(req,res,next)=>{
    try {
        const customer = await Customer.findById(req.params.id);
        const deletecustomer = await Customer.findByIdAndDelete(req.params.id);
        if (!deletecustomer) {
            res.status(404).json({message:"Could not find customer",error:error.message});
        } else {
            res.status(200).json("deleted Successfully");
        }
    } catch (error) {
        res.status(404).json({message:"Could not find customer",error:error.message});
    }
})

// Route 
// get invoice details by ID
app.get("/invoice/:id", async (req, res, next) => {
    try {
        const invoiceId = req.params.id;
        const invoice = await Customer.findById(invoiceId);
        if (!invoice) {
            return res.status(404).json({ message: "could not generate invoice" });
        }
        else{
            const { referenceNo, invoiceNo, invoiceDate, nameOfItem, type, quantity, amount } = invoice;
            res.status(200).json({referenceNo, invoiceNo, invoiceDate, nameOfItem, type, quantity, amount
            });
        }
    } catch (error) {
        res.status(400).json({ message: "could not generate invoice", error: error.message });
    }
});



export default app;