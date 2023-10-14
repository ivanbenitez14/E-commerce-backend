// RUTA: host + /api/brand

const { Router } = require('express');
const { createBrand, getBrand, updateBrand, deleteBrand } = require('../controllers/brand');
const { validateJWT } = require('../middlewares/validateJwt');

const router = Router();

router.post('/createBrand',validateJWT, createBrand);

router.get('/getBrand', getBrand);

router.put('/updateBrand/:id',validateJWT, updateBrand);

router.delete('/deleteBrand/:id',validateJWT, deleteBrand);

module.exports = router;