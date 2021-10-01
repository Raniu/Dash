//서버로써 express 프레임 워크 사용
var express = require('express');
//express 서버 1개를 생성
var app = express();
//path 라이브러리 사용(폴더경로 연산)
var path = require('path');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// POST 의 내용물을 처리하기 위해 필요
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

// Express 서버 포트 설정
const port = 3700

var formRouter = require('./routes/form');
var mysqlRouter = require('./routes/mysql');
var boardRouter = require('./routes/board');
var loginRouter = require('./routes/login');

app.use('/form', formRouter);
app.use('/mysql', mysqlRouter);
app.use('/board', boardRouter);
app.use('/login', loginRouter);

// css, js 효과 사용
app.use("/", express.static(__dirname))
app.use("/img", express.static(__dirname + "/assets/img"))
app.use('/css', express.static(__dirname + "/assets/css"));
app.use('/js', express.static(__dirname + "/assets/js"));
app.use('/kuls', express.static(__dirname + "/assets/kuls"));
app.use('/download', express.static(__dirname + "/assets/download"));

// 기본 Router 주소
app.use('/', function(req, res, next){
    res.redirect('/board/list/1');
})

// port에 연결
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})