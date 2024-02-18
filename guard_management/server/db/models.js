const mongoose = require('mongoose')

//Guard Schema
const guardSchema = new mongoose.Schema({
    name: {
        type: String
    },
    days:{
        type: Number
    },
    lastPresent:{
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
    name: {
        type: String
    }
})


const Apartment = mongoose.model('Apartment',supervisorSchema)
exports.Apartment = Apartment;