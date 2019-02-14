var express = require('express');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var exphbs = require('express-handlebars');
var expressValidator = require('express-validator');
var flash = require('connect-flash');
var session = require('express-session');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongo = require('mongodb');
var user=require('./models/user')
var mongoose = require('mongoose');
var bcrypt=require('bcryptjs')

var routes=require('./routes/index');
var users=require('./routes/users')
var app=express()
mongoose.connect("mongodb://localhost:27017/logg", { useNewUrlParser: true },function(){
  console.log("connect");
  var admin=new user({
    username:"abcd",
  password:"admin123"
    })

    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(admin.password, salt, function(err, hash) {
            // Store hash in your password DB.
admin.password=hash;
admin.save();


        });
    });



});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(cookieParser());

app.use(express.static(__dirname+'/public'))
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));




app.use(passport.initialize());
app.use(passport.session());









app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        var namespace = param.split('.')
        , root    = namespace.shift()
        , formParam = root;
  
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));


  app.use(flash());
  app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
  });



app.use('/',routes);
app.use('/users',users);

app.listen(3011);