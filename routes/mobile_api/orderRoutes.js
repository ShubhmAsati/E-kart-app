var express = require("express");
var router = express.Router();
var empty = require('is-empty');
var orderFunction  = require('../../service/mobile-function/orderFunction');
var common_function = require('../../common/common_functions');

/*  adding order  */
router.post('/orders',(req,res,next)=>{
	orderFunction.addOrder(req,res);
	
});


/*  deleting order  */
router.delete('/orders',(req,res,next)=>{
	orderFunction.deleteOrder(req,res);
	
});
  
 
/*  fetching all orders by a user  */ 
router.get('/orders/:user_id',(req,res,next)=>{
	orderFunction.getOrder(req,res);
});









module.exports = router;
