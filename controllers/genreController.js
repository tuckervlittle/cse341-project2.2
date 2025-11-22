const Genre = require('../models/genres');

const genreCont = {};

// Get all genres
genreCont.getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find();
    res.status(200).json(genres);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get genre by ID
genreCont.getGenreById = async (req, res) => {
  const { id } = req.params;
  try {
    const genre = await Genre.findById(id);
    if (!genre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json(genre);
  } catch (error) {
    res.status(400).json({ message: 'Invalid genre ID format', error: error.message });
  }
};

// Create a new genre
genreCont.createGenre = async (req, res) => {
  const { name, description } = req.body;
  try {
    const newGenre = new Genre({ name, description });
    const savedGenre = await newGenre.save();
    res.status(201).json({ message: 'Genre created', genre: savedGenre });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update a genre
genreCont.updateGenre = async (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;

  try {
    const updatedGenre = await Genre.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );
    if (!updatedGenre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json({ message: 'Genre updated', genre: updatedGenre });
  } catch (error) {
    res.status(400).json({ message: 'Invalid genre ID format', error: error.message });
  }
};

// Delete a genre
genreCont.deleteGenre = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedGenre = await Genre.findByIdAndDelete(id);
    if (!deletedGenre) {
      return res.status(404).json({ message: 'Genre not found' });
    }
    res.status(200).json({ message: 'Genre deleted' });
  } catch (error) {
    res.status(400).json({ message: 'Invalid genre ID format', error: error.message });
  }
};

module.exports = genreCont;