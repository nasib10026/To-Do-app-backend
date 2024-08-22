require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors');
const todoRoutes = require('./routes/api/tasks');
const connectDB = require('./config/db_connect')

//mongodb+srv://nasib1026:nasib11235@todo01.kgdga.mongodb.net/?retryWrites=true&w=majority&appName=todo01

//middleware
app.use(express.json())

//router config
app.use('/api/tasks', todoRoutes);

//database connection
connectDB();

app.get('/',(req,res)=>{
    res.send("Welcome to our app");
})

const port = 4000;
app.listen(port, () => {
    console.log(`server is running on port ${port}`);
})


