const sgMail = require('@sendgrid/mail') 
 
sgMail.setApiKey(process.env.Api_key) 


const SendWelcomeEMail = (email,name)=> {
    console.log(email)
    sgMail.send({  
       to: email,   
  from: 'sfaisalkhan5@gmail.com',   
    subject: 'This is my first creation!',    
 text: `welcome ${name} , it's great to have you here`
})
    }

    const SendcancelEMail = (email,name)=> {
        console.log(email)
        sgMail.send({  
           to: email,   
      from: 'sfaisalkhan5@gmail.com',   
        subject: 'This is my first deletion!',    
     text: `Thanks ${name} , it was good experience to have you`
    })
        }
    

    module.exports = {
   SendWelcomeEMail,
   SendcancelEMail
    }