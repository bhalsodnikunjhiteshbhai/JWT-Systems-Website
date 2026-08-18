const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/notes_app')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

app.use('/auth', authRoutes);

app.listen(5000, () => console.log('Server started on port 5000'));
