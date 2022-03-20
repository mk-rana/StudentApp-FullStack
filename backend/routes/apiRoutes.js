const express = require("express");
const { or } = require("sequelize");
const router = express.Router();
const db = require("../models");

// get all students: student/all ostudents/all
router.get("/all", (req, res) => {
  db.student.findAll().then(students => res.send(students));
});


// get single student by id
router.get("/find/:id", (req, res) => {
  db.student.findAll({
    where: {
      id: req.params.id
    }
  }).then(students => res.send(students));
});

// post new student
/*
router.post("/new", (req, res) => {
  db.student.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    dob: req.body.dob,
    phone: req.body.phone,
    address: req.body.address
  }).then(submited => res.send(submited));
});
*/

/* Test API Running: Does-> SELECT * FROM students AS student WHERE "" OR ""
const { Op } = require('sequelize');
router.get("/newFind", (req, res) => {
  
  const query = db.student.findAll({
    where: {
      [Op.or]: [
        { first_name: req.body.first_name },
        { phone: req.body.phone }
      ]
    }
  }).then(query => res.send(query));
});
*/

// New Post API which checks if name or phone already exists before posting it to database
const { Op } = require('sequelize');
router.post("/new", (req, res) => {
  
  db.student.findAll({
    where: {
      [Op.or]: [
        { first_name: req.body.first_name },
        { phone: req.body.phone }
      ]
    }
  }).then(result => checkPresent(req,res,result));
});

function checkPresent(req,res,result) {
  if(result.length===0)
  {
    db.student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      phone: req.body.phone,
      address: req.body.address
    }).then(submited => res.send(submited));
  }
  else
  {
    res.status(404).send("Student name or phone already exists!");
  }
}

function validateEmail(myForm) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(myForm.emailAddr.value))
  {
    return (true)
  }
    alert("You have entered an invalid email address!")
    return (false)
}


// Same functionality as above post api
/*
const { Op } = require('sequelize');

router.post("/new", (req, res) => {
  
  const query = db.student.findAll({
    where: {
      [Op.or]: [
        { first_name: req.body.first_name },
        { phone: req.body.phone }
      ]
    }
  });

  if(query.length===0)
  {
    db.student.create({
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      dob: req.body.dob,
      phone: req.body.phone,
      address: req.body.address
    }).then(submited => res.send(submited));
  }
  else
  {
    res.send("Data exists already!");
  }
});
*/


// delete todo
router.delete("/delete/:id", (req, res) => {
  db.student.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => res.send("success"));
});

// edit a todo
router.put("/edit/:id", (req, res) => {
  db.student.update(
    {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        dob: req.body.dob,
        phone: req.body.phone,
        address: req.body.address
    },
    {
      where: { id: req.params.id }
    }
  ).then(() => res.send("success"));
});


module.exports = router;