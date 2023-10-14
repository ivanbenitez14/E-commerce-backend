const express = require('express');
const db = require('./database/connection');
const cors = require('cors');
require('dotenv').config();

// SERVIDOR EXPRESS
const app = express();

// BASE DE DATOS
async function dbConnection() {
    try {
        await db.authenticate();
        console.log('Database online');
    } catch (error) {
        throw new Error( error );
    }
}

// LLAMADO A LA DB
dbConnection();

// CORS
app.use(cors());

// CARPETA PUBLICA
app.use( express.static('public') );

// LECTURA PARSEO BODY
app.use( express.json() );

// RUTAS
app.use('/api/auth', require('./routes/auth'));
app.use('/api/product', require('./routes/product'));
app.use('/api/brand', require('./routes/brand'));

// ESCUCHAR PETICIONES
app.listen( process.env.PORT, () => {
    console.log(`Servidor corriendo en el puerto ${ process.env.PORT }`)
});