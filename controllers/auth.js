const { response } = require('express');
const User = require('../models/user');
const { generateJWT } = require('../helpers/jwt');
const bcrypt = require('bcryptjs');

const getUser = async (req, res = response) => {

    const users = await User.findAll();

    res.json({users});
};

const registerUser = async (req, res = response) => {
    const { body } = req;

    try {
        const duplicatedEmail = await User.findOne({
            where: {
                email: body.email
            }
        });

        if (duplicatedEmail) {
            return res.status(400).json({
                msg: 'Ya existe un usuario registrado con el email ' + body.email
            });
        }

        const user = new User(body);

        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(body.password, salt);

        await user.save();

        const token = await generateJWT(user.id, user.name);

        res.json({ user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

const loginUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({
            where: {
                email: email
            }
        });

        if (!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Credenciales incorrectas'
            });
        }

        const token = await generateJWT(user.id, user.name);

        res.json({
            msg: 'Login exitoso',
            uid: user.id,
            name: user.name,
            email: user.email,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
};

const updateUser = async(req, res = response) => {

    const { id } = req.params;
    const { body } = req;

    try {
        const user = await User.findByPk( id );
        if( !user ) {
            return res.status(404).json({
                msg: 'No existe un usuario con ese id'
            })
        }

        await user.update(body);

        res.json( user );

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

};

const deleteUser = async(req, res = response) => {

    const { id } = req.params;

    const user = await User.findByPk( id );
    if ( !user ) {
        return res.status(404).json({
            msg: 'No existe un usuario con ese id ' + id
        });
    }

    await user.destroy();

    //await user.update({ status: false });

    res.status(200).json({
        user,
        msg: 'Usuario eliminado'
    });

};

module.exports = {
    getUser,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
}