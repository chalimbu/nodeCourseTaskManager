const sgMail = require('@sendgrid/mail')


sgMail.setApiKey(process.env.SENDGRID_API_KEY)


const sendWelcomeEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sebastian_zapata82151@elpoli.edu.co',
        subject: 'thanks fror joining in',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app`,
        //html:'' allows the email to be send 
    })

}

const sendFinishEmail = (email, name) => {
    sgMail.send({
        to: email,
        from: 'sebastian_zapata82151@elpoli.edu.co',
        subject: 'sorry to hear you are going',
        text: `hey ${name}.why are you going what could we do to keep you on board`,
        //html:'' allows the email to be send 
    })

}


module.exports = {
    sendWelcomeEmail,
    sendFinishEmail
}