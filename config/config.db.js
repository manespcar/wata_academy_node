const mysql = require('mysql');

require('dotenv').config();

const mysqlConnection = 
     mysql.createConnection({  
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME
        });


module.exports = mysqlConnection;