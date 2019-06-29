const express = require("express");

const server = express();

server.use(express.json());

const projects = [
  {
    id: "1",
    title: "Novo Projeto",
    tasks: ["Nova Tarefa"]
  }
];

function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(project => id === project.id);

  if (!project) {
    return res.status(400).json({ error: "Project not found" });
  }

  req.project = project;

  return next();
}

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.get("/projects/:id", checkProjectExists, (req, res) => {
  res.json(req.project);
});

server.post("/projects", (req, res) => {
  const { id, title } = req.body;
  const project = {
    id: id,
    title: title,
    tasks: []
  };

  projects.push(project);

  return res.json(projects);
});

server.put("/projects/:id", checkProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.title = title;

  return res.json(req.project);
});

server.delete("/projects/:id", checkProjectExists, (req, res) => {
  const index = projects.indexOf(req.project);

  projects.splice(index, 1);

  return res.json({ message: "Deleted Successfully" });
});

server.post("/projects/:id/tasks", checkProjectExists, (req, res) => {
  const { title } = req.body;

  req.project.tasks.push(title);

  return res.json(req.project);
});

server.listen(3333);
