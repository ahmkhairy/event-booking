const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  tickets: {
    type: Number,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  active: {
    type: Boolean,
    default: true,
  }
});

module.exports = mongoose.model('Event', EventSchema);
