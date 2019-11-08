
//-------------------------[Connection]--------------------------------
const express = require('express');
const server = express();

server.use(express.json())

const project = [];
var cont = 0;

//----------------------[Middleware Local]-------------------------------

function chekUserExists(req, res, next)
{
  const index = req.params.id;
  if(!project[index]) 
  {
    return res.status(400).json({ error: 'Project does not existis'  });
  }

  return next()
}
//----------------------[Middleware Global]-------------------------------

server.use((req, res, next) => {
  console.log("+ request")
  cont = cont + 1

  return next()
})

//--------------------------[ROTAS]--------------------------------------
server.post('/projects', (req, res) => {
  var base = { id: "", title: "", tasks: [] };

  base.id = req.body.id;
  base.title = req.body.title;
  base.tasks = req.body.tasks;

  project.push(base);

  return res.json(project);
})

server.get('/projects', (req, res) => {
  return res.json(project);
})

server.put('/projects/:id', chekUserExists, (req, res) => {
  var index = req.params.id
  var title = req.body.title;
  project[index].title = title;

  return res.json(project[index]);
})

server.delete('/projects/:id', chekUserExists, (req, res) => {
  var index = req.params.id;
  project.splice(index, 1);

  return res.json(project)
})

server.post('/projects/:id/tasks', chekUserExists, (req, res) =>{
  var index = req.params.id;
  var tasks = req.body.tasks;
  project[index].tasks.push(tasks);

  return res.json(project)
})

server.listen(3000);



