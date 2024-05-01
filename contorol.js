const mongoose = require("mongoose");
const express = require("express");
const router = require("express").Router();
require("dotenv").config();
const cors = require("cors")
const PORT = process.env.APP_PORT || 5000;
const app = express();
const Schema = mongoose.Schema;
const bodyParser = require("body-parser")
app.use(express.json(), bodyParser.text(), cors());

const data = [
  {
    name: "Nagesh",
    age: 35,
    gender: "M",
    exp: 9,
    type: "Full Time",
    qualification: "Ph.D",
  },
  {
    name: "Latha",
    age: 40,
    gender: "F",
    exp: 13,
    type: "Full Time",
    qualification: "Ph.D",
  },
];

// Define the schema for Faculty members
const facultySchema = new Schema({
  Name: {
    type: String,
    required: true,
  },
  Age: {
    type: Number,
    required: true,
  },
  gender: {
    type: String,
  },
  exp: {
    type: Number,
  },
  type: {
    type: String,
  },
  qualification: {
    type: String,
  },
});

// Create a model based on the schema
const Faculty = mongoose.model("Faculty", facultySchema);




// const createFacultyMember = async (req, res) => {
//     try {
//       const newFacultyMember = req.body;
//       const faculty = await Faculty.create(newFacultyMember);
//       res.status(201).json({ ok: true, faculty });
//       console.log("ok");
//     } catch (error) {
//         console.log(object);
//       console.log(error);
//       res.status(500).json({ message: "Internal Server Error" });
//     }
//   };
  const getAllTasks = async (req, res) => {
    try {
      const datas = await data.find();
      res.status(200).json(datas);
      console.log(datas);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Error Server." });
    }
  };
  router.get("/get",   (req, res) => {
    try {
      const datas =  data.find();
      res.status(200).json(datas);
      console.log(datas);
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: "Internal Error Server." });
    }
  });

router.post("/new", (req, res) => {
    const newFacultyMember = req.body;
         const faculty =  Faculty.create(newFacultyMember);
         res.status(201).json({ ok: true, faculty });
         console.log("ok");});


const connection =async (uri) => {
  return await mongoose.connect(uri);
};

connection(process.env.URL).then(() => {
  console.log("connected to database ✅");
});
app.use(express.json());
app.use("/api", router);
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

