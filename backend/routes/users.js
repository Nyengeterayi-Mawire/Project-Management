const router = require('express').Router(); 
const {middleware} = require('../middlewares/middleware');
const {signUp,login,remove,update,allUsers} = require('../controllers/users'); 

router.post('/signup',middleware,signUp);
router.post('/login',middleware,login);
router.patch('/update/:id',middleware,update);
router.delete('/delete/:id',middleware,remove);
router.get('/',middleware,allUsers);

module.exports = router;
