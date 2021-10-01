// DB 정보
module.exports = (function () {
    return {
        local: {
            host: 'localhost', //DB서버 IP주소
            port: '3306', //DB서버 Port주소
            user: 'root', //DB접속 아이디
            database: 'test', //사용할 DB명
            password: 'kulsict2021@', //DB암호
        },
        real: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        staging: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        },
        dev: {
            host: '',
            port: '',
            user: '',
            password: '',
            database: ''
        }
    }
})();

