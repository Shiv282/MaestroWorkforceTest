var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var engines = require('consolidate');
var jwt = require('jsonwebtoken')
const secret_key = 'SeCrEt';



//Database connection
const mongoose = require('mongoose');
const DB_url = "mongodb://localhost:27017/"
mongoose.connect(DB_url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log("DATABASE CONNECTION Successful")
    })
    .catch(err => {
        console.log("error")
        console.log(err)
    })

//Importing models
let models = require('./db/models.js')

//Configuring server 

//app.use(express.urlencoded({extended: true}))
/*app.use(bodyParser.urlencoded({
    extended: true
  }));*/
app.use(express.json());
app.use(express.static(path.join(__dirname, 'views')));
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'))
app.listen('3000',function () {
    console.log("Listening to 3000");
    console.log(models)
})

app.get('/',function(req,res){
    res.render('home')
})

app.get('/guardPage',async function(req,res){
    const Guard = models.Guard;
    const guards = await Guard.find();
    //console.log(guards)
    //res.render('guards')
})

app.get('/apartmentPage',async function(req,res){
    const Apartment = models.Apartment;
    const apartments = await Apartment.find();
    console.log(apartments)
    res.render('apartments')
})

app.get('/supervisorPage',async function(req,res){
    const Supervisor = models.Supervisor;
    const supervisors = await Supervisor.find();
    console.log(supervisors)
    res.render('supervisors')
})

//----------db operations
//Guard
app.post('/addGuard',async(req,res)=>{
    console.log("Add guard")
    const Guard = models.Guard;
    const {name} = req.body;
    console.log(name)
    const guardPresentcheck = await Guard.find({name:name});
    if(guardPresentcheck.length==0){
        const newGuard = new Guard({
            name : name,
            days : 0,
            lastPresent : "No marked Attendance"
        })
        await newGuard.save();
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
})

app.get('/getGuard/:name',async (req,res)=>{
    console.log("Get guard")
    const Guard = models.Guard;
    const name = req.params.name;
    console.log(req.params)
    const guards = await Guard.find({name:name});
    console.log(guards)
    res.sendStatus(200);
})

app.delete('/deleteGuard/:name', async function(req,res){
    const Guard = models.Guard;
    const name = req.params.name;
    await Guard.deleteOne({name:name})
    res.sendStatus(200);
})

app.post('/markAttendance/:name',async function(req,res){
    console.log("MARK ATTENDANCE")
    const Guard = models.Guard;
    const name = req.params.name;
    var presentDate = new Date().toDateString();
    const guardOld = await Guard.find({name:name,lastPresent:presentDate});
    console.log(guardOld.name)
    if(guardOld!=0){
        res.sendStatus(400);
    }else{
        await Guard.findOneAndUpdate({name: name},{ $inc: { days: 1 },lastPresent : presentDate}, { returnNewDocument: true, upsert : true});
        res.sendStatus(200);
    }    
})

//Apartment
app.post('/addApartment',async(req,res)=>{
    console.log("Add Apartment")
    const Apartment = models.Apartment;
    const {name} = req.body;
    console.log(name)
    const apartmentPresentcheck = await Apartment.find({name:name});
    if(apartmentPresentcheck.length==0){
        const newApartment = new Apartment({
            name : name
        })
        await newApartment.save();
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
})

app.get('/getApartment/:name',async (req,res)=>{
    console.log("Get Apartment")
    const Apartment = models.Apartment;
    const name = req.params.name;
    console.log(req.params)
    const apartments = await Apartment.find({name:name});
    console.log(apartments)
    res.sendStatus(200);
})

app.delete('/deleteApartment/:name', async function(req,res){
    const Apartment = models.Apartment;
    const name = req.params.name;
    await Apartment.deleteOne({name:name})
    res.sendStatus(200);
})

//Supervisor
app.post('/addSupervisor',async(req,res)=>{
    console.log("Add supervisor")
    const Supervisor = models.Supervisor;
    const {name} = req.body;
    console.log(name)
    const supervisorPresentcheck = await Supervisor.find({name:name});
    if(supervisorPresentcheck.length==0){
        const newSupervisor = new Supervisor({
            name : name
        })
        await newSupervisor.save();
        res.sendStatus(200);
    }else{
        res.sendStatus(400);
    }
})

app.get('/getSupervisor/:name',async (req,res)=>{
    console.log("Get supervisor")
    const Supervisor = models.Supervisor;
    const name = req.params.name;
    console.log(req.params)
    const supervisors = await Supervisor.find({name:name});
    console.log(supervisors)
    res.sendStatus(200);
})

app.delete('/deleteSupervisor/:name', async function(req,res){
    const Supervisor = models.Supervisor;
    const name = req.params.name;
    await Supervisor.deleteOne({name:name})
    res.sendStatus(200);
})

app.get('/signup/admin', async (req,res)=>{
    console.log("hi");
    const {email , password} = req.body;
    console.log(email);
    const token = jwt.sign({email:email},secret_key,{expiresIn: "1hr"});
    res.send(token);
    //res.sendStatus(200);
    //res.json({"token":token});
})

app.post('/admin/verify', async (req,res)=>{
    const {token} = req.body;
    console.log(req.body);
    //console.log(JSON.stringify(req));
    await jwt.verify(token,secret_key, (err,val)=>{
        if(err){
            res.send(err);
        }else{
        res.send(val);
        }
    });
})