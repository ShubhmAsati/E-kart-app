var express = require('express');
var con = require('../../config/db_config.js');
var router = express.Router();
 
 
router.get('/',(req,res,next)=>{
con.query('SELECT user_name FROM  users ', (error, results)=>
        {
            if (error) {
                console.log(err);
            } else {
                console.log(results);
				res.json(results);
            }
        });

}); 
 
 module.exports = router;