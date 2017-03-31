var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var modules = require('./AppModules');
var store = require('./lib/store');

app.use(bodyParser());
store.load();

// Routing //

app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

app.get('/getlayout', function(req, res){
  let m = modules.getDemoModules();
  res.send(m);
});

app.post('/adduser', function(req, res){
  console.log("add user request");
  let newUser = store.addUser(req.body.name, req.body.type, req.body.doors);
  io.emit('user added', newUser); // broadcase the new user
  let response = {
    message: "user " + newUser.User +" was added.",
    user: newUser
  }
  res.send(response);
});

// Socket tapping //

io.on('connection', function(socket){
  console.log('a user connected');
  // sending the current data
  socket.emit('data:users', store.users);
  socket.emit('data:doors', store.doors);
  socket.emit('data:buildings', store.buildings);
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});

// initialize //

http.listen(3000, function(){
  console.log('listening on *:3000');
});