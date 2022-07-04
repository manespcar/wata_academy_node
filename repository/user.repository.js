const bcrypt = require('bcryptjs');
const mysqlConnection = require('../config/config.db');

class UserRepository {

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
        const {username, password, email, phone} = data;

        const salt = bcrypt.genSaltSync();
        const passwordEncrypted = bcrypt.hashSync(password, salt);

        mysqlConnection.query('SELECT * FROM users WHERE email = ?', [email], (err, results) => {
            if (!err && results.length > 0)
               return callback(null, 'EMAIL_DUPLICATED');
            else if(results.length == 0){
                mysqlConnection.query('INSERT INTO users (username, password, email, phone) VALUES (?, ?, ?, ?)', 
                [username, passwordEncrypted, email, phone], 
                (err, result) => {
                    if(!err) 
                        callback(result.insertId, null);
                    else 
                        callback(null, err);
                });
            } 
            else
                return callback(null, err);
        });   
    }

    updateUser(id, data, callback) {
        const {username, email, phone} = data;

        mysqlConnection.query('SELECT * FROM users WHERE email = ? AND id <> ?', [email, id], (err, results) => {
            if (!err && results.length > 0)
               return callback(null, 'EMAIL_DUPLICATED');
            else if(results.length == 0){
                mysqlConnection.query('UPDATE users SET username = ?, email = ?, phone = ? WHERE id = ?', 
                [username, email, phone, id], 
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

    isRegistered(email, password, callback) {
        mysqlConnection.query('SELECT * FROM users WHERE email = ?', 
        [email], (err, results) => {
            if (!err && results.length > 0){
                const isValid = bcrypt.compareSync(password, results[0].password);
                if(isValid) return callback(results[0].id, null);
                return callback(-1, null);
            }
            else if(results.length == 0)
                return callback(false, null);
            else
                return callback(null, err);
        });
    }

}

module.exports = UserRepository;