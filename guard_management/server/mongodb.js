//----------- https://www.mongodb.com/docs/mongodb-shell/crud/ -----------

//Connection
const mongoose = require("mongoose");
const DB_url = "mongodb://localhost:27017/";
mongoose
  .connect(DB_url, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DATABASE CONNECTION Successful");
  })
  .catch((err) => {
    console.log("error");
    console.log(err);
  });

//User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
  score: {
    type: Number,
  },
});

//User model
const User = mongoose.model("User", userSchema);

//Add user operation
async function addUser(name, age, score) {
  const newUser = new User({
    name: name,
    age: age,
    score: score,
  });
  await newUser.save();
  console.log("User added successfully");
}

//Find user operation
async function findUser(name) {
  const presentUser = await User.find({ name: name });
  if (presentUser.length == 0) {
    console.log("User not found");
  } else {
    console.log("Details of User found");
    console.log(presentUser);
  }
}

//Delete specific user
async function deleteUser(name) {
  await User.deleteOne({ name: name });
  console.log("Delete successful");
}

//Delete all users
async function deleteAllUsers() {
  await User.deleteMany({});
  console.log("Delete all successful");
}

//Update user
async function updateUser(oldName, newName, age, score) {
  await User.updateOne(
    { name: oldName },
    {
      $set: {
        name: newName,
        age: age,
        score: score,
      },
    },
    { upsert: true }
  );
  console.log("Update successful");
}

//Calling the functions

async function operations() {
  console.log("\n\nDeleting all");
  await deleteAllUsers();

  console.log("\n\nInserting ");
  await addUser("ram", 20, 99);
  await addUser("sham", 30, 88);

  console.log("\n\nFinding Ram");
  await findUser("ram");
  console.log("Finding Krishna");
  await findUser("krishna");

  console.log("\n\nUpdating Ram's age to 30");
  await updateUser("ram", "Ram", 30, 99);
  console.log("Finding Ram");
  await findUser("Ram");

  console.log("\n\nDeleting Ram");
  await deleteUser("Ram");

  console.log("\n\nDeleting all");
  await deleteAllUsers();
}

operations();
