const router = require('express').Router();
const service = require('../services/memberlisting');
const { check, query } = require('express-validator/check');


// แสดงข้อมูลสมาชิก
router.get('/', [
    // query('page').not().isEmpty().isInt().toInt()
], async (req, res) => {
    try {
        req.validate();
        res.json(await service.find(req.query));
    }
    catch (ex) { res.error(ex); }
});

// แสดงข้อมูลสมาชิกแค่ 1 recode เพื่อเอาไปแก้ไข
router.get('/:id', async (req, res) => {
    try {
        const model = await service.findOne({ u_id: req.params.id });
        if (!model) throw new Error('Not found item.');
        res.json(model);
    }
    catch (ex) { res.error(ex); }
});

// เพิ่มข้อมูลสมาชิก
// router.post('/', [
//     check('m_phone').not().isEmpty(),
//     check('m_membercar').not().isEmpty(),
//     check('m_name').not().isEmpty(),
//     check('m_career').not().isEmpty(),
//     check('m_email').not().isEmpty(),
// ], async (req, res) => {
//     try {
//         req.validate();

//         // ตรวจสอบ Folder หากไม่มีก็ทำการสร้าง
//         // if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);
//         // if (!fs.existsSync(memberDir)) fs.mkdirSync(memberDir);

//         // แปลงข้อมูลรูปภาพ
//         // req.body.r_image = base64Img
//         //     .imgSync(req.body.m_image, memberDir, `members-${Date.now()}`)
//         //     .replace(`${memberDir}/`, '');

//         res.json({ message: await service.onCreate(req.body) });
//     }
//     catch (ex) {
//         // หากว่ามีการ Insert ไม่ผ่านก็ลบทิ้ง
//         // const delImg = path.join(memberDir, req.body.m_image || '');
//         // if (fs.existsSync(delImg)) fs.unlinkSync(delImg, () => null);
//         res.error(ex);
//     }
// });

// // ลบข้อมูลสมาชิก
// router.delete('/:id', async (req, res) => {
//     try {
//         const item = await service.findOne({ m_id: req.params.id });
//         if (!item) throw new Error('Not found item.');
//         const deleteItem = await service.onDelete(item.m_id);
//         const deleteImg = path.join(memberDir, item.m_image);
//         if (fs.existsSync(deleteImg)) fs.unlinkSync(deleteImg, () => null);
//         res.send(deleteItem);
//     }
//     catch (ex) { res.error(ex); }
// });

// // แก้ไขข้อมูลสมาชิก
router.put('/:id', [
    check('u_firstname').not().isEmpty(),
    // check('m_membercar').not().isEmpty(),
    // check('m_name').not().isEmpty(),
    // check('m_career').not().isEmpty(),
    // check('m_email').not().isEmpty(),
], async (req, res) => {
    try {
        req.validate();
        // res.json({ message: 'dddd'})

        // หาข้อมูลที่จะแก้ไข
        const item = await service.findOne({ u_id: req.params.id });
        if (!item) throw new Error('Not found item.');

        const updateItem = await service.onUpdate(req.params.id, req.body);


        res.json(updateItem);
    }
    catch (ex) {
        // หากว่ามีการ Insert ไม่ผ่านก็ลบทิ้ง
        res.error(ex);
    }
});

module.exports = router;