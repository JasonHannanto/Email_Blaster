const passport = require('passport');

//GET: Handles authentication login
module.exports = (app) => {
    app.get('/auth/google', passport.authenticate('google', {
        //scope = what access we want for user information        
        scope: ['profile', 'email']
        })
    );

    //GET: Handles Redirect after oAuth login
    //Google will see that a 2nd property (code) is being passes
    app.get('/auth/google/callback', passport.authenticate('google')); 
    
    app.get('/api/current_user', (req,res) => {
        res.send(req.user);
    });
};