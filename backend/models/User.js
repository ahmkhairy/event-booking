const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'normal'
  },
  tickets: [{
    event: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    },
    purchaseDate: Date
  }]
});

UserSchema.pre('save', async function(next) {
  next();
});

module.exports = mongoose.model('User', UserSchema);
