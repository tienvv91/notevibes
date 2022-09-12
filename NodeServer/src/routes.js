const express = require('express');

const router = express.Router();
router.use(require('./Text2Speech/route'))
router.use(require('./stores/route'))
router.use(require('./dictionary/route'))
module.exports = router;