const express = require('express');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;
const connectDB = require('./config/db');

connectDB();
// Body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send({ message: 'Welcome to the RandomIdeas application' });
});

const ideasRouter = require('./Routes/ideas');
app.use('/api/ideas', ideasRouter);

app.listen(port, () => console.log(`Server listening on port ${port}`));
