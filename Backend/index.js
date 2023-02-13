const express = require('express');
const server = express();
const expressSession = require('express-session');
const bodyParser = require('body-parser');
const config = require('./configs');
const PORT = 3001;

// const { connect } = require('http2');

//เช็ค database
// require("./configs/database");

// connect.query('show tables', (err, result) => {
//     console.log(result);
// })

// ตั้งค่า Session สำหรับระบบ
server.use(expressSession({
    secret: 'Narumon.com',
    resave: false,
    saveUninitialized: true,
    cookie: {}
}));

// ตั้งค่าการ Parse ตัวแปรเมื่อ Client ส่งข้อมูลเข้ามา
server.use(bodyParser.urlencoded({ extended: false, limit: '500MB' }));
server.use(bodyParser.json({ limit: '500MB' }));

// Allow content
server.use('/api/uploads', express.static(`${__dirname}/uploads/equipments`));
server.use('/api/uploads', express.static(`${__dirname}/uploads/rooms`));
// if (config.isProduction) server.use(express.static(`${__dirname}/www`))

// สร้าง Custom function
server.use(require('./configs/middleware'));

// เรียกใช้งาน router
server.use('/api', require('./router'));

server.get('*', (req, res) => {
    // if (config.isProduction)
    // return res.sendFile(`${__dirname}/www/index.html`);
    res.end(`<h1>Backend server is startd.</h1>`);
});

server.listen(PORT, () => console.log(`Server is started, Port ${PORT}.`))

