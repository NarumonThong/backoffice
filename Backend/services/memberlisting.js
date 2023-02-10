const connection = require('../configs/database');
const config = require('../configs');
const table = 'dbo.MemberListing';
const sql = require("mssql");

module.exports = {
    find() {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                // return pool.request().query('select top 20 dbo.MemberListing.RowKey, dbo.MemberListing.Phone, dbo.MemberCar.CarPlateID, dbo.Province.CityName2, dbo.MemberListing.Name FROM dbo.MemberListing INNER JOIN dbo.MemberCar ON dbo.MemberListing.RowKey=dbo.MemberCar.MemberKey INNER JOIN dbo.Province ON dbo.Province.RowKey=dbo.MemberCar.ProvinceKey', (error, result) => {
                return pool.request().query('SELECT TOP 1000 * FROM dbo.MemberListing', (error, result) => {
                    if(error) return reject(error);
                    resolve(result);
                    // console.log(result)
                })
              })

            // const limitPage = config.limitPage;
            // const startPage = ((value.page || 1) - 1) * limitPage;
            // const sqls = {
            //     count: `select top 20 dbo.MemberListing.RowKey, dbo.MemberListing.Phone, dbo.MemberCar.CarPlateID, dbo.Province.CityName2, dbo.MemberListing.Name FROM dbo.MemberListing INNER JOIN dbo.MemberCar ON dbo.MemberListing.RowKey=dbo.MemberCar.MemberKey INNER JOIN dbo.Province ON dbo.Province.RowKey=dbo.MemberCar.ProvinceKey`,
            //     select: `SELECT * FROM ${table}`
            // };

            // if (value.search_key && value.search_text) {
            //     const key = value.search_key;
            //     const txt = value.search_text;
            //     const sqlSerch = ` WHERE ${connection.escapeId(key)} LIKE ${connection.escape(`%${txt}%`)}`;
            //     sqls.count += sqlSerch;
            //     sqls.select += sqlSerch;
            // }

            // // เรียงลำดับข้อมูล
            // // sqls.select += ' ORDER BY r_updated DESC';

            // // หาจำนวนแถว
            // connection.query(sqls.count, (error, result) => {
            //     if (error) return reject(error);
            //     const items = { result: [], numrows: result[0].numrows, limit: limitPage };

            //     // แบ่งหน้า page
            //     sqls.select += ` LIMIT ${connection.escape(startPage)},${limitPage}`;
            //     connection.query(sqls.select, (error, result) => {
            //         if (error) return reject(error);
            //         items.result = result;
            //         resolve(items);
            //     });
            // });
        });
    },
    findOne(column) {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                return pool.request()
                .input('id', sql.INT, column.u_id)
                .query(`select  * from dbo.UserLogin WHERE u_id=@id`, column, (error, result) => {
                    if (error) return reject(error);
                    resolve(result.length > 0 ? result[0] : null);
                });
              })
            // connection.query(`SELECT * FROM ${table} WHERE ?`, column, (error, result) => {
            //     if (error) return reject(error);
            //     resolve(result.length > 0 ? result[0] : null);
            // });
        });
    },
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
    onUpdate(id, value) {
        return new Promise((resolve, reject) => {
            // const $query = `
            //     UPDATE ${table} SET
            //         Phone = va,
            //         CarPlateID = ?,
            //         CityName2 = ?,
            //         Name = ?,
            //     WHERE 
            //         RowKey = ?`;

            // sql.connect(connection).then(pool => {
            //             return pool
            //               .request().query($query, [value.Phone, value.CarPlateID, value.CityName2, value.Name, RowKey], (error, result) => {
            //                 if (error) return reject(error);
            //                 resolve(result);
            //             });
            //           });
            // connection.query($query, [value.Phone, value.CarPlateID, value.CityName2, value.Name, value.RowKey], (error, result) => {
            //     if (error) return reject(error);
            //     resolve(result);
            // });

            sql.connect(connection).then(pool => {
                return pool
                  .request()
                  .input('firstname', sql.NVarChar, value.u_firstname)
                .query(`select  * from dbo.UserLogin WHERE u_firstname=@firstname`,
                //   .input('Name', sql.NVarChar, value.Name)
                //   .query('UPDATE * FROM dbo.MemberListing.RowKey, dbo.MemberListing.Phone, dbo.MemberCar.CarPlateID, dbo.Province.CityName2, dbo.MemberListing.Name FROM dbo.MemberListing INNER JOIN dbo.MemberCar ON dbo.MemberListing.RowKey=dbo.MemberCar.MemberKey INNER JOIN dbo.Province ON dbo.Province.RowKey=dbo.MemberCar.ProvinceKey WHERE Name=@Name', 
                  [value.u_firstname, id], (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                  });
              });
        });
    }
};