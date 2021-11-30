//Importar dependencias
require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
//Importar módulos
const ConnDb = require('./database/connDb');
const UserRouter = require('./routers/userRouter');

class Server {

    constructor() {
        this.connDb = new ConnDb();
        //Crear aplicación express
        this.app = express();
        this.config();
    }

    config() {
        //indicar que se procesarán datos en formato json en las peticiones a recibir
        this.app.use(express.json());
        //Indicar el uso de morgan para el monitoreo de las peticiones http
        this.app.use(morgan());
        this.app.use(cors());
        //configurar/almacenar el puerto por el que correrá el servidor
        this.app.set('PORT', process.env.PORT || 3001);
        //---------------crear rutas------------------------
        let router = express.Router();
        router.get('/', (req, res) => {
            res.status(200).json({ message: 'All ok' });
        });
        let userR = new UserRouter();
        //------------------añadir rutas a express-------------------
        this.app.use(router);
        this.app.use(userR.router);
        //levantar/poner a la escucha el servidor
        this.app.listen(this.app.get('PORT'), () => {
            console.log("Servidor corriendo por el puerto ==>>>> ", this.app.get('PORT'));
        });
    }
}

new Server();