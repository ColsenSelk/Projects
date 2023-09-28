
const express = require('express');
const mysql = require("mysql");
const dotenv = require("dotenv");
const path = require('path');
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const cookie = require('cookie-parser');

dotenv.config({path: './.env'});

const app = express();
const port = process.env.DATABASE_PORT;

//createPool designates a specific number (ie a pool) of connections to be used. 
const db = mysql.createPool({
    connectionLimit: 10, 
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    database: process.env.DATABASE,
});

app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

//this is needed to grab data from the form
//this parses URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false }));
//Parse JSON bodies (as sent by API clients)
app.use(express.json());

//connect to the database
db.getConnection((err) => {
    if(err){
       throw err; 
    } else {
        console.log("MySQL Connected...")
    }
});


const { rootCertificates } = require('tls'); //difference between http and https
const { isRegularExpressionLiteral } = require('typescript');
const { response } = require('express');
const requestPromise = require('request-promise');
const { request } = require('http');
app.use(express.static(path.join(__dirname, 'public')));
// viewed at http://localhost:3000

//gets the login page first
app.get('/', function (req, res) {
   res.sendFile(path.join(__dirname + '/public/WebDogsLogin.html'));
});

//grabs the data from the login form
app.post('/login', function(req, res) {
    //req. this is where i get the request data. 
    console.log(req.body);
    //create variables of the form data
    const username = req.body.name;
    const password = req.body.password;
    
    //make sure username and passward are filled out
    if(username && password){
        //create variables to look in the database for the username on the users table
        const dbSearch = 'SELECT * FROM users WHERE username = ?';
        const nameSearch = mysql.format(dbSearch, [username]);
        
        //this searches the database for the username
        db.query(nameSearch, async (err, result) => {

            if(err){
                console.log(err);
            }

            //make sure the username is in the database
            if(result.length == 0){
                console.log("there is no user by that name");
                res.send("There is no user by that name");
                res.end();
            } else {
                req.session.loggedin = true;
                req.session.username = username;
                //after the username is verified get the hased password from the row
                const hashedPassword = result[0].password;

                //verify that the password entered matches the hashed password
                if(await bcrypt.compare(password, hashedPassword)){
                    console.log("Login successful");
                    res.redirect('/game');
                } else {
                    console.log("Password incorrect");
                    res.send("The password is incorrect");
                    res.end();
                }
            }
        });
    }

});
//grab the data from the create account form 
app.post('/createAccount', function(req, res) {
    console.log(req.body);

    const {username, email, password, confirmPassword} = req.body;

    const dbSearch = 'SELECT email FROM users WHERE email = ?';
    const emailSearch = mysql.format(dbSearch, [email]);

    db.query(emailSearch, async (error, result) => {
        if(error){
            console.log(error);
        } 

        if(result.length > 0){
            console.log("The email entered is already registered");
            res.send("The email entered is already registered");
            res.end();
            
        } else if(password != confirmPassword) {
            console.log("The passwords do not match");
            res.send("The passwords do not match");
            res.end();
        }

        let hashedPassword = await bcrypt.hash(password, 5);
        console.log(hashedPassword);

        db.query('INSERT INTO users SET ?', {username: username, email: email, password: hashedPassword}, (error, res) => {
            if(error){
                console.log(error);
            } else {
                console.log(res);
            }
        });
        res.redirect('/game');
    });
});

app.get('/game', function (req, res) {
    res.sendFile(path.join(__dirname + '/public/HTMLPage1.html'));
});

app.post('/game',function(req, res){
    console.log(req.body);
});

app.listen(port, () => {
    console.log('Server started with port 3000')
});
//# sourceMappingURL=server.js.map