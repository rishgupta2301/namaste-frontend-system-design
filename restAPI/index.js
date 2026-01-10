import express from 'express';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json()); // this will stringify the incoming request body

const PORT = 5111;

const todos = [{
    id:1,
    title:'Fist todo',
    completed: false,
}, {
    id:2,
    title: 'Second todo',
    completed:true,
}]

// READ
app.get('/todos', (req,res) => {
    res.json(todos);
})

// CREATE
app.post('/todos', (req,res) => {
    const newTodo = req.body; // newTodo will be stringified by body-parser
    todos.push(newTodo);
    res.json({
        message:"Todo Added Successfully!",
    });
})

// UPDATE
app.put('/todos/:id', (req,res) => {
    const newTodo = req.body;
    const todoId = Number(req.params.id);
    const todoIndex = todos.findIndex(td => td.id === todoId);
    if(todoIndex !== -1){
        todos[todoIndex] = {
            id: todoId,
            ...newTodo,
        }
        res.json({
            message: "Todo Updated Successfully!",
        });
    } else {
        res.status(400).json({
            message: "Todo Id Not Found!",
        });
}
})

// PATCH
app.patch('/todos/:id', (req,res) => {
    const todoId = Number(req.params.id);
    const newTodoData = req.body;
    const todoIndex = todos.findIndex(td => td.id === todoId);
    if(todoIndex === -1){
        res.json({
            message: "Todo Not Found!",
        });
        return;
    }
    const existingTodo = todos[todoIndex];
    const updatedTodo = {
        ...existingTodo,
        ...newTodoData,
    }
    console.log("Updated Todo: ", updatedTodo);
    todos[todoIndex] = updatedTodo;
    res.json({
        message: "Todo Patched Successfully!",
    });
})

// DELETE
app.delete("/todos/:id", (req,res) => {
    const todoId = Number(req.params.id);
    if(todoId !== -1){
     todos.splice(todoId, 1);
    }
    res.json({
        message: "Todo Deleted Successfully!",
    });
})



app.all('/', (req, res) => {
    // console.log("Request > ", req);
    // console.log("Response > ", res);
    res.send("Hi I'm up!")
})

app.listen(PORT, (req, res) => {
    console.log(`Successfully connected to the port ${PORT}`)
})