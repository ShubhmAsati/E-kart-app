var con = require('../../config/db_config.js');
var bodyParser = require('body-parser');
var exports = module.exports = {};
var Response = require('../../models/Response');
var common_function = require('../../common/common_functions');
var bcrypt = require('bcryptjs');
var Promise = require('promise');
var randomstring = require("randomstring");
var nodemailer = require('nodemailer');


/*this function is used to check admin is exist or not in database.*/



exports.checkAdminExist = function(email)
{

    return new Promise(function(success,fail){

        con.query('SELECT COUNT(user_id) as total FROM  users WHERE email =?',[email], function (error, results,item)
        {
            if (error) {

                fail({
                    "status":"400",
                    "failed":"Oops some error has occurred."
                });
            } else {

                  success(results[0].total);
            }
        });
    });

}

exports.checkUserExist = (user_id)=>{
	con.query('SELECT * FROM users WHERE user_id=? ',[user_id], (error, results)=>
    {
        if (error) {
            return (new Response());
		} else {
			if (results[0]){			
			return ("hii");
		}
		else{
			return(new Response(400,"user does not exists"));
		}
		}
    
});

}



/* customer log in */

exports.logIn = function(req,res,empty)
{
    var email= req.body.email;
    var password = req.body.password;


    con.query('SELECT * FROM users WHERE email=?',[email], function (error, results)
    {
        if (error) {
            res.json(new Response());
        }else{
            if(results[0] ){
				
                row = bcrypt.compare(password, results[0].password, function(err, rs) {
                    if(rs){
						
                        let payload = {userID:results[0].user_id};
                        let token = common_function.createToken(payload);

                        name=results[0]['name'];
                        email=results[0]['email'];
                        contact_number=results[0]['contact_no'];
                        profile_pic_url=results[0]['pic_id'];
						
                        res.json({
                   
                            "status":"200",
                            "message":"Login successful",
                            "access_token" :token,
                            "profile":{name,email,contact_number,profile_pic_url}

                        });
                    }else{

                        res.json({
                            "status":"400",
                            "message":"User Name and Password does not match"
                        });
                    }
                });
            }else{
                res.json({
                    "status":"403",
                    "message":"Forbidden"
                });
            }


        }
    });

}


/* customer registration */

exports.register = (req,res)=>{
	req.body.password = bcrypt.hashSync(req.body.password, 10);
	
	con.query('INSERT INTO users SET ?',req.body,(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			if(results.insertId){
				res.json(new Response(200,"Customer registered successfully."));
			}
			else{
				res.json(new Response(400,"Customer registered failed."));
				
			}
		}
	});
	
                
	
		
	}
	
/* check if email already exists */


exports.emailExist = (req,res)=>{
	con.query('SELECT user_id from users where email = ?',req.params.email,(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			if(results[0]){
				res.json(new Response(200,"email already exists"));
			}
			else{
				res.json(new Response(400,"email does not exists in database."));
				
			}
		}
	});
		
	}
	
/* forgot password  */
	

exports.forgotPassword = (req,res)=>{
	var email = req.body.email.trim();


con.query('SELECT user_id from users where email = ?',[req.body.email],(error,results)=>{
        
		if(error){
			console.log(error);
            res.json({
               "status":"401",
               "message":"Email Does Not Match"
            });
        }else{
			security_code = randomstring.generate({
                        length: 7,
                        charset: 'alphanumeric'
                    });

                    con.query('UPDATE users SET security_token = ? where email = ?', [security_code,req.body.email], function (error, results) {
                        if (error) {
                            // console.log("Oops some error has occurred.",error);
                            res.json({
                                "status": "400",
                                "message": "Oops some error has occurred.",
                                "data":error
                            })
                        }

                        else {
							console.log("security token addedd to table");
                            if (results.affectedRows) {

                                var transporter = nodemailer.createTransport({
                                    service: 'gmail',
                                    auth: {
                                        user: 'email',
                                        pass: 'password'
                                    },
                                    tls: {
                                        rejectUnauthorized: false
                                    }
                                });

                                var mailOptions = {
                                    from: 'email@gmail.com',
                                    to: email,
                                    subject: 'Password reset code',
                                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                                        'Please paste this into your app to complete the process:\n\n' +
                                        'security code : '+security_code +
                                        '\n\nIf you did not request this, please ignore this email and your password will remain unchanged.\n'
                                };

                                transporter.sendMail(mailOptions, function(error, info){
                                    if (error) {

                                        res.json({
                                            "status": "400",
                                            "message": "Oops some error has occurred.",
                                            "data":error
                                        });

                                    } else {
										console.log("email sent successfully");
                                        res.json({
                                             "status": "200",
                                            "message": "Email Has been sent successfully.",
                                        });

                                    }
                                });



                            } else {
                                res.json({
                                    "status":"403",
                                     "message":"Forbidden"
                                });
                            }
                        }

                    

                });
            

        }

    });

}

