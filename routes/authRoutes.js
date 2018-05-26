const passport = require('passport');

//GET: Handles authentication login
//scope = what access we want for user information
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
        })
    );

    //GET: Handles Redirect after oAuth login
    //Google will see that a 2nd property (code) is being passes
    app.get('/auth/google/callback', passport.authenticate('google'));  
}