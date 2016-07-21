var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextID = 1;

app.use(bodyParser.json());

app.get('/', function (request, response) {
    response.send('todo API root');
});

// GET /todos
app.get('/todos', function (request, response) {
    // response.send(JSON.stringify(todos));
    response.json(todos);
});

// GET /todos/:id
app.get('/todos/:id', function(request, response) {
    var todoID = parseInt(request.params.id, 10);
    var matchedTodo;

    todos.forEach(function(todo) {
        if (todo.id === todoID) {
            matchedTodo = todo;
        }
    });

    if (matchedTodo) {
        response.json(matchedTodo);
    } else {
        response.status(404).send();
    }
});

// POST /todos
app.post('/todos', function (request, response) {
    var body = request.body;

    // add id field
    body.id = todoNextID++;

    // push body into array
    todos.push(request.body);
    console.log(todos);
});

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!')
});