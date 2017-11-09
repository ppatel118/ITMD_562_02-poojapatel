var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
app.set("view engine", "ejs");

var users = [];
var userId = 0;
var reminders = [];

app.listen(3000, function(req, res) {
	console.log("Listening on PORT 3000")
});

app.get("/", function(req, res) {
	res.render("main");
});

app.post("/adduser", function(req, res) {
	var newUser = req.body.newuser;
	users.push(newUser);
	res.redirect("/users");
});

app.get("/users", function(req, res) {
	res.render("users", {users: users});
});

app.post("/addreminders", function(req, res) {
	var newReminder = req.body.newreminder;
	reminders.push(newReminder)
	res.redirect("/reminders");
});

app.get("/reminders", function(req, res) {
	res.render("listOfReminders", {reminders: reminders});
});

// app.post("/users", function(req, res) {
// 	var newuser = req.body.newuser;
// 	users.push(newuser);
// 	res.render("users");
// });

// app.get("/users/:userid", function(req, res) {
// 	res.render("users");
// });


