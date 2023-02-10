const router = require('express').Router();
const service = require('../services/province');
const connection = require('../configs/database');
const config = require('../configs');
const { check, query } = require('express-validator/check');
const sql = require("mssql");
const fetch = require('isomorphic-fetch');


// แสดงข้อมูลสมาชิก
router.get('/', async (req, res) => {
    try {
        req.validate();
        res.json(await service.find(req.query));
    }
    catch (ex) { res.error(ex); }
});

// เพิ่มข้อมูล
router.post('/', [
    check('CityName1').not().isEmpty(),
    check('CityName2').not().isEmpty(),
], async (req, res) => {
    try {
        req.validate();
        res.json({ message: await service.onCreate(req.body) });
    }
    catch (ex) {
        res.error(ex);
    }
});

// ลบข้อมูลอุปกรณ์
// router.delete('/:id', async (req, res) => {
//     try {
//         const response = await fetch(`http://localhost:3001/api/province/${req.params.id}`);
//           const data = await response.json();
//           const pool = await sql.connect(config);
//           const result = await pool.request()
//             .query('SELECT u_id FROM dbo.UserLogin');
//           return result;
//         } catch (err) {
//           console.error(err);
//           return err;
//         }
//     // try {
//     //     res.send(req.params);
//     //     // const deleteItem = await service.findOne({ u_id: req.params.id });
//     //     // res.send(deleteItem);
//     // }
//     // catch (ex) { res.error(ex); }
// });

router.delete('/:id', async (req, res) => {
    const response = await fetch(`http://localhost:3001/api/province/${req.params.id}`, {
     
    });
    const data = await response.json();
  });



module.exports = router;