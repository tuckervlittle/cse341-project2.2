const router = require('express').Router();

const movieController = require('../controllers/movieController');
// const { isAuthenticated } = require('../middleware/authenticate');


/* *****************
 * Public routes
 * *****************/

// GET /movies
router.get('/',
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Get all movies.'
  /* #swagger.responses[200] = {
      description: 'List of movies',
      schema: [{ $ref: '#/definitions/Movie' }]
  } */
  movieController.getAllMovies);


// GET /movies/{id}
router.get('/:id',
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Get movie by id'
  // #swagger.parameters['id'] = { description: 'Movie ID (ObjectId)', required: true }
  /* #swagger.responses[200] = {
      description: 'A movie object',
      schema: { $ref: '#/definitions/UpdatedMovie' }
  } */
  movieController.getMovieById);


/* *****************
* Will be protected routes
* *****************/

// POST /movies
router.post('/',
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Create a new movie (protected)'
  /* #swagger.parameters['newMovie'] = {
      in: 'body',
      description: 'New movie object',
      required: true,
      schema: { $ref: '#/definitions/Movie' }
  } */
  /* #swagger.responses[201] = {
      description: 'Movie created',
      schema: { $ref: '#/definitions/Movie' }
  } */
  movieController.createMovie);

// PUT /movies/{id}
router.put('/:id',
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Update movie by id (protected)'
  // #swagger.parameters['id'] = { description: 'Movie ID', required: true }
  /* #swagger.parameters['movie'] = {
      in: 'body',
      description: 'Fields to update',
      required: true,
      schema: { $ref: '#/definitions/UpdatedMovie' }
  } */
  movieController.updateMovie);

// DELETE /movies/{id}
router.delete('/:id',
  // #swagger.tags = ['Movies']
  // #swagger.description = 'Delete movie by id (protected)'
  // #swagger.parameters['id'] = { description: 'Movie ID', required: true }
  movieController.deleteMovie);

module.exports = router;