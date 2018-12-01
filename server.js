const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const uuidv4 = require('uuid/v4');
const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

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
  
  database('projects').where('id', id).select()
    .then((projects) => {
      response.status(200).json(projects);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
});

app.get('/api/v1/palettes/:project_id', (request, response) => {
  const project_id = parseInt(request.params.project_id)
  
  database('palettes').where('project_id', project_id).select()
    .then((palettes) => {
      response.status(200).json(palettes);
    })
    .catch((error) => {
      response.status(500).json({ error });
    })
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

app.post('/api/v1/palettes', (request, response) => {
  const project_id = parseInt(request.params.project_id)
  const palette = request.body;
  
  for (let requiredParameter of [ 'color1', 'color2', 'color3', 'color4', 'color5', 'project_id' ]) {
    if(!palette[requiredParameter]) {
      return response
        .status(422)
        .send({ error: `Expected format: { color1: <String>, color2: <String>, color3: <String>, color4: <String>, color5: <String>, project_id: <Number> }.  You're missing a "${requiredParameter}" property.` })
    }
  }

  database('palettes').insert(palette, 'id')
    .then(palette => {
      response.status(201).json({ id: palette[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
});

app.delete('/api/v1/palettes/:id', (request, response) => {
  const { id } = request.params

  database('palettes').where('id', id).del()
   .then(() => {
     response.status(200).json({ message: `Palette #${id} successfully removed.` })
   })
   .catch(error => {
     response.status(500).json({ error })
   })
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`)
});
