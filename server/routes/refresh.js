const router = require('express').Router();
const refreshController = require('../controller/refresh.controller');

router.get('/', refreshController.handleRefreshToken);

module.exports = router;