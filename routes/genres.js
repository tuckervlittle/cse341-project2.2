const router = require('express').Router();

const genreController = require('../controllers/genreController');
const { isAuthenticated } = require('../middleware/authenticate');


/* *****************
 * Public routes
 * *****************/

// GET /genres
router.get('/',
  // #swagger.tags = ['Genres']
  // #swagger.description = 'Get all genres'
  /* #swagger.responses[200] = {
      description: 'List of genres',
      schema: [{ $ref: '#/definitions/UpdatedGenre' }]
  } */
  genreController.getAllGenres);

// GET /genres/{id}
router.get('/:id',
  // #swagger.tags = ['Genres']
  // #swagger.description = 'Get genre by id'
  // #swagger.parameters['id'] = { description: 'Genre ID', required: true }
  /* #swagger.responses[200] = {
      description: 'A Genre object',
      schema: { $ref: '#/definitions/UpdatedGenre' }
  } */
  genreController.getGenreById);


/* *****************
 * Will be protected routes
 * *****************/

// POST /genres
router.post('/',
  // #swagger.tags = ['Genres']
  // #swagger.description = 'Create a new genre (protected)'
  // #swagger.security = [{ "cookieAuth": [] }]
  /* #swagger.parameters['newGenre'] = {
      in: 'body',
      description: 'Genre to create',
      required: true,
      schema: { $ref: '#/definitions/Genre' }
  } */
  /* #swagger.responses[201] = {
      description: 'Genre created',
      schema: { $ref: '#/definitions/Genre' }
  } */
  isAuthenticated,
  genreController.createGenre);

// PUT /genres/{id}
router.put('/:id',
  // #swagger.tags = ['Genres']
  // #swagger.description = 'Update a genre by id (protected)'
  // #swagger.security = [{ "cookieAuth": [] }]'
  // #swagger.parameters['id'] = { description: 'Genre ID', required: true }
  /* #swagger.parameters['genre'] = {
      in: 'body',
      description: 'Fields to update',
      required: true,
      schema: { $ref: '#/definitions/UpdatedGenre' }
  } */
  isAuthenticated,
  genreController.updateGenre);

// DELETE /genres/{id}
router.delete('/:id',
  // #swagger.tags = ['Genres']
  // #swagger.description = 'Delete genre by id (protected)'
  // #swagger.security = [{ "cookieAuth": [] }]'
  // #swagger.parameters['id'] = { description: 'Genre ID', required: true }
  isAuthenticated,
  genreController.deleteGenre);

module.exports = router;