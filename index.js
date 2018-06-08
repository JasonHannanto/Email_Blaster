const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');

//We dont need to assign to a variable b/c there is no return value
require('./models/User');
require('./services/passport');

//Connect to DB
mongoose.connect(keys.mongoURI);

const app = express();  

app.use(
    //MaxAge = Age for cookies to exist in miliseconds
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

//Returns a function, and immediately calls function with app as parameter
//Allows us to connect app to our route.
require('./routes/authRoutes')(app);

// //PORT = Assigned by Heroku or 5000 (local)
// const PORT = process.env.PORT||5000;
// //localhost:5000
// app.listen(PORT);

app.listen(process.env.PORT || 5000, function(){
    console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});

console.log("Server running on PORT " + PORT);