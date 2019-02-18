var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'rahuldeverani@gmail.com',
    pass: '9968747697'
  }
});

var mailOptions = {
  from: 'rahuldeverani@gmail.com',
  to: 'rahuldeverani@gmail.com',
  subject: 'Sending Email using Node.js',
  text: `sambhu kakak ki ma ka`
  // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});