const mongoose = require('mongoose')

//Admin Schema
const adminSchema = new mongoose.Schema({
    email: {
        type: String
    },
    password:{
        type: String
    }
})

const Admin = mongoose.model('Admin',adminSchema)
exports.Admin = Admin;

//Guard Schema
const guardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    apartmentName: {
        type: String
    },
    advance:{
        type: Number
    },
    days:{
        type: Number
    },
    lastPresentDay:{
        type: String
    },
    nights:{
        type: Number
    },
    lastPresentNight:{
        type: String
    }
})

const Guard = mongoose.model('Guard',guardSchema)
exports.Guard = Guard;

//Supervisor Schema
const supervisorSchema = new mongoose.Schema({
    name: {
        type: String
    }
})
const Supervisor = mongoose.model('Supervisor',supervisorSchema);
exports.Supervisor = Supervisor

//Apartment Schema
const apartmentSchema = new mongoose.Schema({
    apartmentName: {
        type: String
    },
    supervisorName: {
        type: String
    },
    guardCount: {
        type: Number
    },
    supervisorCount: {
        type: Number
    },
    location: {
        type: String
    }
})


const Apartment = mongoose.model('Apartment',apartmentSchema)
exports.Apartment = Apartment;