const mysql = require('mysql');
const sql = require("mssql");

// const connection = mysql.createConnection({
//   host            : '127.0.0.1',
//   user            : 'root',
//   password        : '',
//   database        : 'backoffice_db',
//   charset         : 'utf8'
// });

// module.exports = connection;

const config = {
  user: 'sa',
  password: 'DisRaptor@2020!!',
  server: 'disraptor.co.th',
  port: 6666,
  database: 'Carmunity',
  trustServerCertificate: true,
  disableHostCheck: true,
  public: 'http://172.16.30.65:8080',
  proxy: 'http://localhost:8080'
}


// async function getId() {
//   try {
//   const response = await fetch(`https://............/data/${id}`);
//     const data = await response.json();
//     const pool = await sql.connect(config);
//     const result = await pool.request()
//       .query('SELECT u_id FROM dbo.UserLogin');
//     return result;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// }

// const fetch = require('isomorphic-fetch');
// const sql = require('mssql');

// async function getId() {
//   try {
//     const response = await fetch(`https://............/data/${id}`);
//     const data = await response.json();
//     const pool = await sql.connect(connection);
//     const result = await pool.request()
//       .query('SELECT u_id FROM dbo.UserLogin');
//     return result;
//   } catch (err) {
//     console.error(err);
//     return err;
//   }
// }

// sql.connect(config, (err) => {
//     if(err) console.error(err)
//     else console.log("Connected to SQL Server.")
// })

// sql.connect(config).then(pool => {
//   // Query
  
//   return pool.request()
//       .query('select top 5 * from dbo.MemberCar')
// }).then(result => {
//   console.log(result)
// }).catch(err => {
// // ... error checks
// });

module.exports = config;

