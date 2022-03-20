/*  Sequelize:
    1) Sequelize is a promise based nodejs ORM tool
    2) Object relational Mapping(ORM) is a technique of accessing relational database from an object oriented language
    3) or Technique that maps software objects to database tables
    3) Maps to relational database such as MySQL, SQL Server, Postgrey SQL

    SETUP:
    1) npm init -y, create index.js file
    2) npm install express mysql2 body-parser
    3) npm install sequelize sequelize-cli
    4) npx sequelise init
    5) models folder is created with index.js file present. Contains code we used, but can delete and write from scratch.
    5) in config.json, complete dev: {username,password,database,host}

    WorkFlow:
    1) Prerequiste : index.js file under models folder conatains sequalise setup code. It has code which looks in congig.json
       to find (user,password,which database to connect to)) and connects sequalise to that database. (This is parallel to 
       what mysql.createConnection code did in previous crud api).
       
       Now are now ready to map
       code to relational database. A db variable is created by above code which camn now be accessed from anywhere
    2) Begin: Your main index.js file all basic initial code. Bringing in requiremnets and all. This time to handle routes, we
       have created seperate file to handle them. this is apiRoutes.js. Using "app.use("/student", apiRoutes);" we direct all
       requests with http:localhost:3000/student to apiRoutes.js file. It will handle CRUD request
    3) Connection was made already made. But we need to sync it to database. this is done using "db.sequelize.sync()"
    4) We now define our student table in the student.js file
    5) In the apiRoutes, we define all CRUD operations. If you look at it, no where we are using SQL statememnst as we did in
       previous Crud api. Sequalise provides inbuilt functions such as findall(), create(), destroy(), update() that run SQL
       statemenst for us.
*/

const express = require('express');
var app = express();
const db = require("./models");
const bodyparser = require('body-parser');
var cors = require("cors");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended: false}));
app.use(cors());

const PORT = process.env.PORT || 8080;

const apiRoutes = require("./routes/apiRoutes");
app.use("/student", apiRoutes);

db.sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`listening on: http://localhost:${PORT}`);
  });
});




