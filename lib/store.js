var fs = require('fs');
var CsvParser = require('./csvParser');


class Store{

	constructor(){
		this.USERS_COLUMNS = ["Id","User","Type","DoorAccess"];
		this.DOORS_COLUMNS = ["Id","DoorName","Type","Building"];
		this.BUILDINGS_COLUMNS = ["Id","Name","Address"];

		this.users = [];
		this.doors = [];
		this.buildings = [];
	}

	load(){
		CsvParser.parse('./data/users.csv', this.USERS_COLUMNS).then(data => {
			this.users = data
			console.log("Data: users loaded");
		});

		CsvParser.parse('./data/doors.csv', this.DOORS_COLUMNS).then(data => {
			this.doors = data;
			console.log("Data: doors loaded");
		});

		CsvParser.parse('./data/users.csv', this.BUILDINGS_COLUMNS).then(data => {
			this.buildings = data
			console.log("Data: buildings loaded");
		});

		// this.readFile('./data/users.csv').then(data => {
		// 	this.users = this.parseCSV(data, this.USERS_COLUMNS);
		// 	console.log("Data: users loaded");
		// });

		// this.readFile('./data/doors.csv').then(data => {
		// 	this.doors = this.parseCSV(data, this.DOORS_COLUMNS);
		// 	console.log("Data: doors loaded");
		// });

		// this.readFile('./data/buildings.csv').then(data => {
		// 	this.buildings = this.parseCSV(data, this.BUILDINGS_COLUMNS);
		// 	console.log("Data: buildings loaded");
		// });
	}

	addUser(name, type, doorId){
		// Not completely implemented
		// Not checking duplicates for this challange. But it would have been better to have a dictionary of users by email
		let newUser = {
			Id: "XXX", // for now
			User: name,
			Type: "user",
			Email: "XXX@bla.com",
			DoorAccess: doorId // technically can add door access to the same user, but again, not implemented.
		};
		this.users.push(newUser);
		return newUser;
	}

	readFile(path){
		let p = new Promise((resolve, reject) => {
		  fs.readFile(path, 'utf8', function(err, data) {  
   			if (err) console.log(err);
    		resolve(data);
		  });
		});
		
		return p;
	}

	parseCSV(s, columns){
		// this method is not complete: (This will do for the purpose of the tutorial)
		// really not efficient. 
		// Not streaming (for big files)
		// can't handle ',' in the data 
	  	let objects = [];

	  	var lines = s.replace(/\r/g,'').split('\n');
	  	for (var i = 1; i < lines.length; i++) {
	  		var props = lines[i].split(',');
	  		var object = {};
	  		for (var j = 0; j < props.length; j++) {
	  			object[columns[j]] = props[j];
	  		}
	  		objects.push(object);
	  	}

	  	return objects;
	 }
}

module.exports = new Store();