//User Password Reset Functions//
exports.passwordReset = function(req,res,empty) {
    var dt = dateTime.create();
    formatted = dt.format('Y-m-d H:M:S');
    var email = req.body.email.trim();
	req.body.password = bcrypt.hashSync(req.body.password, 10);
    con.query('UPDATE users SET password = ? where security_token = ?', [req.body.password,req.body.security_token], function (error, results) {

        if (error) {
            res.json(new Response());
        } else {
            if (results.affectedRows) {
                res.json({
                    "status": "200",
                    "message": "password resetted success fully."
                });
            } else {
			res.json(new Response(400,"error in updating password"));
			}
		}
	});
}

	
/*  checking postal code provided by user  */

exports.getPostal = (req,res)=>{
	con.query('SELECT * from pincode_data where pincode = ? ',[req.params.pincode],(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			if(results[0]){
					res.json(
						new Response(200,"area recieved by your pincode.",results[0]));
			} else{
					res.json(new Response(400,"error in getting area"));
				
			     }
	        }
		
	});
}

/*  updating postal code and type of order of users table  */


exports.updatePcodeandTO = (req,res)=>{
	
	con.query('UPDATE users SET pincode = ? ,type_of_order = ?  where user_id = ?',[req.body.pincode,req.body.type_of_order,req.body.user_id],(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			if(results.affectedRows){
					res.json(new Response(200,"User profile updated."));
			} else{
					res.json(new Response(400,"error in updating user data"));
				
			     }
	        } 
	});
		
	}
	
/* storing email for updating postal area */

exports.getUpdates = (req,res)=>{
	con.query('INSERT INTO get_updates_by_email SET email = ?',[req.body.email],(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			
			if(results.affectedRows){
				res.json(new Response(200,"Thanks for your support."));
			}
			else{
				res.json(new Response(400,"error storing email."));
				
			}
		}
	});
		
	}

		
/* adding address to address table */

exports.addAddress = (req,res)=>{
	con.query('INSERT INTO address SET ?',[req.body],(error,results)=>{
		if(error){
     			res.json(new Response());
		} else {
			
			if(results.affectedRows){
				res.json(new Response(200,"Address added successfully"));
			}
			else{
				res.json(new Response(400,"error storing address."));
				
			}
		}
	});
		
	}


/* listing address by user id and address type */

exports.getAddress = (req,res)=>{
	con.query('SELECT * FROM address where user_id = ? and address_type = ?',[req.params.user_id,req.params.address_type],(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			
			if(results[0]){
				res.json(new Response(200,"address list",results));
			}
			else{
				res.json(new Response(400,"no address found."));
				
			}
		}
	});
		
	}


/* adding address to address table */

exports.deleteAddress = (req,res)=>{
	con.query('DELETE FROM address where user_id = ? and address_type = ?',[req.body.user_id,req.body.address_type],(error,results)=>{
		if(error){
			console.log(error);
			res.json(new Response());
		} else {
			
			if(results.affectedRows){
				res.json(new Response(200,"Address deleted successfully"));
			}
			else{
				res.json(new Response(400,"no address found."));
				
			}
		}
	});
		
	}

	
/* fetching notification for a user */

exports.getNotification = (req,res)=>{
	con.query('SELECT n.notification_data AS notify from notification AS n where n.notification_id IN (SELECT notification_id from notification_user where user_id = ?) ',[req.params.user_id],(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			
			if(results[0]){
				res.json(new Response(200,"notifications of a user",results));
			}
			else{
				res.json(new Response(400,"no notifications found."));
				
			}
		}
	});
		
	}


/* deleting notification for a user */

exports.deleteNotification = (req,res)=>{
	con.query('DELETE from notification_user where user_id = ? and notification_id = ? ',[req.params.user_id,req.params.notification_id],(error,results)=>{
		if(error){
			res.json(new Response());
		} else {
			
			if(results.affectedRows){
				res.json(new Response(200,"notification deleted successfuly"));
			}
			else{
				res.json(new Response(400,"no notifications found."));
				
			}
		}
	});
		
	}
	
// to fetch subscription list
exports.getSubscription = (req,res)=>{

	con.query('SELECT p.product_name,p.product_price,sd.subscription_frequency,sd.subscription_discount FROM subscription s inner join subscription_details sd on s.subscription_id = sd.subscription_id inner join products p on p.product_id = s.product_id  where s.user_id= ?',[req.params.user_id] ,(error, results)=>
    {
        
		if (error) {
			
			
            res.json(new Response());
		}
		else {
			
			
			if (results[0]){
			console.log(results);
			res.json(new Response(200,"subscription list",results));
		}
		else{
			res.json(new Response(400,"no subscription found"));
		}
		}
    
});

}

	
// to fetch subscription list
exports.deleteSubscription = (req,res)=>{

	con.query('DELETE FROM subscription_details where user_id = ? and product_id = ?',[req.body.user_id,req.body.product_id] ,(error, results)=>
    {
        
		if (error) {
			
			
            res.json(new Response());
		}
		else {
			
			
			if (results.affectedRows){
			console.log(results);
			res.json(new Response(200,"subscrtion removed ",results));
		}
		else{
			res.json(new Response(400,"no subscription found"));
		}
		}
    
});

}


