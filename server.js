var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1;

app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('todo API root');
});

// GET /todos?completed=true&q=work
app.get('/todos', function (request, response) {
    var queryParams = request.query;
    var filteredTodos = todos;
    
    if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'true' ) {
        filteredTodos = _.where(filteredTodos, {completed: true});
    } else if (queryParams.hasOwnProperty('completed') && queryParams.completed === 'false') {
        filteredTodos = _.where(filteredTodos, {completed: false});
    }

    if (queryParams.hasOwnProperty('description') && queryParams.description.length > 0) {
        filteredTodos = _.filter(filteredTodos, function (todo) {
            return todo.description.toLowerCase().indexOf(queryParams.description.toLowerCase()) > -1;
        });
    } 

    response.json(filteredTodos);
});

// GET /todos/:id
app.get('/todos/:id', function(request, response) {
    var todoID = parseInt(request.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoID});

    if (matchedTodo) {
        response.json(matchedTodo);
    } else {
        response.status(404).send();
    }
});

// POST /todos
app.post('/todos', function (request, response) {
    var body = _.pick(request.body, 'description', 'completed') ;

    if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
        return response.status(400).send();      
    }

    body.description = body.description.trim();

    // add id field
    body.id = todoNextID++;

    // push body into array
    todos.push(body);

    response.json(body);
});

// DELETE /todos/:id
app.delete('/todos/:id', function (request, response) {
    var todoID = parseInt(request.params.id, 10);
    var matchedTodo = _.findWhere(todos, {id: todoID});

    if (!matchedTodo) {
        response.status(404).json({"error": "no todo found with that id"});
    } else {
        todos =  _.without(todos, matchedTodo)  
        response.json(todos);
    }
});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!')
});