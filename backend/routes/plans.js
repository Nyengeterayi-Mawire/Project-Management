const router = require('express').Router();
const {getPlans,create,remove,update} = require('../controllers/plans');
const {middleware,verifyToken} = require('../middlewares/middleware');

router.post('/:id',middleware,verifyToken,getPlans);
router.post('/create/:id',middleware,verifyToken,create);
router.delete('/:id',middleware,verifyToken,remove);
router.patch('/update/:id',middleware,verifyToken,update);

module.exports = router;