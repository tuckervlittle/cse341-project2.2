const Movie = require('../models/movies');

const movieCont = {};

// Get all movies
movieCont.getAllMovies = async (req, res) => {
  try {
    const movies = await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get movie by ID
movieCont.getMovieById = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movie.findById(id).populate('genre');
    if (!movie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(400).json({ message: 'Invalid movie ID format', error: error.message });
  }
};

// Create movie
movieCont.createMovie = async (req, res) => {
  const { title, director, releaseYear, runTime, genre, description, watched } = req.body;
  try {
    const newMovie = new Movie({
      title,
      director,
      releaseYear,
      runTime,
      genre,
      description: description || '',
      watched: watched || false,
    });

    const savedMovie = await newMovie.save();
    res.status(201).json({ message: 'Movie created', movie: savedMovie });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update movie
movieCont.updateMovie = async (req, res) => {
  const { id } = req.params;
  const { title, director, releaseYear, runTime, genre, description, watched } = req.body;

  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      id,
      { title, director, releaseYear, runTime, genre, description, watched },
      { new: true, runValidators: true }
    );

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }

    res.status(200).json({ message: 'Movie updated', movie: updatedMovie });
  } catch (error) {
    res.status(400).json({ message: 'Invalid movie ID format', error: error.message });
  }
};

// Delete movie
movieCont.deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedMovie = await Movie.findByIdAndDelete(id);
    if (!deletedMovie) {
      return res.status(404).json({ message: 'Movie not found' });
    }
    res.status(200).json({ message: 'Movie deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid movie ID format', error: error.message });
  }
};

module.exports = movieCont;