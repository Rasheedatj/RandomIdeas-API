const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');
const path = require('path');

// static folder
app.use(express.static(path.join(__dirname, 'public')));

connectDB();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: ['http://localhost:5000', 'http://localhost:3000'],
    credentials: true,
  })
);

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RandomIdeas application' });
});

const ideasRouter = require('./Routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
