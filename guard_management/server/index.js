var express = require('express');
var app = express();
var path = require('path')
var bodyParser = require('body-parser')
var engines = require('consolidate');
var jwt = require('jsonwebtoken')
const secret_key = 'SeCrEt';
const cors = require('cors');

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))
app.use(express.urlencoded({extended: true}))

  
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

  //app.use(express.urlencoded({extended: true}))


//app.use(express.static(path.join(__dirname, 'views')));
//app.set('view engine', 'html');
//app.set('views', path.join(__dirname, 'views'))

app.use(express.json());
app.use(cors());
app.use( function(req,res,next){
    res.header('Content-Type','application/json; charset=utf-8');
    res.header('Access-Control-Allow-Headers','Origin, X-Requestd-With, Content-Type, Accept');
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
})
  

app.listen('3000',function () {
    console.log("Listening to 3000");
    console.log(models)
})

app.get('/',function(req,res){
    res.render('home');
})

app.post('/body', function(req,res){
    console.log(req.body)
    res.send(req.body);
})

app.get('/guardPage',async function(req,res){
    const Guard = models.Guard;
    const guards = await Guard.find();
    res.json({data : guards});
    //console.log(guards)
    //res.render('guards')
})

app.get('/apartmentPage',async function(req,res){
    const Apartment = models.Apartment;
    const apartments = await Apartment.find();
    res.json({data : apartments});
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
    const {name, apartmentName} = req.body;
    console.log(name)
    const guardPresentcheck = await Guard.find({name:name});
    if(guardPresentcheck.length==0){
        const newGuard = new Guard({
            name : name,
            apartmentName : apartmentName,
            days : 0,
            lastPresentDay : "No marked Attendance",
            nights: 0,
            lastPresentNight: "No marked Attendance",
            advance: 0
        })
        await newGuard.save();
        res.json({message: "Guard added successfully"});
    }else{
        res.json({message: "Guard already present"});
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

app.delete('/deleteGuard', async function(req,res){
    const Guard = models.Guard;
    const id = req.body.id;
    console.log(id);
    await Guard.deleteOne({_id:id})
    res.sendStatus(200);
})

app.post('/markAttendance',async function(req,res){
    const Guard = models.Guard;
    const id = req.body.id;
    var presentDate = new Date().toDateString();
    const guardOld = await Guard.find({_id:id,lastPresentDay:presentDate});
    if(guardOld!=0){
        res.sendStatus(200);
    }else{
        await Guard.findOneAndUpdate({_id: id},{ $inc: { days: 1 },lastPresentDay : presentDate}, { returnNewDocument: true, upsert : true});
        res.sendStatus(200);
    }    
})

//Apartment
app.post('/addApartment',async(req,res)=>{
    console.log("Add Apartment")
    const Apartment = models.Apartment;
    const {apartmentName, supervisorName, location} = req.body;
    console.log(req.body)
    const apartmentPresentcheck = await Apartment.find({apartmentName:apartmentName});
    if(apartmentPresentcheck.length==0){
        const newApartment = new Apartment({
            apartmentName : apartmentName,
            supervisorName : supervisorName,
            guardCount : 0,
            supervisorCount : 1,
            location : location
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

app.post('/addAdvance', async function(req,res){
    const Guard = models.Guard;
    const {advance, id} = req.body;
    await Guard.findOneAndUpdate({_id: id},{ $inc: { advance: advance }}, { returnNewDocument: true, upsert : true});
    res.json({messsage:"Advance updated"});
})  

app.post('/signup', async (req,res)=>{
    const {email , password, role} = req.body;
    const Admin = models.Admin;
    const adminPresent = await Admin.find({email:email});
    if(adminPresent.length > 0){
        res.status(200).json({message: "Email already exists"});
    }else{
        const newAdmin = new Admin({
            email : email,
            password : password
        })
        await newAdmin.save();
        const token = jwt.sign({email},secret_key,{expiresIn: "1hr"});
        res.status(200).json({ message:"Admin created successfully.", token: token});
    }
})

app.post('/signin', async (req,res)=>{
    const {email , password} = req.body;
    const Admin = models.Admin;
    const adminPresent = await Admin.find({email, password});
    if(adminPresent.length > 0){
        const token = jwt.sign({email},secret_key,{expiresIn: "1hr"});
        res.status(200).json({ message:"Logged in successfully.", token: token});
    }else{
        res.status(200).json({message: "Invalid email or password"});
    }
})

app.post('/admin/verify', async (req,res)=>{
    const {token} = req.body;
    //console.log(JSON.stringify(req));
    jwt.verify(token,secret_key, (err,val)=>{
        if(err){
            res.send(err);
        }else{
            console.log(val);
        res.send(val);
        }
    });
})


