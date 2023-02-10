const connection = require('../configs/database');
const config = require('../configs');
const sql = require("mssql");
const { Guid } = require('js-guid');


module.exports = {
    findOne(column) {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                return pool.request()
                // .input('id', sql.Int, column)
                .query('SELECT * FROM dbo.UserLogin ',  (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                })
            });
        });
    },



    // findOne(column) {
    //     try {
    //         const pool = await sql.connect(connection);
    //         const result = await pool.request()
    //         .input('id', sql.Int, column)
    //         .query('SELECT * FROM dbo.UserLogin WHERE u_id = @id');
    //         return result;
    //     } catch (err) {
    //         console.error(err);
    //         return err;
    //     }
    //     }
    find() {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                // return pool.request().query('select top 20 dbo.MemberListing.RowKey, dbo.MemberListing.Phone, dbo.MemberCar.CarPlateID, dbo.Province.CityName2, dbo.MemberListing.Name FROM dbo.MemberListing INNER JOIN dbo.MemberCar ON dbo.MemberListing.RowKey=dbo.MemberCar.MemberKey INNER JOIN dbo.Province ON dbo.Province.RowKey=dbo.MemberCar.ProvinceKey', (error, result) => {
                return pool.request().query('SELECT TOP 10 * FROM dbo.Province', (error, result) => {
                    if(error) return reject(error);
                    resolve(result);
                    // console.log(result)
                })
              })
        });
    },
    onCreate(value) {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                return pool.request()
                  .input('RowKey', sql.UniqueIdentifier, Guid.newGuid().toString())
                  .input('CityName1', sql.VarChar, value.CityName1)
                  .input('CityName2', sql.VarChar, value.CityName2)
                  .query(`INSERT INTO dbo.Province (RowKey, CityName1, CityName2) VALUES ( newId(), @CityName1, @CityName2)`, (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                    // console.log(result); 
                    // console.log(Guid.newGuid());

                })
            });
        });
    },

};