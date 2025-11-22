const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title is required'],
    trim: true,
  },
  director: {
    type: String,
    default: null,
  },
  releaseYear: {
    type: Number,
    default: null,
    min: [1888, 'The first movie was released in 1888. The release year must not be earlier than 1888.']
  },
  runTime: {
    type: Number,
    default: null,
  },
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre',
    required: [true, 'Genre is required'],
  },
  description: {
    type: String,
    default: null,
  },
  watched: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model('Movie', movieSchema);