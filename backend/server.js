const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const app = express();

dotenv.config();
app.use(cors());
app.use(express.json());

const userRoutes = require('./routes/users');
const eventRoutes = require('./routes/events');

app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);

const PORT = process.env.PORT || 3000;

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => console.error('Error connecting to MongoDB:', err));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
