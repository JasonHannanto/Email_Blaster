//Prod Mode
if(process.env.NODE_ENV === 'production'){
module.exports = require('./prod');
} 
//Dev Mode
else {
    module.exports = require('./dev');
}