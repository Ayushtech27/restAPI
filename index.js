import express from "express";
import bodyParser from "body-parser";

const app = express(); // Making an instance of express
const PORT = 5111;

//Using body-parser as a middleware.
app.use(bodyParser.json()); //Express allows to use body-parser to use in the central place it self and for every request it will do the parsing work.

// Any kind of request made on '/'.
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

  res.status(201).json({
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
    res.json({
      message: "Todo Updated Successfully.",
    });
  } else {
    res.status(400).json({
      message: "Todo id doesn't exists",
    });
  }
});

//DELETE
app.delete("/todos/:id", (req, res) => {
  const todoParamId = req.params.id;
  const todoIndex = todos?.findIndex((td) => td?.id === todoParamId);
  if (todoIndex !== -1) {
    todos.splice(todoIndex, 1); // (start index, number of items)
  }
  res.json({
    message: "Todo Deleted Successfully.",
  });
});
