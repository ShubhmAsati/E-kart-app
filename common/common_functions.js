var exports = module.exports = {};
var config = require('./custom_config');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
var con = require('../config/db_config');
var userFunction = require('../service/mobile-function/userFunction');
var Response = require('../models/Response');

exports.randomID = function(length,ALPHABET) {
    var rtn = '';
    ALPHABET = ALPHABET.replace(/\s/g,'');
    for (var i = 0; i < length; i++) {
        rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
    }
    return rtn;
}
exports.verifyToken = function(req,res,next){
    if(!req.headers.authorization){
//        return  res.status(401).send("Unauthorizeddd request");
 return res.json({
                          "id":"-1",
                            "status":"401",
                            "message":"Unauthorized request"
                        });
    }
    let token = req.headers.authorization;
    if(token === "null"){
    return

   return  res.status(401).send("Unauthorized request");
    }
    jwt.verify(token, config.jwtTokenSecret, function(err, decoded) {
        if (err){
           return res.json({
                                     "id":"-1",
                                       "status":"401",
                                       "message":"Unauthorized request"
                                   });
        }else{
            
			
            req.userID = decoded.userID;
			console.log(req.userID);
// --this is to check whether generated userID exists in users or not . 
			con.query('SELECT * FROM users WHERE user_id=? ',[decoded.userID], (error, results)=>
		{
			if (error) {
				res.send (new Response());
			} else {
				
				if (results[0]){			
		
					next();
			}
			 else{
				res.send(new Response(401,"Unauthorized access"));
				}
				  }
       }
	);
			
			
            
        }
    });
}

exports.decodeVendorToken = function(req){
    let token = req.body.access_token;
    return jwt.decode(token, config.jwtTokenSecret);
}
exports.createToken = function(obj){
    var token = jwt.sign(obj, config.jwtTokenSecret, {
        expiresIn: 86400 // expires in 24 hours
    });

    return token;
}
exports.createPassword = function(str){
    var t = bcrypt.hash(str, saltRounds, function(err, hash) {
        return hash;
    });
    return t;
}

exports.parseFormData = function(req){
    return new Promise(function(success,fail){
        var form = new formidable.IncomingForm();
        form.parse(req, function (err, fields,files) {
            if(err){
                fail(err);
            }else{
                success({"fields":fields,"files":files});
            }
        });
    });
}




