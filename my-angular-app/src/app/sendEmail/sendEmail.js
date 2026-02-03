const nodemailer = require('nodemailer');

// 1. Create a transporter object using your SMTP details
// For Gmail, the service name is 'gmail' and port 465 is typically secure (SSL)
// Google App Password ( BhullarMeSite - vxpr nklj etds hupe ) 
const transporter = nodemailer.createTransport
({
    service: 'gmail', // Use 'gmail' or provide host/port for other services
    auth: {
        user: 'hardy.bhullar85@gmail.com', // Your email address
        pass: 'vxpr nklj etds hupe' // Your Gmail App Password (not your regular password)
    }
});

// 2. Compose the email message details
const mailOptions = 
{
    from: '"Fred Foo 👻" <hardy.bhullar85@gmail.com>', // Sender address
    to: 'bhoocorp@gmail.com', // List of receivers (comma-separated)
    subject: 'Hello ✔', // Subject line
    text: 'Hello world?', // Plain text body
    html: '<b>Hello world?</b>' // HTML body
};

// 3. Send the email
transporter.sendMail(mailOptions, (error, info) => 
{
    if (error) {
        return console.log('Error:', error);
    }
    console.log('Message sent: %s', info.messageId);
    // Preview only available when using a ethereal account (for testing)
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info)); 
});