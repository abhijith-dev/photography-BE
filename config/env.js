const dotenv = require('dotenv');

module.exports = (function(){
   let args = process.argv;
   args = args[args.length -1];

   if(args === '--development'){
     dotenv.config({
        path : '.env'
     })
   }
   
})();