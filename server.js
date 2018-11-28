const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');
app.locals.projects = [];
app.locals.palettes = [ { id: 2, title: 'ass', project_id: 11 }, { id: 23, title: 'kick ass', project_id: 9 } ];

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker'

app.use(express.static('public'))

app.get('/api/v1/projects', (request, response) => {
  const projects = app.locals.projects
  return response.json({ projects })
})

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  const project = app.locals.projects.find(proj => proj.id === id);
  
  if (project) {
    return response.status(200).json(project)
  } else {
    return response.sendStatus(404)
  }
})

app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  const project_id = parseInt(request.params.project_id)
 
  const palettes = app.locals.palettes.filter(palette => palette.project_id === project_id);

  return response.json({ palettes })
})

app.post('/api/v1/projects', (request, response) => {
  const id = uuidv4()
  const project = request.body;

  if (!project) {
    return response.status(422).send({
      error: 'No project title provided'
    })
  } else {
    app.locals.projects.push({ id, ...project });
    return response.status(201).json({ id, ...project })
  }
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
})
