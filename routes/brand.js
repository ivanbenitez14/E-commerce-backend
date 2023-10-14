// RUTA: host + /api/brand

const { Router } = require('express');
const { createBrand, getBrand, updateBrand, deleteBrand } = require('../controllers/brand');
const { validatejwt } = require('../middlewares/validatejwt');


const router = Router();

router.post('/createBrand', validatejwt, createBrand);

router.get('/getBrand', getBrand);

router.put('/updateBrand/:id', validatejwt, updateBrand);

router.delete('/deleteBrand/:id', validatejwt, deleteBrand);

module.exports = router;