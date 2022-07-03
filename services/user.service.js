const mysqlConnection = require('../config/config.db');

class UserService {

    constructor() { }

    getUsers(callback) {
        mysqlConnection.query('SELECT * FROM users', (err, results) => {
            if (!err)
                return callback(results, null);
            else
                return callback(null, err);
        });
    }

    getUserById(id, callback) {
        mysqlConnection.query('SELECT * FROM users WHERE id = ?', [id], (err, results) => {
            if (!err && results.length > 0)
               return callback(results, null);
            else if(results.length == 0)
                return callback([], null);
            else
                return callback(null, err);
            
        });
    }

    saveUser(data, callback) {
        const {username, email, phone} = data;

        mysqlConnection.query('INSERT INTO users (username, email, phone) VALUES (?, ?, ?)', [username, email, phone], 
            (err, result) => {
                if(!err) 
                    callback(result.insertId, null);
                else 
                    callback(null, err);
            }
        );
    }

    updateUser(id, data, callback) {
        const {username, email, phone} = data;

        mysqlConnection.query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, id], (err, results) => {
            if (!err && results.length > 0)
               return callback(null, 'EMAIL_DUPLICATED');
            else if(results.length == 0){
                mysqlConnection.query('UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?', [username, email, phone, id], 
                (err, result) => {
                    if(!err) 
                        return callback(result.affedtedRows, null);
                    elsereturn  
                        return callback(null, err);
                });
            }
            else
                return callback(null, err);
        });
    }

    deleteUser(id, callback) {
        mysqlConnection.query('DELETE FROM users WHERE id = ?', [id], (err, results) => {
            if (!err)
                return callback(results, null);
            else
                return callback(null, err);
        });
    }

}

module.exports = UserService;