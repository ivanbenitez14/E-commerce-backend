const { response } = require('express');
const Product = require('../models/product');
const Brand = require('../models/brand');

const createProduct = async (req, res = response) => {
    const { name, description, image_url, price, brandId, brandName, logo_url } = req.body;

    try {
        let brand = null;
        
        if (brandId) {
            brand = await Brand.findByPk(brandId);
            if (!brand) {
                return res.status(400).json({
                    msg: 'La marca especificada no existe',
                });
            }
        } else if (brandName) {
            brand = await Brand.create({
                name: brandName,
                logo_url
            });
        }

        const product = await Product.create({
            name,
            description,
            image_url,
            price,
            brandId: brand.id,
        });

        return res.json(product);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const getProduct = async(req, res = response) => {

    const { id } = req.params;

    const product = await Product.findByPk( id );

    if( product ) {
        res.json(product);
    } else {
        res.status(404).json({
            msg: `No existe un producto con el id ${ id }`
        });
    }

};

const getProducts = async (req, res = response) => {
    try {
      const { name, description } = req.query;
      let products;
  
      if (name || description) {

        products = await Product.findAll({
          where: {
            name: name,
            description: description,
          },
          include: [{
            model: Brand,
            as: 'brands',
          }],
        });
      } else {
        products = await Product.findAll({
          include: [{
            model: Brand,
            as: 'brands',
          }],
        });
      }
  
      res.json({ products });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hable con el administrador',
      });
    }
};   

const updateProduct = async(req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const product = await Product.findByPk( id );
        
        console.log(product);

        if( !product ) {
            return res.status(404).json({
                msg: 'No existe un producto con ese id'
            })
        }

        await product.update(body);

        res.json( product );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

};

const deleteProduct = async(req, res = response) => {

    const { id } = req.params;

    const product = await Product.findByPk( id );
    if ( !product ) {
        return res.status(404).json({
            msg: 'No existe un producto con ese id ' + id
        });
    }

    await product.destroy();

    //await product.update({ status: false });

    res.status(200).json({
        product,
        msg: 'Producto eliminado'
    });

};

module.exports = {
    createProduct,
    getProduct,
    getProducts,
    updateProduct,
    deleteProduct
}