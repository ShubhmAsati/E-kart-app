var express = require("express");
var router = express.Router();
var fn  = require('../../service/common-function/commonFunction');



//..................Mail Box Routes.................//

//Send mail api

router.post("/mail",function(req,res){
    fn.sendMail(req,res);
});

//get inbox mail api

router.get("/inbox/:sender",function(req,res){
    fn.getInboxMail(req,res);
});

//get sent box mail api

router.get("/sentBox/:sender",function(req,res){
    fn.getsentBoxMail(req,res);
});

//get drafts mail api

router.get("/drafts/:sender",function(req,res){
    fn.getDrafts(req,res);
});


//delete inbox mail api

router.delete("/inbox/:inbox_mail_id",function(req,res){
    fn.deleteMailFromInBox(req,res);
});

//Delete sent box mail api

router.delete("/sentBox/:sent_box_mail_id",function(req,res){
    fn.deleteMailFromSentBox(req,res);
});

//Delete drafts api

router.delete("/drafts/:drafts_mail_id",function(req,res){
    fn.deleteMailFromDrafts(req,res);
});

//Delete Mail api

router.delete("/mail/:mail_id",function(req,res){
    fn.deleteMailFromMailBox(req,res);
});


module.exports = router;