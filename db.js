const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors'); 

const {Landlord} = require('./models/landLordModel');
const {Tenant} = require('./models/tenantModel');
const {Contract} = require('./models/contractModel');
const landLordRoute = require('./routes/landLordRoute');
const tenantRoute = require('./routes/tenantRoute');
const contractRoute = require('./routes/contractRoute');

const mongoURI = 'mongodb+srv://LordTen:LandTen@datas.gk1obzq.mongodb.net/'

mongoose.connect(mongoURI).then(() => console.log('MongoDB connected…')).catch(err => console.log(err));

const db = mongoose.connection;

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors({
    origin: '*',  
    optionsSuccessStatus: 200  
  }));
  

app.use("/landlords", landLordRoute );
app.use("/tenants", tenantRoute);
app.use("/contracts", contractRoute);

app.get('/', (req, res) => {
    res.send('Welcome to the Landlord and Tenant Management System');
});

db.on('disconnected', function() {
    console.log('MongoDB disconnected');
});

process.on('SIGINT', function() {
    db.close(function() {
        console.log('MongoDB connection disconnected through app termination');
        process.exit(0);
    });
}).on('SIGTERM', () => {
    db.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('Server is running on port ' + port);
});

module.exports = db;