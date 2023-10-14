// RUTA: host + /api/product

const { Router } = require('express');
const { getProduct, createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product');
const { validatejwt } = require('../middlewares/validatejwt');

const router = Router();


router.post('/createProduct',validatejwt, createProduct);

router.get('/getProduct/:id', getProduct);
router.get('/getProducts', getProducts);

router.put('/updateProduct/:id',validatejwt, updateProduct);

router.delete('/deleteProduct/:id',validatejwt, deleteProduct);

module.exports = router;