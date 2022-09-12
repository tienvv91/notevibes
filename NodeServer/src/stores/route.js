const router = require('@root/async-router').Router();
const controller = require('./controller');
const uploadStorage = require('../middlewares/upload')

router.route('/stores')
    .get(controller.queryClasses)
    .post(controller.create)

router.route('/stores/:id')
    .get(controller.getObject)
    .patch(controller.update)
    .delete(controller.deleteObject);

    router.route('/stores/import-from-file')
    .post(uploadStorage.single('file'), controller.importFromExcel);

module.exports = router;