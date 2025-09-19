const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const path = require("path"); // Add this line



const app = express();
app.use(bodyParser.json());
// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));

// Create a MySQL connection
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Fullstack",
    database: "salserosclubbase"
});


connection.connect((err) => {
    if (err) {
        console.error("Error connecting to MySQL:", err);
    } else {
        console.log("Connected to MySQL");
    }
});


// Handle POST request for user registration
app.post('/register', function (req, res) {
    const username = req.body.username;
    const password = req.body.password;

    // Perform registration logic here
    const sql = "INSERT INTO club_members (username, password) VALUES (?, ?)";
    connection.query(sql, [username, password], (err, result) => {
        if (err) {
            console.error("Error registering user:", err);
            res.status(500).send("Error registering user");
        } else {
            console.log("User registered successfully");
            res.send("User registered successfully");
        }
    });
});
// Define a route for the homepage
app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'homepage.html'));
});

app.listen(3001, function () {
    console.log("Server is on port 3001");
});
