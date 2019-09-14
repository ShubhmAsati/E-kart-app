var con = require('../../config/db_config.js');
var bodyParser = require('body-parser');
var exports = module.exports = {};
var Response = require('../../models/Response');
var common_function = require('../../common/common_functions');

/*  adding order to order and order details and then update product table for available quantity  */
exports.addOrder = (req,res)=>{
	var index;
	con.query('INSERT INTO orders (user_id,order_status,order_amount,delivery_address_id,order_pincode,payment_method) VALUES (?,?,?,?,?,?)',[req.body.user_id,"placed",req.body.order_amount,req.body.delivery_address_id,req.body.order_pincode,req.body.payment_method], (error, results,fields)=>
    {
        if (error) {
            res.json (new Response());
		} else {
			
			if (results.insertId){
				
				order_id = results.insertId;
					for (index in req.body.products){
						product = req.body.products[index];
					con.query('INSERT INTO order_details (order_id,product_id,product_quantity,product_price) VALUES (?,?,?,?)',[order_id,product.product_id,product.product_quantity,product.product_price], (error, results)=>
								{
									if (error) {
										console.log(error);
								
									} else {
										if (results.affectedRows){
											con.query('UPDATE subscription set is_confirmed = true where product_id = ? and user_id = ?',[product.product_id,req.body.user_id]);
											con.query('UPDATE products SET available_quantity = available_quantity - ? where product_id = ?',[product.product_quantity,product.product_id],(error,results)=>{
																	if(error){
																		console.log(new Response());
																	} else {
																		if(results.affectedRows){
																				console.log(new Response(200,"order placed "));
																		} else{
																				console.log(new Response(400,"error updating products"));
																			
																			 }
																		} 
																});
														}
									else{
								
										return(new Response(400,"user does not exists"));
									}
									}
								
							});
									
					}
				
					res.json(new Response(200,"order placed successfully",order_id));
					}
					}	
					
							});
		}
    

/*  deleting order to order and order details and then update product table for available quantity  */
exports.deleteOrder = (req,res)=>{
	var index;
	con.query('DELETE FROM orders where order_id = ? and user_id = ?',[req.body.order_id,req.body.user_id], (error, results)=>
    {
        if (error) {
            res.json (new Response());
		} else {
			if (results.affectedRows){
				console.log("order delete from order table");
				
						
					con.query('DELETE FROM order_details where order_id = ?',[req.body.order_id], (error, results)=>
								{
									if (error) {
										console.log(error);
								
									} else {
										if (results.affectedRows){
											console.log("order details updated");
											for (index in req.body.products){
													product = req.body.products[index];
													con.query('UPDATE subscription set is_confirmed = false where product_id = ? and user_id = ?',[product.product_id,req.body.user_id]);
													con.query('UPDATE products SET available_quantity = available_quantity + ? where product_id = ?',[product.product_quantity,product.product_id],(error,results)=>{
																	if(error){
																		console.log(new Response());
																	} else {
																		if(results.affectedRows){
																				console.log(new Response(200,"order cancelled  successfully"));
																		} else{
																				console.log(new Response(400,"error updating products"));
																			
																			 }
																		} 
																});
														}
														res.json(new Response(200,"order cancelled successfully"));

										}
									else{
										return(new Response(400,"user does not exists"));
									}
									}	
					});
					
					}
			else{
				console.log("order details table not updated");
			}
				}
		
    
});
}




/*  fetching all orders by user_id  */
exports.getOrder = (req,res)=>{
	con.query('SELECT * from orders where user_id = ?',[req.params.user_id], (error, results,fields)=>
    {
        if (error) {
			console.log(error);
            res.json (new Response());
		} else {
			if (results[0]){
				res.json(new Response(200,"Orders list",results));
			}
			else{
				res.json(new Response(400,"no orders yet"));
			}
		}
	});
}
