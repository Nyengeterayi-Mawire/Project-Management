const router = require('express').Router(); 
const {allProjects,singleProject,create,remove,update,userProjects,search} = require('../controllers/projects');
const {middleware,verifyToken} = require('../middlewares/middleware');

router.get('/',middleware,verifyToken,allProjects);
router.get('/:id',middleware,verifyToken,singleProject);
router.get('/user/:id',middleware,verifyToken,userProjects);
router.post('/create',middleware,verifyToken,create);
router.delete('/:id',middleware,verifyToken,remove);
router.patch('/update/:id',middleware,verifyToken,update);
router.post('/search/:id',middleware,verifyToken,search);

module.exports = router;


