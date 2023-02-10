const connection = require('../configs/database');
const config = require('../configs');
const sql = require("mssql");
const table = 'dbo.MemberCar';
module.exports = {
    find() {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                // return pool.request().query('select top 20 dbo.MemberListing.RowKey, dbo.MemberListing.Phone, dbo.MemberCar.CarPlateID, dbo.Province.CityName2, dbo.MemberListing.Name FROM dbo.MemberListing INNER JOIN dbo.MemberCar ON dbo.MemberListing.RowKey=dbo.MemberCar.MemberKey INNER JOIN dbo.Province ON dbo.Province.RowKey=dbo.MemberCar.ProvinceKey', (error, result) => {
                return pool.request().query('SELECT TOP 10 * FROM dbo.MemberCar ', (error, result) => {
                    if(error) return reject(error);
                    resolve(result);
                    // console.log(result)
                })
              })
        });
    },

    // find(value) {
    //     return new Promise((resolve, reject) => {
    //         const limitPage = config.limitPage;
    //         const startPage = ((value.page || 1) - 1) * limitPage;
    //         const sqls = {
    //             count: `SELECT COUNT(*) AS numrows FROM ${table}`,
    //             select: `SELECT * FROM ${table}`
    //         };

    //         if (value.search_key && value.search_text) {
    //             const key = value.search_key;
    //             const txt = value.search_text;
    //             const sqlSerch = ` WHERE ${connection.escapeId(key)} LIKE ${connection.escape(`%${txt}%`)}`;
    //             sqls.count += sqlSerch;
    //             sqls.select += sqlSerch;
    //         }

    //         // เรียงลำดับข้อมูล
    //         // sqls.select += ' ORDER BY r_updated DESC';

    //         // หาจำนวนแถว
    //         // const result = sqls.query.count
    //         connection.query(sqls.count, (error, result) => {
    //             if (error) return reject(error);
    //             const items = { result: [], numrows: result[0].numrows, limit: limitPage };

    //             // แบ่งหน้า page
    //             sqls.select += ` LIMIT ${connection.escape(startPage)},${limitPage}`;
    //             connection.query(sqls.select, (error, result) => {
    //                 if (error) return reject(error);
    //                 items.result = result;
    //                 resolve(items);
    //             });
    //         });
    //     });
    // },
    // findOne(column) {
    //     return new Promise((resolve, reject) => {
    //         connection.query(`SELECT * FROM ${table} WHERE ?`, column, (error, result) => {
    //             if (error) return reject(error);
    //             resolve(result.length > 0 ? result[0] : null);
    //         });
    //     });
    // },
    // onCreate(value) {
    //     return new Promise((resolve, reject) => {
    //         connection.query(`INSERT INTO ${table} SET ?`, value, (error, result) => {
    //             if (error) return reject(error);
    //             resolve(result);
    //         });
    //     });
    // },
    // onDelete(id) {
    //     return new Promise((resolve, reject) => {
    //         connection.query(`DELETE FROM ${table} WHERE m_id=?`, [id], (error, result) => {
    //             if (error) return reject(error);
    //             resolve(result);
    //         });
    //     });
    // },
    // onUpdate(id, value) {
    //     return new Promise((resolve, reject) => {
    //         const $query = `
    //             UPDATE ${table} SET
    //                 m_phone = ?,
    //                 m_membercar = ?,
    //                 m_name = ?,
    //                 m_career = ?,
    //                 m_email = ?,
    //                 m_updated = NOW()
    //             WHERE 
    //                 m_id = ?`;
    //         connection.query($query, [value.m_phone, value.m_membercar, value.m_name, value.m_career, value.m_email, id], (error, result) => {
    //             if (error) return reject(error);
    //             resolve(result);
    //         });
    //     });
    // }
};