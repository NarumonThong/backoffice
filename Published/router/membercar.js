const router = require('express').Router();
const service = require('../services/membercar');
const connection = require('../configs/database');
const config = require('../configs');
const { check, query } = require('express-validator/check');


// แสดงข้อมูลสมาชิก
router.get('/', async (req, res) => {
    try {
        req.validate();
        res.json(await service.find(req.query));
    }
    catch (ex) { res.error(ex); }
});




module.exports = router;