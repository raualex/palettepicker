const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
app.locals.projects = [];
app.locals.palettes = [];

app.use(bodyParser.json());
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Palette Picker'

app.use(express.static('public'))

app.get('/api/v1/projects', (request, response) => {
  database('projects').select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/projects/:id', (request, response) => {
  const { id } = request.params
  const project = app.locals.projects.find(proj => proj.id === id);
  
  if (project) {
    return response.status(200).json(project)
  } else {
    return response.sendStatus(404)
  }
});

app.get('/api/v1/projects/:project_id/palettes', (request, response) => {
  const project_id = parseInt(request.params.project_id)
  const palettes = app.locals.palettes.filter(palette => palette.project_id === project_id);
  
  return response.json({ palettes });
});

app.post('/api/v1/projects/:project_id/palettes', (request, response) => {
  const project_id = parseInt(request.params.project_id)
  const id = uuidv4()
  const palette = request.body;
  
  app.locals.palettes.push({ id, ...palette, project_id });
  return response.status(201).json({ id, ...palette, project_id });
});

app.post('/api/v1/projects', (request, response) => {
  const project = request.body;

  for (let requiredParameter of [ 'title' ]) {
    if (!project[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { title: <String> }.  You're missing a "${requiredParameter}" property.` })
    }
  }

  database('projects').insert(project, 'id')
    .then(project => {
      response.status(201).json({ id: project[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});
