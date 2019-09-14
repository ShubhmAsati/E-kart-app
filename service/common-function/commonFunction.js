var con = require("../../config/db_config");
var exports = (module.exports = {});
var product = require("../../models/product");
var Response = require("../../models/response");
var dateTime = require("node-datetime");


//..................Mail Box Function.................//

// send mail function

exports.sendMail = function(req,res){
   var mail = {
     sender:req.body.sender,
     reciver:req.body.reciver,
     mail_subject:req.body.mail_subject,
     mail_data:req.body.mail_data,
     
    };
  
    con.query("insert into mail_box set ?", mail, function(
      error,
      results
    ) {
      if (error) {
          console.log(error);
           res.json(new Response());
      } else {
          
        if (results.affectedRows) {

            var sentMail = {
                sender:mail.sender,
                reciver:mail.reciver,
                mail_id:results.insertId
                
               };
            
            con.query("insert into sent_box set ?", [sentMail], function(
                error,
                results
              ) {
                if (error) {
                    
                  res.json(new Response());
                } else {
                    
                    
                  if (results.affectedRows) {
                    console.log(new Response(200, "Mail added sent box."));
                  } else {
                    console.log(new Response(400, "Failed to add mail to sent box"));
                  }
                }
              });
        


            con.query("insert into inbox set ?", [sentMail], function(
                error,
                results
              ) {
                if (error) {
                  res.json(new Response());
                } else {
                    
                  if (results.affectedRows) {
                    console.log(new Response(200, "Mail added to inbox"));
                  } else {
                    console.log(new Response(400, "Failed to add mail to inbox"));
                  }
                }
              });
              var flag = true;
          console.log(new Response(200, "Mail Sent Successfully."));
        } else {
          res.json(new Response(400, "Failed to Send Mail"));
        }
      }

      if(flag){
          res.json(new Response(200, "Mail Sent Successfully."));
      }
    });
  };


  // Delete mail from mail box function

exports.deleteMailFromMailBox = function(req,res){
    
    con.query("update mail_box set deleted = 1 where mail_id = ?", [req.params.mail_id], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.affectedRows) {
          res.json(new Response(200, "Mail deleted Successfully."));
        } else {
          res.json(new Response(400, "Failed to delete Mail"));
        }
      }
    });
  };


  
  // Delete mail from sent box function

exports.deleteMailFromSentBox = function(req,res){
    
    con.query("update sent_box set deleted = 1 where sent_box_mail_id = ?", [req.params.sent_box_mail_id], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.affectedRows) {
          res.json(new Response(200, "Mail deleted Successfully."));
        } else {
          res.json(new Response(400, "Failed to delete Mail"));
        }
      }
    });
  };


  
  
  // Delete mail from inbox function

exports.deleteMailFromInBox = function(req,res){
    
    con.query("update inbox set deleted = 1 where inbox_mail_id = ?", [req.params.inbox_mail_id], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.affectedRows) {
          res.json(new Response(200, "Mail deleted Successfully."));
        } else {
          res.json(new Response(400, "Failed to delete Mail"));
        }
      }
    });
  };


  
    // Delete mail from drafts function

exports.deleteMailFromDrafts = function(req,res){
    
    con.query("update drafts set deleted = 1 where drafts_mail_id = ?", [req.params.drafts_mail_id], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.affectedRows) {
          res.json(new Response(200, "Mail deleted Successfully."));
        } else {
          res.json(new Response(400, "Failed to delete Mail"));
        }
      }
    });
  };

  
  
    // get draft mail function

exports.getDrafts = function(req,res){
    
    con.query("select mail.mail_id,mail.mail_subject,mail.mail_data,us.user_name as reciver,dra.drafts_mail_id from mail_box mail inner join users us on mail.reciver = us.user_id inner join drafts dra on dra.mail_id = mail.mail_id where dra.deleted = 0  and mail.sender = ?",[req.params.sender], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.length>0) {
          res.json(new Response(200, "All drafts from mail box",results));
        } else {
          res.json(new Response(400, "Failed to get drafts from mail box"));
        }
      }
    });
  };

// get inbox mail function

exports.getInboxMail = function(req,res){
    
    con.query("select mail.mail_id,mail.mail_subject,mail.mail_data,us.user_name as reciver,inb.inbox_mail_id from mail_box mail inner join users us on mail.reciver = us.user_id inner join inbox inb on inb.mail_id = mail.mail_id where inb.deleted = 0 and mail.sender = ?",[req.params.sender], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.length>0) {
          res.json(new Response(200, "All inbox mail from mail box",results));
        } else {
          res.json(new Response(400, "Failed to get inbox mail from mail box"));
        }
      }
    });
  };


// get Sent mail function

exports.getsentBoxMail = function(req,res){
    
    con.query("select mail.mail_id,mail.mail_subject,mail.mail_data,us.user_name as reciver,sent.sent_box_mail_id from mail_box mail inner join users us on mail.reciver = us.user_id inner join sent_box sent on sent.mail_id = mail.mail_id where sent.deleted = 0 and mail.sender = ?",[req.params.sender], function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response());
      } else {
          
        if (results.length>0) {
          res.json(new Response(200, "All Sent box mail from mail box",results));
        } else {
          res.json(new Response(400, "Failed to get sent box mail from mail box"));
        }
      }
    });
  };
  