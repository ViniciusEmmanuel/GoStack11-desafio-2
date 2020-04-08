const express = require('express');
const cors = require('cors');

const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

const validateUuid = (request, response, next) => {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Repository Id not found.' });
  }

  return next();
};

app.get('/repositories', (request, response) => {
  // TODO
  const { title } = request.query;

  if (title) {
    const result = repositories.filter((item) => item.title.includes(title));

    return response.status(200).json(result);
  }

  return response.status(200).json(repositories);
});

app.post('/repositories', (request, response) => {
  // TODO

  const { title, url, techs } = request.body;

  const repositorie = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repositorie);

  return response.status(200).json(repositorie);
});

app.put('/repositories/:id', validateUuid, (request, response) => {
  // TODO
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorieIndex = repositories.findIndex((item) => item.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const repositorie = repositories[repositorieIndex];

  const updateRepositorie = { ...repositorie, title, url, techs };

  repositories[repositorieIndex] = updateRepositorie;

  return response.status(200).json(updateRepositorie);
});

app.delete('/repositories/:id', validateUuid, (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex((item) => item.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post('/repositories/:id/like', validateUuid, (request, response) => {
  // TODO
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex((item) => item.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({ error: 'Project not found.' });
  }

  const repositorie = repositories[repositorieIndex];

  const updateRepositorie = { ...repositorie, likes: repositorie.likes + 1 };

  repositories[repositorieIndex] = updateRepositorie;

  return response.status(200).json(updateRepositorie);
});

module.exports = app;
