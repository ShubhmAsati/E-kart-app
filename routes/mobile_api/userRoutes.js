var express = require("express");
var router = express.Router();
var empty = require('is-empty');
var userFunction  = require('../../service/mobile-function/userFunction');
var common_function = require('../../common/common_functions');
var multer = require('multer');
var fs = require('fs');
var path = require('path');

// user login
router.post('/log-in',(req,res,next)=>{
	userFunction.logIn(req,res);
});

// to register a user
router.post('/register',(req,res,next)=>{
	userFunction.register(req,res);
});

// while registering check email exists or not
router.get('/email-exists/:email',(req,res,next)=>{
	userFunction.emailExist(req,res);
});

// forgot password api
router.post('/forgot-password',(req,res,next)=>{
	userFunction.forgotPassword(req,res);
});

//  password reset api
router.post('/password-reset',(req,res,next)=>{
	userFunction.passwordReset(req,res);
});

// to getting area based on pincode entered by user
router.get('/postal-code/:pincode',(req,res,next)=>{
	userFunction.getPostal(req,res);
});

// updating type od order and pincode of a user 
router.post('/updatePcodeandTO',(req,res,next)=>{
	userFunction.updatePcodeandTO(req,res);
});

// storing email to get update notification
router.post('/get-updates',(req,res,next)=>{
	userFunction.getUpdates(req,res);
});

// to add address of a user
router.post('/address',(req,res,next)=>{
	userFunction.addAddress(req,res);
});

// to list address based on user and address type
router.get('/address/:user_id/:address_type',(req,res,next)=>{
	userFunction.getAddress(req,res);
});

// to delete address by user id and address type
router.delete('/address',(req,res,next)=>{
	userFunction.deleteAddress(req,res);
});

// to get notification for a user
router.get('/notification/:user_id',(req,res,next)=>{
	userFunction.getNotification(req,res);
});

// to delete notifications for a user
router.delete('/notification/:user_id/:notification_id',(req,res,next)=>{
	userFunction.deleteNotification(req,res);
});

// to view subscription of a user
router.get('/subscription/:user_id',common_function.verifyToken,(req,res,next)=>{
	userFunction.getSubscription(req,res);
});
// to  delete a subscription of a user based on user id and product id
router.delete('/subscription',(req,res,next)=>{
	userFunction.deleteSubscription(req,res);
});


const DIR = './public/images';
 
let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, DIR);
    },
    filename: (req, file, cb) => {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
let upload = multer({storage: storage});

router.post('/upload-image',upload.single('photo'), function (req, res) {
    console.log(req.file);
	if (!req.file) {
        console.log("No file received");
        res.json({
          check: false
        });
    
      } else {
        console.log('file received = '+ req.file.filename);
        
		res.json({
          status: "400",
		  message:"image uploaded succesfully",
		  imagePath:req.file.filename
		});
		
		
	  
	  }
});





module.exports = router;