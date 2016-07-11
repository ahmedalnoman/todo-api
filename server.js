var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
    id: 1,
    description: 'meet mom for lunch',
    completed: false,
}, {
    id: 2,
    description: 'go to market',
    completed: false
}, {
    id: 3,
    description: 'take zane to the park',
    completed: true
}];

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

app.listen(PORT, function () {
    console.log('Express listening on port ' + PORT + '!')
});