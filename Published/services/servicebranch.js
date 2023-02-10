const connection = require('../configs/database');
const config = require('../configs');
const sql = require("mssql");
module.exports = {
    find() {
        return new Promise((resolve, reject) => {
            sql.connect(connection).then(pool => {
                // return pool.request().query('select top 20 dbo.MemberListing.RowKey, dbo.MemberListing.Phone, dbo.MemberCar.CarPlateID, dbo.Province.CityName2, dbo.MemberListing.Name FROM dbo.MemberListing INNER JOIN dbo.MemberCar ON dbo.MemberListing.RowKey=dbo.MemberCar.MemberKey INNER JOIN dbo.Province ON dbo.Province.RowKey=dbo.MemberCar.ProvinceKey', (error, result) => {
                return pool.request().query('SELECT TOP 10 * FROM dbo.ServiceBranch', (error, result) => {
                    if(error) return reject(error);
                    resolve(result);
                    // console.log(result)
                })
              })
        });
    },

   
};