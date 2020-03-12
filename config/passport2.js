
var LocalStrategy = require('passport-local').Strategy;


const UserModel=require('../model/UserModel');
const bcrypt=require('bcrypt');

module.exports=(passport)=>{
    passport.use(new LocalStrategy(   {
        usernameField: 'email',
        passwordField: 'password'
      },
      function(username, password, done) {
        UserModel.findOne({ email: username }, function (err, user) {
          if (err) { return done(err); }
          if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
          }
          bcrypt.compare(password, user.password, function (err, data) {
              if(data){
                return done(null, user);
              }else{
                return done(null, false, { message: 'Incorrect password.' });

              }
          }
        
          )
        });
      }
    ));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });


}


