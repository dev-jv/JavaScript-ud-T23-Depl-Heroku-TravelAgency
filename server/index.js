import express from 'express';
import router from './routes/index.js';
import db from './config/db.js'
import dotenv from 'dotenv';

dotenv.config({path: 'variables.env'})

const app = express();

db.authenticate()
    .then(() => console.log('Base de datos conectada'))
    .catch( error => console.log(error) );

// const port = process.env.PORT || 4000;

app.set('view engine', 'pug') // Habilitar PUG

app.use((req, res, next) => {
    // res.locals.unaVariable = 'Una nueva variable';
    // console.log(res.locals);
    const year = new Date();
    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";
    next();
});

app.use(express.urlencoded({extended:true})); // Agregar body parser para leer los datos del formulario

app.use(express.static('public')); // Define la carp. public

app.use('/', router); // Agrega el router

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 3000;


app.listen(port, host , ()=>{ 
    console.log(`El Servidor esta funcionando en el puerto ${port}`)
})



