const router = require('@root/async-router').Router();
const controller = require('./controller');
router.route('/text2speech')
    .get(controller.getTextToSpeech)
    .post(controller.textToSpeech);


router.route('/translate')
    .post(controller.translate);

module.exports = router;