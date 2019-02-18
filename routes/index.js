var express=require('express')

 

var router=express.Router();
var path = require('path');
var mongo = require('mongodb');
var mongoose=require ('mongoose')
mongoose.connect("mongodb://localhost:27017/logg2", { useNewUrlParser: true });
var user=require('../models/user')




var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: '', ///enter your mail
    pass: '' //enter password
  }
});


/*
router.get('/',ensureAuth,function(req,res){
    res.render('index.ejs');
})
*/

router.get('/',function(req,res){
    res.sendFile('index.html');
    console.log("here")
})


router.get('/log-in',ensureAuth,function(req,res){
    res.render('index.ejs');
})

router.get('/sign-in',function(req,res){
    res.sendFile(path.join(__dirname, '../public', 'signup.html'));
})



router.post('/getdetails',function(req,res){
	
    console.log("gotcha");
    
    var i=req.body.idofuser;

  var aonea=req.body.ponen;
  var aoneb=req.body.pones;
  var aonec=req.body.poney;

  var atwoa=req.body.ptwon;
  var atwob=req.body.ptwos;
  var atwoc=req.body.ptwoy;

  var athreea=req.body.pthreen;
  var athreeb=req.body.pthrees;
  var athreec=req.body.pthreey;

  var afoura=req.body.pfourn;
  var afourb=req.body.pfours;
  var afourc=req.body.pfoury;
  var idi=req.body.idea;

    user.findOne({_id:i},function(err,a){
        console.log(a);
   
     a.one={name:aonea,branch:aoneb,year:aonec};
     a.two={name:atwoa,branch:atwob,year:atwoc};
     a.three={name:athreea,branch:athreeb,year:athreec};
     a.four={name:afoura,branch:afourb,year:afourc};
     a.idea=idi;
     a.save().then(()=>{
  console.log(a);

  var mailOptions = {
    from: '', //email
    to: '',
    subject: 'Participant details',
    text: `participant one ${a.one.name}  ${a.one.branch} ${a.one.year}
           participant two ${a.two.name}  ${a.two.branch} ${a.two.year}
           participant two ${a.three.name}  ${a.three.branch} ${a.three.year}
           participant two ${a.four.name}  ${a.four.branch} ${a.four.year}
    
    `
    // html: '<h1>Hi Smartherd</h1><p>Your Messsage</p>'        
  };
  
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });








     })
       
     
     
    })

    res.sendFile(path.join(__dirname, '../public', 'one.html'));

})

function ensureAuth(req,res,next){
if(req.isAuthenticated()){
    return next();
}
else{
    res.redirect('/users/login');
}


}
module.exports = router;