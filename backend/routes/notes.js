const router = require('express').Router();
const {getNotes,create,remove,update} = require('../controllers/notes');
const {middleware,verifyToken} = require('../middlewares/middleware');

router.get('/:id',middleware,verifyToken,getNotes);
router.post('/create',middleware,verifyToken,create);
router.delete('/remove/:id',middleware,verifyToken,remove);
router.patch('/update/:id',middleware,verifyToken,update);

module.exports = router;
