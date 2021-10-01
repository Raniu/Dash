var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();
mysql_odbc.connect(conn);

// mysql 성공, 실패 여부 확인 하는 코드 
//http://localhost:3000/mysql에 접속했을 시 보여지는 화면
router.get('/', function(req, res, next) {
    conn.commit(function(err) {
        if (err) {
            res.render('mysql', { connect: '연결 실패',err:err });
            console.error(err);
            throw err;
        }else{
            res.render('mysql', { connect: '연결 성공',err:'없음' });
        }
    });
});

module.exports = router;