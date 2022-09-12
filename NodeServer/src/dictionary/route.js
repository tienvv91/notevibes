const router = require('@root/async-router').Router();
const controller = require('./controller');

router.route('/dictionaries')
    .get(controller.queryClasses)
    .post(controller.create)

router.route('/dictionaries/:id')
    .get(controller.getObject)
    .patch(controller.update)
    .delete(controller.deleteObject);

router.route('/translate')
    .get(controller.translate)

module.exports = router;