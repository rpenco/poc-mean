var Todo = require('./models/todo');

// usefull function ------------------------------------------------------------

function getTodos(res){
	Todo.find(function(err, todos) {			// use mongoose to get all todos in the database
			if (err)
				res.send(err)

			res.json(todos); 					// return all todos in JSON format
		});
};

function badRequest(res){
	res.send(400);	
};

// exports routes --------------------------------------------------------------

module.exports = function(app) {

	// api ---------------------------------------------------------------------

	// get all todos
	app.get('/api/todos', function(req, res) {
		getTodos(res);
	});

	// create new todo and send back all todos after creation
	app.post('/api/todos', function(req, res) {

		var body  = req.body;

		if(!body.text || body.text == ''){		// empty todo
			badRequest(res);					// bad request
			return;
		}

		Todo.create({
			text : body.text,				// information comes from request from Angular
		}, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);						// return all the todos after create
		});

	});
	
	// update a todo
	app.put('/api/todos/:todo_id', function(req, res) {
 
 		//Get data to update
		var data = req.body;
		
		if(!data.text && !data.done ){			// bad update todo
			badRequest(res);					// bad request
			return;
		}

		if(data.text && data.text == ''){		// bad text
			badRequest(res);					// bad request
			return;
		}

		if(data.done && 
			(data.done !== true 
				&& data.done !== false)){		// bad done (not boolean)
			badRequest(res);					// bad request
			return;
		}

		Todo.update({_id: req.params.todo_id}, data, function(err, todo) {
			if (err)
				res.send(err);

			getTodos(res);
		});
	});

	// delete a todo
	app.delete('/api/todos/:todo_id', function(req, res) {

		Todo.remove({
			_id : req.params.todo_id
		
		}, function(err, nb) {
			if (err)
				res.send(err);
			
			getTodos(res);
		});
	});

	// web application (AngularJS) ---------------------------------------------

	app.get('*', function(req, res) {
		res.sendfile('./public/index.html'); 	// load the single page application file
	});
};