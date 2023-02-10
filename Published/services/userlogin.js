const connection = require('../configs/database');
const { password_hash, password_verify } = require('../configs/security');
const sql = require("mssql");

module.exports = {
    onRegister(value) {
        return new Promise((resolve, reject) => {
            value.u_password = password_hash(value.u_password);

            sql.connect(connection).then(pool => { 
                return pool.request()
                .input('u_username', sql.VarChar, value.u_username)
                .input('u_password', sql.VarChar, value.u_password)
                .input('u_firstname', sql.VarChar, value.u_firstname)
                .input('u_lastname', sql.VarChar, value.u_lastname)
                .input('u_role', sql.VarChar, 'user')
                .query('INSERT INTO dbo.UserLogin (u_username, u_password, u_firstname, u_lastname, u_role) VALUES (@u_username, @u_password, @u_firstname, @u_lastname, @u_role)', 
                (error, result) => {
              if (error) return reject(error);
                resolve(result);
                console.log(result);
                })    
            })
        });  
    },
    onLogin(value) {
        return new Promise((resolve, reject) => {

            sql.connect(connection).then(pool => {
                return pool.request()
                  .input('username', sql.VarChar, value.u_username)
                  .query('SELECT * FROM dbo.UserLogin WHERE u_username=@username', (error, result) => {
                    if (error) return reject(error);
                    if (result.recordset.length > 0) {
                      const userLogin = result.recordset[0];
                      if (value.u_password, userLogin.u_password) {
                        delete userLogin.u_password;
                        return resolve(userLogin);
                      }
                    }
                    reject(new Error('Invalid username or password'));
                  });
              });

            

            // sql.connect(connection).then(pool => {
            //     return pool.request()
            //     .input('u_username', sql.VarChar, value.u_username)
            //     .query('SELECT * FROM dbo.UserLogin WHERE u_username=@u_username', (error, result) => {
            //         if(error) return reject(error);
            //         resolve(result);
            //         console.log(result)
            //     })
            //   })
            // sql.connect(connection).then(pool => {
            //     return pool.request()
            //     .input('u_username', sql.VarChar, value.u_username)
            //     .query('SELECT * FROM dbo.UserLogin ', [value.u_username], (error, result) => {
            //         if (error) return reject(error);
            //         resolve(result);
            //         // if (result.length > 0) {
            //         //     const userLogin = result[0];
            //         //     if(password_verify(value.u_password, userLogin.u_password)){
            //         //         delete userLogin.u_password;
            //         //         // delete userLogin.u_created;
            //         //         // delete userLogin.u_updated;
            //         //         return resolve(userLogin);
                            
            //         //     }
            //         // }
            //         reject(new Error('Invalid username or password'));
            //         })
            //   })

            // connection.query('SELECT * FROM dbo.UserLogin WHERE u_username=?', [value.u_username], (error, result) => {
            //     if (error) return reject(error);
            //     if (result.length > 0) {
            //         const userLogin = result[0];
            //         if(password_verify(value.u_password, userLogin.u_password)){
            //             delete userLogin.u_password;
            //             delete userLogin.u_created;
            //             delete userLogin.u_updated;
            //             return resolve(userLogin);
            //         }
            //     }
            //     reject(new Error('Invalid username or password'));
            // })
        });
    }
};
