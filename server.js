const express = require('express');
const app = express();
const port = 5000;

const ideas = [
  {
    id: 1,
    text: 'Positive NewsLetter, a newsletter that only shares positive, uplifting news',
    tag: 'Technology',
    username: 'TonyStark',
    date: '2022-01-02',
  },
  {
    id: 2,
    text: 'Milk cartons that turn a different color the older that your milk is getting',
    tag: 'Inventions',
    username: 'SteveRogers',
    date: '2022-01-02',
  },
  {
    id: 3,
    text: 'ATM location app which lets you know where the closest ATM is and if it is in service',
    tag: 'Software',
    username: 'BruceBanner',
    date: '2022-01-02',
  },
];

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RandomIdeas application' });
});

// get all ideas
app.get('/api/ideas', (req, res) => {
  res.send({ success: true, data: ideas });
});

// get a single idea using an id
app.get('/api/ideas/:id', (req, res) => {
  const idea = ideas.find((idea) => idea.id === +req.params.id);

  if (!idea) {
    return res
      .status(404)
      .send({ success: false, message: 'Something went wrong!' });
  }

  res.send({ success: true, data: idea });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));