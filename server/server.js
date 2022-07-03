const express = require('express');
const cors = require('cors');
const mysqlConnection = require('../config/config.db');

require('dotenv').config();

class Server {

    constructor() {
        this.app = express();

        this.connectDB();

        this.middlewares();

        this.routes();        
    }

    connectDB() {
        mysqlConnection.connect((err)=> {
            if(!err)
                console.log('Connection Established Successfully');
            else
                console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
        });;
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