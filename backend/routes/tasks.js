const router = require('express').Router();
const {allTasks,singleTask,create,remove,update,statistics} = require('../controllers/tasks');
const {middleware,verifyToken} = require('../middlewares/middleware');

router.get('/:id',middleware,verifyToken,allTasks);
router.get('/single/:id',middleware,verifyToken,singleTask);
router.get('/stats/:id',middleware,verifyToken,statistics);
router.post('/create',middleware,verifyToken,create);
router.delete('/remove/:id',middleware,verifyToken,remove);
router.patch('/update/:id',middleware,verifyToken,update);

module.exports = router;