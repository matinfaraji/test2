const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const router = require("express").Router();
require("dotenv").config();
const PORT = process.env.APP_PORT || 5000;
const app = express();
// https://www.tutorialsteacher.com/sqlserver/tables-relations

app.use(express.json());
app.use(bodyParser.text());
app.use(cors());

// const data = [
//   {
//     name: "Nagesh",
//     age: 35,
//     gender: "M",
//     exp: 9,
//     type: "Full Time",
//     qualification: "Ph.D",
//   },
//   {
//     name: "Latha",
//     age: 40,
//     gender: "F",
//     exp: 13,
//     type: "Full Time",
//     qualification: "Ph.D",
//   },
// ];
const connection = async (uri) => {
  try {
    await mongoose.connect(uri, {});
    console.log("Connected to database ✅");
  } catch (error) {
    console.error(error);
  }
};

connection(process.env.URL);
const facultySchema = new mongoose.Schema({
  name: String,
  age: Number,
  gender: String,
  exp: Number,
  type: String,
  qualification: String,
});

const Faculty = mongoose.model("Faculty", facultySchema);

// Get all faculty members
app.get("/api/faculty", async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Create a new faculty member
app.post("/api/faculty", async (req, res) => {
  try {
    const newFacultyMember = req.body;
    const faculty = await Faculty.create(newFacultyMember);
    res.status(201).json({ ok: true, faculty });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
