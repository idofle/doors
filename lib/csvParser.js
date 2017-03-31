var fs = require('fs');

class CsvParser{

	parse(path, columns){
		let p = new Promise((resolve, reject) => {
		  this.readFile(path).then(data => {
				let parsedData = this.csvToJson(data, columns);
				resolve(parsedData);
		  });
		});
		
		return p;


		let s = readFile(path);
		
		return csvToJson(s, columns);
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

	csvToJson(s, columns){
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

module.exports = new CsvParser();