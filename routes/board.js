var express = require('express');
var router = express.Router();
var mysql_odbc = require('../db/db_conn')();
var conn = mysql_odbc.init();
mysql_odbc.connect(conn);

//게시판 목록 - 404 에러방지
router.get('/', function(req, res, next){
    res.redirect('/board/list/1');
})

//게시판 목록
router.get('/list',function(req,res,next){
    res.redirect('/board/list/1');
});

router.get('/list/:page',function(req,res,next)
{
    var page = req.params.page;
    var startPage = 1;
    var sql = "select idx, name, title,content, date_format(updatedAt,'%Y-%m-%d %H:%i:%s') updatedAt, " +
        "date_format(createdAt,'%Y-%m-%d %H:%i:%s') createdAt,hit from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('list', {rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
    });
});





//게시글 작성 페이지로 이동
router.get("/post", function (req, res, next) {
    res.render("post");
});

//게시글 작성
router.post('/post', function (req, res) {
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,passwd];

    var sql = "insert into board(name, title, content, createdAt, updatedAt, passwd,hit) values(?,?,?,now(),now(),?,0)";
    conn.query(sql,datas, function (err, rows) {
        if (err) console.error("err : " + err);
        res.redirect('/board');
    });
});

//상세보기
router.get('/read/:idx',function(req,res,next)
{
var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(updatedAt,'%Y-%m-%d %H:%i:%s') updatedAt, " +
        "date_format(createdAt,'%Y-%m-%d %H:%i:%s') createdAt,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('read', {title:"글 상세", row:row[0]});
    });
});

// 글 업데이트, 수정
router.post('/update',function(req,res,next)
{
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,idx,passwd];

    var sql = "update board set name=? , title=?,content=?, updatedAt=now() where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/board/list/'+idx);
        }
    });
});


//일반 사용자(페이징  +  게시판 글)
router.get('/page',function(req,res,next){
    res.redirect('/board/page/1');
});

router.get('/page/:page',function(req,res,next)
{
    var page = req.params.page;
    var sql = "select idx, name, title, date_format(updatedAt,'%Y-%m-%d %H:%i:%s') updatedAt, " +
        "date_format(createdAt,'%Y-%m-%d %H:%i:%s') createdAt,hit from board";
    conn.query(sql, function (err, rows) {
        if (err) console.error("err : " + err);
        res.render('page', {title: ' 게시판 리스트', rows: rows, page:page, length:rows.length-1, page_num:10, pass:true});
        console.log(rows.length-1);
    });
});

//글 삭제
router.post('/delete',function(req,res,next)
{
    var idx = req.body.idx;
    var passwd = req.body.passwd;
    var datas = [idx,passwd];


    var sql = "delete from board where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/board/list/');
        }
    });
});

// TEST
// router.get('/reads',function(req,res,next){
//     res.redirect('/board/reads/1')
// });

router.get('/reads/:idx',function(req,res,next)
{
var idx = req.params.idx;
    var sql = "select idx, name, title, content, date_format(updatedAt,'%Y-%m-%d %H:%i:%s') updatedAt, " +
        "date_format(createdAt,'%Y-%m-%d %H:%i:%s') createdAt,hit from board where idx=?";
    conn.query(sql,[idx], function(err,row)
    {
        if(err) console.error(err);
        res.render('reads', {title:"글 상세", row:row[0]});
    });
});

// 글 업데이트, 수정
router.post('/reads/:idx/updates',function(req,res,next)
{
    var idx = req.body.idx;
    var name = req.body.name;
    var title = req.body.title;
    var content = req.body.content;
    var passwd = req.body.passwd;
    var datas = [name,title,content,idx,passwd];

    var sql = "update board set name=? , title=?, content=?, updatedAt=now() where idx=? and passwd=?";
    conn.query(sql,datas, function(err,result)
    {
        if(err) console.error(err);
        if(result.affectedRows == 0)
        {
            res.send("<script>alert('패스워드가 일치하지 않습니다.');history.back();</script>");
        }
        else
        {
            res.redirect('/board/list/'+idx);
        }
    });
});

router.post('/reads/:idx/deletes',function(req,res)
{
    var idx = req.body.idx;
    // var passwd = req.body.passwd;

    var sql = "DELETE FROM board WHERE idx=?";
    var datas = [idx];
    console.log(datas);

    conn.query(sql, datas, function(err,result)
    {
        if(err) {
            console.error(err);
            return;
        }
        else{
            res.redirect('/board/page');
        }
    });
});



module.exports = router;

