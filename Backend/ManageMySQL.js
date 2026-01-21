//import dependencies from package.json
const express = require('express') // Imports the express module, which is a web application framework for Node.js which provides functionality to do the following: It simplifies routing and handling HTTP (a set of rules we follow when trasnfering info on the internet or bteween our computer and a server) REQUESTS like POST, GET, etc.
const mysql = require('mysql2')  //  Imports the mysql module, which allows Node.js to interact with mySQL databases.
const cors = require ('cors') // Imports the cors module, which enables Cross-Origin Resource Sharing, allowing your server to handle requests from different origins. Also we use mysql2 and not mysql because mysql library is too old to understand the modern MySQL's server plugin
//the three lines above will import the corresponding package/modules from the package.json file.
//the lines below connect to the local databse server via the dotenv file which is converted to .env
const dotenv = require('dotenv');
dotenv.config(); // read from .env file Z(which contains the creds to our MySQL)

//

//the following lines use the mysql dependency to connect to our MySQL
// if you use .env to configure
console.log("HOST: " + process.env.HOST);
console.log("DB USER: " + process.env.DB_USER);
console.log("PASSWORD: " + process.env.PASSWORD);
console.log("DATABASE: " + process.env.DATABASE);
console.log("DB PORT: " + process.env.DB_PORT); //database (MySQL) port is 3306, but the port for our web server created and ran off of node.js is 5050

const connection = mysql.createConnection({
     host: process.env.HOST,
     user: process.env.DB_USER,        
     password: process.env.PASSWORD,
     database: process.env.DATABASE,
     port: process.env.DB_PORT
});

//At this point, we should have successfully connected to the local database server
//the code block below will do an exception handler to verify if we connected to the database
connection.connect((err) => {
     if(err){
        console.error(err);
     }
     console.log('database connected successfully');    // to see if the DB is connected or not (also for mysql2 connection.state does not work, only for mysql)
});

//

//the following methods are methods used to interact with the database (server-side logic)

const app = express(); //app is an instance of the framework express. app will allows us to execute the provided funcalities from express to do the above stated routes
//creates or uploads new data by grabbing data from html doc where user input is stored to database-> app.post() -> POST REQUEST ()
//read or retrieve only NON-SENSITIVE data from database -> app.get() -> GET REQUEST
//update exsisting data in the database -> app.put() -> PUT REQUEST
//delete data in the database -> app.delete() -> DELETE REQUEST
//The value of the method attribute within the form element fo your html document needs to match the rspective http method/request: ex html -> method=POST, js -> app.post();

app.use(cors()); //Frontend in root project directory files and Backend directory are running on two different Hostnames (domain) & ports, to allow the browser to fetch from backend, allow cors to work
app.use(express.json());
app.use(express.urlencoded({extended: false}));

/*
const location = require('path');
app.use(express.static(location.join(__dirname,"../Frontend"))); //because project folder is not in the same location as XAMPP installation (My local machine needed this alt)
*/

//we will use app.post to grab the user data from the localhoast (which was sent from the frontend), create a query, and upload it to the database
app.post('/Register', (request, response) => { //this is what you should do when a app.post() http request is sent to the node.js server
    const{ID, FirstName, LastName, ProjectTitle, EmailAddress, PhoneNumber, Time} = request.body;//grabbing the values of the name attribute from the form element (naming convention betweenm values of name attribute and coluns for tables are the same as intended not required!)
    
    const ChosenTime = Time;

    const QueryCheck = 'SELECT ID FROM Students WHERE ID = ?';

    connection.query(QueryCheck, [ID], (error, result) => {
        if(result.length == 0){//this means the USER'S ID was not found in the query so we can proceed knowing this is the user's first time registering and add them to the MySQL
            const QueryVariable = 'INSERT INTO Students (ID, FirstName, LastName, ProjectTitle, EmailAddress, PhoneNumber, Time) VALUES (?, ?, ?, ?, ?, ?, ?)';
            connection.query(QueryVariable, [ID, FirstName, LastName, ProjectTitle, EmailAddress, PhoneNumber, Time], (error, result) => {
            if(error){
                console.log(error);
                response.status(500).send(error.sqlMessage);
            }
            else{
                console.log("Data uploaded into table Students");
                response.status(200).send(`You have been registred for ${ChosenTime}`);
                }
            });
        }
        else{//this means the user has already registered to demo, give the user the ability to change or keep the current registration info
            response.send(` 
                <h3>You've already registered, would you like to change to this new time?<h3>
                <form action="http://localhost:5050/UpdateTime" method="POST">
                    <input type="hidden" name="ID" value="${ID}">
                    <input type="hidden" name="Time" value="${Time}">
                    <button type="submit">Change Time</button>
                    <a href="/">Cancel</a>
                </form>
            `);
        }
    });
});


//this use of app.post(parameter) is to update a users time in the event they already exists
app.post('/UpdateTime', (request, response) => {
    const{ID, Time} = request.body;
    const ChosenTime = Time;
    const QueryVariable = 'UPDATE Students SET Time = ? WHERE ID = ?'
    connection.query(QueryVariable, [Time, ID], (error, result) => {
        if(error){
            console.log(error);
            response.status(500).send("unable to update users current Time to new Time");
        }
        else{
            console.log("Successfully updated the student's Time");
            response.status(200).send(`You have been regestred for ${ChosenTime}`);
        }
    });
});


//

//this use of app.get is to display the list of registered students from the database to the frontend in the form of table, just as it is on MySQL, DisplayStudents.html
app.get('/TableRS', (request, response) => { //there is no need to create a request body as were grabbing all of the data from the database
    const QueryVariable = 'SELECT * FROM  Students';
    connection.query(QueryVariable, (error, results) => {
        if(error){
            console.log(error);
            return response.status(500).send("Error in retrieving data from database Students");
        }
        response.json(results);
    });
});


            //aws port       local port
app.listen(process.env.PORT || 5050, () => { //app.listen(parameter) tells the js file using Node.js to not only start the server so the localhoast can exsist on it but to listen for http request
  console.log("Server running on port 5050");
});

