const { response } = require('express');
const Brand = require('../models/brand');

const createBrand = async(req, res = response) => {

    const { body } = req;

    try {

        const duplicatedBrand = await Brand.findOne({
            where: {
                name: body.name
            }
        });

        if (duplicatedBrand) {
            return res.status(400).json({
                msg: 'Ya existe una marca registrada con el nombre ' + body.name
            });            
        }

        const brand = new Brand(body);
        await brand.save();

        res.json(brand);

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

};

const getBrand = async(req, res = response) => {

    const brands = await Brand.findAll();

    res.json({brands});

};

const updateBrand = async(req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const brand = await Brand.findByPk( id );
        if( !brand ) {
            return res.status(404).json({
                msg: 'No existe una marca con ese id'
            })
        }

        await brand.update(body);

        res.json( brand );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

};

const deleteBrand = async(req, res = response) => {

    const { id } = req.params;

    const brand = await Brand.findByPk( id );
    if ( !brand ) {
        return res.status(404).json({
            msg: 'No existe una marca con el id: ' + id
        });
    }

    await brand.destroy();

    //await brand.update({ status: false });

    res.status(200).json({
        brand,
        msg: 'Marca eliminada'
    });

};

module.exports = {
    createBrand,
    getBrand,
    updateBrand,
    deleteBrand
}