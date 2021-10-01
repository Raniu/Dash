//DB 연결 파일
// MySQL 연결
var mysql = require('mysql');

// db 정보 파일을 받아온다.
var config = require('./db_info').local;

module.exports = function () {
    return {
        init: function () {
            return mysql.createConnection({
                host: config.host,
                port: config.port,
                user: config.user,
                password: config.password,
                database: config.database
            })
            
        },
        //연결
        connect: function(conn) {
            conn.connect(function(err) {
                if(err) console.error('mysql connection error : ' + err);
                else console.log('mysql is connected successfully!');
            });
        }
    }
};

