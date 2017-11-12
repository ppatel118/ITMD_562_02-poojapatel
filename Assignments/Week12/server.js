var express = require('express');
var http = require('http');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var users = [];
var userIds = 0;
var reminderIds = 0;

function User(id, name, email) {
  this.id = id;
  this.name = name;
  this.email = email;
  this.reminders = [];
  return this;
}

function nextUserId() {
  return ++userIds;
}

function Reminder(id, title, desc) {
  this.id = id;
  this.title = title;
  this.description = desc;
  this.created = new Date();

  return this;
}

function nextReminderId() {
  return ++reminderIds;
}

function findUser(userId) {
  var userIds = findUserIndex(userId);
  return users[userIds];
}

function findUserIndex(userId) {
  for (var i = 0; i < users.length; i++) {
    if (users[i].id == userId) {
      return i;
    }
  }
}

function findReminderIndex(userIndex, reminderId) {
  var reminders = users[userIndex].reminders;
  for (var i = 0; i < reminders.length; i++) {
    if (reminders[i].id == reminderId) {
      return i;
    }
  }
}

function findRemindersByTitle(userIndex, title) {
  var reminders = users[userIndex].reminders;
  var reqReminders = [];
  for (var i = 0; i < reminders.length; i++) {
    if (reminders[i].title == title) {
      reqReminders.push(reminders[i]);
    }
  }
  return reqReminders;
}

///////////////////////////////////////////////////////////////////////
app.listen(3000, function(req, res) {
  console.log('Listening on PORT 3000');
});

app.get('/', function(req, res) {
  res.send('Server is Running!');
});

app.get('/users/:userId', function(req, res) {
  var userId = req.params.userId;
  if (userId === undefined || users === undefined) {
    res.status(404).send();
  } else {
    var userIndex = findUserIndex(userId);
    if (userIndex === undefined) {
      res.status(404).send();
    } else {
      var matchUser = users[userIndex];
      res.status(200).send({
        name: matchUser.name,
        email: matchUser.email,
        reminders: matchUser.reminders
      });
    }
  }
});

app.get('/users/:userId/reminders', function(req, res) {
  var userId = req.params.userId;
  var title = req.query.title;
  var userIndex = findUserIndex(userId);
  if (userId === undefined) {
    res.status(404).send();
  } else {
    if (title === undefined) {
      res.status(200).send(users[userIndex].reminders);
    } else {
      var requiredReminder = findRemindersByTitle(userIndex, title);
      if (requiredReminder.length > 0) {
        res.status(200).send(requiredReminder);
      } else {
        res.status(400).send();
      }
    }
  }
});

app.get('/users/:userId/reminders/:reminderId', function(req, res) {
  var userId = req.params.userId;
  var reminderId = req.params.reminderId;
  var userIndex = findUserIndex(userId);
  if (userId === undefined || userIndex === undefined) {
    res.status(404).send();
  } else {
    var reminderIndex = findReminderIndex(userIndex, reminderId);
    if (reminderIndex !== undefined) {
      res.status(200).send(users[userIndex].reminders[reminderIndex]);
    } else {
      res.status(404).send();
    }
  }
});

app.post('/users', function(req, res) {
  res.set('Content-Type', 'application/json');
  var user = req.body.user;
  if (user === undefined) {
    res.status(404).send();
  } else {
    var newUser = user;
    var newUserId = nextUserId();
    users.push(new User(newUserId, newUser.name, newUser.email));
    res.status(200).send({
      id: newUserId
    });
  }
});

app.post('/users/:userId/reminders', function(req, res) {
  res.set('Content-Type', 'application/json');
  var userId = req.params.userId;
  var newReminder = req.body.reminder;
  if (newReminder === undefined) {
    res.status(404).send();
  } else {
    var userIndex = findUserIndex(userId);
    if (userIndex === undefined) {
      res.status(404).send();
    } else {
      var newReminderId = nextReminderId();
      users[userIndex].reminders.push(new Reminder(newReminderId, newReminder.title, newReminder.description));
      res.status(200).send({ id: newReminderId });
    }
  }
});

app.delete('/users/:userId', function(req, res) {
  var userId = req.params.userId;
  if (userId === undefined) {
    res.status(404).send();
  } else {
    var userIndex = findUserIndex(userId);
    if (userIndex === undefined) {
      res.status(404).send();
    } else {
      users.splice(userIndex, 1);
      res.status(204).send();
    }
  }
});

app.delete('/users/:userId/reminders', function(req, res) {
  var userId = req.params.userId;
  if (userId === undefined) {
    res.status(404).send();
  } else {
    var userIndex = findUserIndex(userId);
    if (userIndex === undefined) {
      res.status(404).send();
    } else {
      users[userIndex].reminders = [];
      res.status(204).send();
    }
  }
});

app.delete('/users/:userId/reminders/:reminderId', function(req, res) {
  var userId = req.params.userId;
  var reminderId = req.params.reminderId;
  var userIndex = findUserIndex(userId);
  if (userId === undefined || userIndex === undefined) {
    res.status(404).send();
  } else {
    var reminderIndex = findReminderIndex(userIndex, reminderId);
    if (reminderIndex !== undefined) {
      users[userIndex].reminders.splice(reminderIndex, 1);
      res.status(204).send();
    } else {
      res.status(404).send();
    }
  }
});
