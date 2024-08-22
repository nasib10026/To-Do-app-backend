require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const todoRoutes = require('./routes/api/tasks');
const connectDB = require('./config/db_connect')

//mongodb+srv://nasib1026:nasib11235@todo01.kgdga.mongodb.net/?retryWrites=true&w=majority&appName=todo01

app.use(express.json())
app.use(cors());

app.use('/api/tasks', todoRoutes);
connectDB();

app.get('/',(req,res)=>{
    res.send("Welcome to our app");
})

app.listen(4000, () => {
    console.log('server is running on port 4000');
})


