const express = require('express');
const cors = require('cors');

require('dotenv').config();

class Server {

    constructor() {
        this.app = express();

        this.middlewares();

        this.routes();        
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api/users', require('../routes/user.route'));
    }

    listen() { 
        this.app.listen(process.env.PORT);
    }

}

module.exports = Server;