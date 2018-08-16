const config = require('../config/dataConfiguration')
const sql = require('mssql')

const Admin = (staffName = ''  , staffEmail = '', staffPassword = '', staffPort = '') => {
    const name = staffName
    const email = staffEmail
    const password = staffPassword
    const port = staffPort

    return{ 
        getName : () => name, 
        getEmail : () => email, 
        getPassword : () => password, 
        getPort : () => port, 
        login : (emailed, pass) =>  sql.connect(config).then(poll => 
        poll.request()
        .input('email' , sql.VarChar, emailed)
        .input('pass' , sql.VarChar, pass)
        .query('SELECT * FROM staffs WHERE staff_email = @email AND staff_password = @pass')
        .then(res => {
            sql.close()
            return res
        })   
       ),
       getAdminName: async id => {
          const pool = new sql.ConnectionPool(config)
          try{
              await pool.connect()
              const res = await pool.request()
              .input('id', sql.Int, id)
              .query('SELETC * FROM staffs WHERE staff_id = @id')
            return res
          }
          catch(e){
              return e
          }
          finally{
              pool.close()
          }
       }
    
    }
}
module.exports = Admin