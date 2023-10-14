// RUTA: host + /api/auth

const { Router } = require('express');
const { check } = require('express-validator');
const { registerUser, loginUser, getUser, updateUser, deleteUser } = require('../controllers/auth');
const { fieldValidator } = require('../middlewares/fieldValidator');

const router = Router();

router.get('/users', getUser);

router.post(
    '/register', 
    [
        check('name', 'El nombre es obligatorio.').not().isEmpty(),
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').isLength({ min: 6 }),    
        fieldValidator
    ],
    registerUser
);

router.post(
    '/login', 
    [
        check('email', 'El email es obligatorio.').isEmail(),
        check('password', 'El password es obligatorio.').isLength({ min: 6 }),    
        fieldValidator
    ],
    loginUser
);

router.put('/updateUser/:id', updateUser);

router.delete('/deleteUser/:id', deleteUser);

module.exports = router;