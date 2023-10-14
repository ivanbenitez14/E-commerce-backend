// RUTA: host + /api/product

const { Router } = require('express');
const { getProduct, createProduct, getProducts, updateProduct, deleteProduct } = require('../controllers/product');
const { validateJWT } = require('../middlewares/validateJwt');

const router = Router();


router.post('/createProduct',validateJWT, createProduct);

router.get('/getProduct/:id', getProduct);
router.get('/getProducts', getProducts);

router.put('/updateProduct/:id',validateJWT, updateProduct);

router.delete('/deleteProduct/:id',validateJWT, deleteProduct);

module.exports = router;