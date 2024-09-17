const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const app = express();
app.use(cors());

app.get("/lists", async (req, res) => {
  let countriesList = await Employee.find().distinct("country");
  let departmentsList = await Employee.find().distinct("department");
  let genderList = await Employee.find().distinct("gender");

  let listsObj = {
    countries: countriesList,
    departments: departmentsList,
    genders: genderList,
  };
  res.json(listsObj);
});
app.get("/getEmployees", async (req, res) => {
  console.log(req.query);
  let employeesData = await Employee.find().and([
    { country: req.query.country },
    { department: req.query.department },
    { gender: req.query.gender },
  ]);
  res.json(employeesData);
});
let employeeSchema = new mongoose.Schema({
  id: Number,
  profilePic: String,
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  gender: String,
  department: String,
  country: String,
});

app.get("/getEmployees/:country/:department/:gender", async (req, res) => {
  console.log(req.params);
  let employeesData = await Employee.find()
    .and([
      { country: req.params.country },
      { department: req.params.department },
      { gender: req.params.gender },
    ])
    .limit(req.query.limit)
    .sort(req.query.order == "desc" ? "-id" : "id");
  res.json(employeesData);
});
app.listen(4567, () => {
  console.log("Listening to port 4567");
});

let Employee = new mongoose.model("employee", employeeSchema);

let connectToMDB = async () => {
  try {
    mongoose.connect(
      "mongodb+srv://sumanthdps:sumanth@mern2406.9fvsa.mongodb.net/Tata?retryWrites=true&w=majority&appName=Mern2406"
    );
    console.log("Succcesfully connected to MongoDB");
  } catch (err) {
    console.log(err);
    console.log("unable to connect to MongoDB");
  }
};
connectToMDB();
