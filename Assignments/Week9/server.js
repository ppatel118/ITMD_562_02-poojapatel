var express = require("express");
var http = require("http");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json());

var users = [];
var reminders = [];
var userIds = 0;
var reminderIds = 0;


function user(id, name, email) {
	this.id = id;
	this.name = name;
	this.email = email;
	this.reminderIds = [];

	return this;
}


function nextUserId() {
	return ++userId;
}


function reminder(id, title, desc, userId) {
	this.id = id;
	this.title = title;
	this.description = desc;
	this.userId = userId;
	this.created = new Date();

	return this;
}

function nextReminderId() {
	return ++reminderId;

}
function findUser(userId) {
	var userIds = findUserIndex(userId);
	return users[userIds]
}

function findUserIndex(userId) {
	for(var i=0; i<users.length; i++) {
		if(users[i].id == userId) {
			return i;
		}
	}
}

function findReminderIncicesForUser(userId) {
	var reminderIndices = [];
	for(var i=0; i<reminders.length; i++) {
		if(reminders[i].userId == userId) {
			reminderIndices.push(i);
		}
		return reminderIndices;
	}
}

function findReminderIndex(userId, reminderId) {
	for(var i=0; i<reminders.length; i++) {
		if(reminders[i].id == reminderId && reminders[i].userId == userId) {
			return i;
		}
	}
}

///////////////////////////////////////////////////////////////////////
app.listen(3000, function(req, res) {
	console.log("Listening on PORT 3000")
});

app.get('/', function(req, res) {
	res.send("Server is Running!");
});
	


app.get("/users/:userId", function(req, res) {
	var userId = req.params.userId;
	var paramSearch = req.query.title;
	if (userId === undefined) {
		res.status(404);
	} if (users === undefined) {
		res.status(404);
	  } else 
	  	var userIndex = findUserIndex(userId);
	  	if(userIndex == undefined) {
	  		res.status(404);
	  	} else {
	    	res.status(200).send({"name": users.name, "email": users.email}(users[userIndex]));
	      }  

});


app.get("/users/:userId/reminders", function(req, res) {
	var userId = req.params.userId;
	if (userId === undefined) {
		res.status(404);
	} if (users === undefined) {
		res.status(404);
	  } else 
	  	var userIndex = findUserIndex(userId);
	  	if(userIndex == undefined) {
	  		res.status(404);
	  	} else {
	  		var reminderIndex = findReminderIndex(userId);
	  		if(reminderIndex.length > 0) {
	  			var reminderList = [];
	    		for(var i=0; i < reminderIndex.length; i++) {
	    			var index = reminderIndex[i];
	    			if(paramSearch === undefined) {
	    				reminders.push(reminders[index])
	    			}
	      		}
	      	}
	     }  
});


app.get("/users/:userId/reminders/:reminderId", function(req, res) {
	var userReminder = req.params.userId;
	var reminder = req.params.query.title;
	var hasSearchParam = searchParam !== undefined && searchParam != "";


	if (userId === undefined || findUserId(userId) === undefined) {
		res.status(404);
	} else {
		var reminderList = [];
		for (var i = 0; i < reminderList.length; i++) {
			if (userId == reminderList[i].userId && (!hasSearchParam || searchParam == reminderList[i].title)) {
				reminders.push(reminderOuput(reminderList[i]));
			}
		}
		if (userReminder.length > 0) {
			res.status(200).send(userReminder);
		} else {
			res.status(404);
		}
	}

});

app.post("/users", function(req, res) {
	res.set('Content-Type', 'application/json');
	var users = req.body.users;
	if (users === undefined) {
		res.status(404);
	} else {
		var userIndex = findUserindex(userId);
		if(userIndex == undefined){
			res.status(404);
		} else {
			var newUser = req.body.users;
			var newUserId = nextUserId();
			users.push(new User(newUserId, newUser.name, newUser.email));
			res.status(200).send({"id" : newUserId});
			}
		}
});

app.post("/users/:userId/reminders", function(req, res) {
	res.set('Content-Type', 'application/json');
	var userId = req.params.userId;
	var reminder = req.body.reminder;
	if (reminder === undefined) {
		res.status(404);
	} else {
		var userIndex = findUserindex(userId);
		if(userIndex == undefined){
			res.status(404);
		} else {
			var newReminder = req.body.reminder;
			var newReminderId = nextReminderId();
			reminders.push(new User(newReminderId, newReminder.title, newReminder.description, UserId));
			res.status(200).send({"id" : newReminderId});
			}
		}
});


app.delete("/users/:userId", function(req, res) {
	var userId = req.params.userId;
	if (userId === undefined) {
		res.status(404);
	} else {		
		var userIndex = findUserIndex(userId);
		if (userIndex == undefined) {
			res.status(404);
		} else {
			users.splice(userIndex[i],1);
			}
		res.status(200);
		}
});
	

app.delete("/users/:userId/reminders", function(req, res) {
	var userId = req.params.userId;
	if (userId === undefined) {
		res.status(404);
	} else {		
		var userIndex = findUserIndex(userId);
		if (userIndex == undefined) {
			res.status(404);
		} else {
			users.splice(userIndex,1);
			var userReminderIndex = findReminderIncicesForUser(userId);
			if (userReminderIndex.length > 0) {
				for (var i = userReminderId.length -1; i >= 0; i--) {
				reminders.splice(userReminderIndex[i], 1);
				}
			res.status(204);
			} else {
				res.status(404);
			}
		}
	}
});

app.delete("/users/:userId/reminders/:reminderId", function(req, res) {
	var userId = req.params.userId;
	if (userId === undefined || findUserIndex(userId) === undefined) {
		res.status(404);
	} else {		
		var reminderIndex = findReminderIndex(userId, reminderId);
		if (reminderIndex !== undefined) {
			reminders.splice(reminderId, 1);
			res.status(204);
		} else {
			res.status(404);
		}
	}
});
