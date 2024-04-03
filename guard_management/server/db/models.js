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
    salary: {
        type: Number
    },
    apartmentName: {
        type: String
    },
    apartmentId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Apartment'
    },
    advance:{
        type: Number
    },
    advanceHistory:[{ type: mongoose.Schema.Types.ObjectId, ref: 'AdvanceHistory' }]
    ,
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
    },
})

/*
- Name
- Password [On Hold]
- Salary
- Apartment name
- Day Shifts completed
- Night Shifts completed
- Last Present Day
- Last Present Night
- Advance taken
- Advance History - [] : Value - Reference to the attendance table which has advance history
*/

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
    supervisors: [{
        supervisorId: {
        type: mongoose.Schema.Types.ObjectId, 
        ref:'Guard'
        },
        supervisorName: {
            type: String
        }
    }],
    guardCount: {
        type: Number
    },
    location: {
        type: String
    },
    guards: [ {
        guardId:{
            type: mongoose.Schema.Types.ObjectId, 
            ref:'Guard'
        },
        name: {
            type: String
        }
    }],
    patrolPath:[{
        title:{
            type: String
        },
        latitude:{
            type: String
        },
        longitude:{
            type: String
        }
    }]
})


const Apartment = mongoose.model('Apartment',apartmentSchema)
exports.Apartment = Apartment;

const advanceHistorySchema = new mongoose.Schema({
    adminId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Admin'
    },
    guardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guard'
    },
    amount: {
        type: Number
    },
    apartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    date:{
        type: Date
    },
    reason: {
        type: String
    }
})

const AdvanceHistory = mongoose.model('AdvanceHistory',advanceHistorySchema)
exports.AdvanceHistory = AdvanceHistory;
/*
- Admin id
- Guard id
- Amount
- Apartment id
- Date
- Reason (if needed)
*/



const attendanceHistorySchema = new mongoose.Schema({
    guardId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Guard'
    },
    apartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    date:{
        type: Date
    }
})

const AttendanceHistory = mongoose.model('AttendanceHistory',attendanceHistorySchema)
exports.AttendanceHistory = AttendanceHistory;




const patrolHistorySchema = new mongoose.Schema({
    apartmentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Apartment'
    },
    title: {
        type: String
    },
    time:{
        type: Date
    }
})

const PatrolHistory = mongoose.model('PatrolHistory',patrolHistorySchema)
exports.PatrolHistory = PatrolHistory;