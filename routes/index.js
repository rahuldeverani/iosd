var express=require('express')
var router=express.Router();

var mongo = require('mongodb');
var mongoose=require ('mongoose')
mongoose.connect("mongodb://localhost:27017/logg", { useNewUrlParser: true });
var user=require('../models/user')
router.get('/',ensureAuth,function(req,res){
    res.render('index.ejs');
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

    user.findOne({_id:i},function(err,a){
        console.log(a);
   
     a.one={name:aonea,branch:aoneb,year:aonec};
     a.two={name:atwoa,branch:atwob,year:atwoc};
     a.three={name:athreea,branch:athreeb,year:athreec};
     a.four={name:afoura,branch:afourb,year:afourc};
     a.save().then(()=>{
  console.log(a);

     })
       
     
     
    })

    res.render('registered.ejs');
  

})
router.get('/alliosd2019hack',function(req,res){

     user.find({},function(err,a){
         console.log(a);
         res.render('pk.ejs',{all:a});
     })

 
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