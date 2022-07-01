const mysql = require('mysql');

require('dotenv').config();

const mysqlConnection = () => {
    let mysqlConnection;
    try {
        mysqlConnection = mysql.createConnection({
            host: process.env.DBHOST,
            user: process.env.DBUSER,
            password: process.env.DBPASS,
            database: process.env.DBNAME
        });
    } catch (error) {
        console.log("Error when connect with database");
    }

    mysqlConnection.connect((err)=> {
        if(!err)
            console.log('Connection Established Successfully');
        else
            console.log('Connection Failed!'+ JSON.stringify(err,undefined,2));
    });
}


module.exports = {mysqlConnection};