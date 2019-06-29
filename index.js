const express = require("express");

const server = express();

const projects = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: ["Nova Tarefa"]
  }
];

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.listen(3333);
