const Cusotmer = require('./customer/customer')

async function abody() {
    
const customer = Cusotmer()


     try{ 

        let cus = await customer.login('abody@gmail.com' , '123456')
        if(cus.recordset.length === 0)
         console.log('No results')
         else
        console.log('customer obj' , cus.recordset[0])

  }
    catch(e){
       console.log(e)
       console.log('after')
       
  }

}
abody()
  
 

