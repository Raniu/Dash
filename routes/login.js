var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();
mysql_odbc.connect(conn);
// const models = require("../mzodels");
// const crypto = require('crypto');


////////////////////////////////////////////////////////
// 회원가입 GET
// router.get('/sign_up', function(req, res, next) {
//     res.render("sign_up");
// });

// // 회원가입 POST
// router.post('/sign_up', function(req, res, next) {
//     var name = req.body.name;
//     var password = req.body.password;
//     var password2 = req.body.password2;
//     var id = req.body.id;
//     console.log(name, password, id);
//     if (name && password && id) {
//         connection.query('SELECT * FROM user WHERE name = ? AND password = ? AND id = ?', [name, password, id], function(error, results, fields) {
//             if (error) throw error;
//             if (results.length <= 0 && password==password2) {
//                 connection.query('INSERT INTO user (name, password, id) VALUES(?,?,?)', [name, password, id],
//                 function (error, data) {
//                     if (error)
//                     console.log(error);
//                     else
//                     console.log(data);
//                 });
//                     res.send('<script type="text/javascript">alert("회원가입을 환영합니다!"); document.location.href="/";</script>');    
//             } else if(password!=password2){                
//                 res.send('<script type="text/javascript">alert("입력된 비밀번호가 서로 다릅니다."); document.location.href="/register";</script>');    
//             }
//             else {
//                 res.send('<script type="text/javascript">alert("이미 존재하는 아이디 입니다."); document.location.href="/register";</script>');    
//             }            
//             res.end();
//         });
//     } else {
//         res.send('<script type="text/javascript">alert("모든 정보를 입력하세요"); document.location.href="/register";</script>');    
//         res.end();
//     }
// });

router.get('/', (req, res) => res.render('login'));
// router.get("/login", (req, res) => res.render("login", {page: "login"}));
router.get("/signup", (req, res) => res.render("signup"));

router.post("/signup", (req, res, next) => {
    console.log(req.body);
    User.find({ id:req.body.id })
        .exec()
        .then(user => {
            if (user.length >= 1) {
                res.send('<script type="text/javascript">alert("이미 존재하는 이메일입니다."); window.location="/signup"; </script>');
            } else {
                const user = new User({
                    // _id: new mongoose.Types.ObjectId(),
                    name:req.body.name,
                    id: req.body.id,
                    password: req.body.password,
                    password2: req.body.password2
                });
                user
                    .save()
                    .then(result => {
                        console.log(result);
                        res.redirect("/");
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        });
});

module.exports = router;