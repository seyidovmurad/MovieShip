const router = require('express').Router();
const auth = require('../middleware/auth');
const { admin } = require('../middleware/role');
const { validMovie, valId } = require('../middleware/validation');

const MovieController = require('../controller/movie.controller');

router.get('/', MovieController.getAll);

router.get('/page/:page', MovieController.getAllByPage);

router.get('/:id', valId, MovieController.getById);

router.delete('/:id', [ valId ], MovieController.deleteById);

router.put('/:id', [ valId, validMovie], MovieController.updateById);

router.post('/', [auth, admin, validMovie], MovieController.addMovie);

module.exports = router;