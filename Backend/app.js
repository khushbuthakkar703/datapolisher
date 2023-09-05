const express = require("express");
const app = express();
const port = 8000
const dotenv = require("dotenv").config();
const mongoose = require("mongoose")
const cors = require('cors')
require("./.env");
const user = require("./routes/user");
const company = require("./routes/company");
const phonenumber = require("./routes/phonenumber");
const fileuplaod = require("./routes/fileupload")
const notification = require("./routes/Notification");
const NeoBillling = require("./routes/NeonBilling");
const ResignUrl = require("./routes/reassigned");

require('dotenv').config();
// const express = require('express');
const http = require('http');
require('./processready');
const uploadset = require("./multerfile")
const {
    placeOrder,
    getStatus
} = require('./queuegenrate');

// connect to DB
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.DB_CONNECT, { useUnifiedTopology: true }, { useNewUrlParser: true })
    .then(() => console.log("Database Connection is succesful"))
    .catch((err) => console.log("no connection", err));

var bodyParser = require('body-parser');

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
// use Middleware

app.use(express.json())
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use('/user', user);
app.use('/company', company)
app.use('/phnonumber', phonenumber)
app.use('/file', fileuplaod)
app.use('/notification', notification)
app.use('/neonbilling', NeoBillling)
app.use('/ResignUrl', ResignUrl)






// app.listen(port, () => {
//     console.log(`server is running on ${port}`)
// })

const server = http.createServer(app);
const PORT = 8000;
server.listen(PORT, () => {
    console.log(`Restaurant open at:${PORT}`);
});