var path = require('path');
//console.log(process.env);
var settings = {
    site_url: 'http://demo1.nodesoft.co.kr',
    upload_path: (process.env.NODE_ENV == 'production')? path.normalize(path.join(__dirname, './../../frontend/dist/uploads/'))
                    : path.normalize(path.join(__dirname, './../../frontend/app/uploads/')),
    port: process.env.NODE_PORT || 3000,

    postmailer: 'postmaster@nodesoft.co.kr',

    database: {
        protocol: "mysql", // or  "postgresql"
        query: {
            debug: (process.env.NODE_ENV == 'production')? false: true, //prints queries to console
            pool: true
        },
        host: "127.0.0.1",
        port: 3306,
        database: "demo1_nodesoft_co_kr",
        user: "root",
        password: "Thinkrbot3208!",
        timezone: "+09:00" //'Asia/Seoul'
    }
};

module.exports = settings;
