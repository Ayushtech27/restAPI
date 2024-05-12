import express from "express";
import bodyParser from "body-parser";

const app = express(); // Making an instance of express
const PORT = 5111;
app.use(bodyParser.json());

app.all("/", (req, res) => {
  console.log("Request > ", req);
  console.log("Response > ", res);
  res.send("I'm up!");
});

// Listening to the app
app.listen(PORT, () => {
  console.log(`Server is running at port ${PORT}`);
});

const todos = [
  {
    id: "1",
    title: "Task 1",
    completed: false,
  },
  {
    id: "2",
    title: "Task 2",
    completed: true,
  },
];

// READ
app.get("/todos", (req, res) => {
  res.json(todos);
});

//CREATE
app.post("/todos", (req, res) => {
  const newTodo = req.body;
  todos.push(newTodo);

  res.json({
    message: "new todo Added",
  });
});

//UPDATE
app.put("/todos/:id", (req, res) => {
  const newTodoData = req.body;
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);
  if (newTodoData !== -1) {
    todos[todoIndex] = {
      id: todoParamId,
      ...newTodoData,
    };
  }
  res.json({
    message: "Todo Updated Successfully.",
  });
});

//DELETE
app.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos.findIndex((td) => td.id === todoParamId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1);
  }
  res.json({
    message: "Todo Deleted Successfully.",
  });
});
