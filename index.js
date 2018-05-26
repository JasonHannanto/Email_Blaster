const express = require('express');
//We dont need to assign to a variable b/c there is no return value
require('./services/passport');

const app = express();  

//Returns a function, and immediately calls function with app as parameter
//Allows us to connect app to our route.
require('./routes/authRoutes')(app);

//PORT = Assigned by Heroku or 5000 (local)
const PORT = process.env.PORT || 5000;
//localhost:5000
app.listen(PORT);

console.log("Server running on PORT " + PORT);