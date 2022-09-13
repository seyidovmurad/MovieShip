const router = require('express').Router();
const auth = require('../middleware/auth')
const { admin } = require('../middleware/role');
const { valId, validGenre } = require('../middleware/validation');

const GenreController = require('../controller/gerne.controller');


const Genre = require('../models/genre.model');
router.get('/', GenreController.getAll);

router.get('/:id', [valId], GenreController.getById);

router.post('/', [auth, admin, validGenre], GenreController.addGenre);

router.put('/:id', [auth, admin, valId, validGenre], GenreController.updateById);

router.delete('/:id', [auth, admin, valId], GenreController.deleteById);

module.exports = router;