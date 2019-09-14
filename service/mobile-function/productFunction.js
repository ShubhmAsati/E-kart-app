var con = require('../../config/db_config.js');
var bodyParser = require('body-parser');
var exports = module.exports = {};
var Response = require('../../models/Response');


// to fetch package name and package id from packages for home page
exports.getPackages = (req,res)=>{
	con.query('SELECT package_id,package_name FROM package ', (error, results)=>
    {
        if (error) {
            res.json (new Response());
		} else {
			if (results[0]){			
			res.json(new Response(200,"list of packages",results));
		}
		else{
			res.json(new Response(400,"user does not exists"));
		}
		}
    
});

}


// to fetch product details based on product id
exports.getProductDetails = (req,res)=>{
	console.log(req.params.product_id);
	con.query('SELECT products.product_id,products.product_name,products.product_price,products.available_quantity,products.product_des,products.product_category,avg(review.rating_star) AS rating FROM products inner join review on products.product_id = review.product_id where products.product_id = ? group by (products.product_id)',[req.params.product_id], (error, results)=>
    {
        
		if (error) {
			console.log(error);
            res.json(new Response());
		}
		else {
			
			console.log(results);
			if (results[0]){
			
			res.json(new Response(200,"product details",results));
		}
		else{
			res.json(new Response(400,"invalid product"));
		}
		}
    
});

}


// to fetch similar product list based on product type
exports.getProductDetails = (req,res)=>{
	console.log(req.params.product_id);
	con.query('SELECT products.product_id,products.product_name,products.product_price,products.available_quantity,products.product_category FROM products where product_type = ?',[req.params.product_type], (error, results)=>
    {
        
		if (error) {
			console.log(error);
            res.json(new Response());
		}
		else {
			
			console.log(results);
			if (results[0]){
			
			res.json(new Response(200,"list of similar product",results));
		}
		else{
			res.json(new Response(400,"invalid product type"));
		}
		}
    
});

}

// to list image name for a product
exports.getProductImages = (req,res)=>{
	console.log(req.params.product_id);
	con.query('SELECT pic_url ,pic_id FROM product_picture_data where product_id = ?',[req.params.product_id], (error, results)=>
    {
        
		if (error) {
			console.log(error);
            res.json(new Response());
		}
		else {
			
			console.log(results);
			if (results[0]){
			
			res.json(new Response(200,"list of product images",results));
		}
		else{
			res.json(new Response(400,"invalid product type"));
		}
		}
    
});

}

// to list image nutrition for a product
exports.getNutritionImages = (req,res)=>{
	console.log(req.params.product_id);
	con.query('SELECT pic_url ,pic_id FROM nutrition where product_id = ?',[req.params.product_id], (error, results)=>
    {
        
		if (error) {
			console.log(error);
            res.json(new Response());
		}
		else {
			
			console.log(results);
			if (results[0]){
			
			res.json(new Response(200,"list of product nutrition",results));
		}
		else{
			res.json(new Response(400,"invalid product type"));
		}
		}
    
});

}

// to fetch product list based on package id
exports.getProductList = (req,res)=>{
	
	con.query('SELECT products.product_id,products.product_name,products.product_price,products.available_quantity,products.product_category FROM products inner join package_products on products.product_id = package_products.product_id where package_products.package_id = ?',[req.params.package_id], (error, results)=>
    {
        
		if (error) {
	
            res.json(new Response());
		}
		else {
			
			
			if (results[0]){
			
			res.json(new Response(200,"list of products",results));
		}
		else{
			res.json(new Response(400,"no packages for this product"));
		}
		}
    
});

}


// to fetch review based on product id
exports.getProductReviews = (req,res)=>{

	con.query('SELECT review,reviewer_name,review_date,rating_star from review where product_id = ?',[req.params.product_id], (error, results)=>
    {
        
		if (error) {
			
            res.json(new Response());
		}
		else {
			
			
			if (results[0]){
			
			res.json(new Response(200,"list of reviews",results));
		}
		else{
			res.json(new Response(400,"no reviews"));
		}
		}
    
});

}

// to add product  in cart and add subscription
exports.addToCart = (req,res)=>{
	let products = req.body;
	if (products.subscription){
	con.query('INSERT INTO subscription (product_id,subscription_id,user_id) VALUES (?,?,?) ',[products.product_id,products.subscription_id,products.user_id], (error, results)=>
    {	if (error) {
		   res.json(new Response());
		}else {
			if (results){	
			console.log(new Response(200,"subscription added ",results));
				}	else{
							console.log(new Response(400,"no reviews"));
				}
				}
			});
	}			
		con.query('INSERT INTO cart (product_id,user_id,prod_quantity,subscription) VALUES (?,?,?,?) ',[products.product_id,products.user_id,products.prod_quantity,products.subscription], (error, results)=>
    {	if (error) {
		   res.json(new Response());
		}else {
			if (results.affectedRows){	
			console.log(results);
			res.json(new Response(200,"product added to cart"));
				}	else{
							console.log(new Response(400,"product is not added to cart"));
				}
				}
			});	
	
	}




// to retrieve cart items for a user
exports.listCartItems = (req,res)=>{

	con.query('SELECT cart.user_id,cart.product_id,cart.prod_quantity,cart.product_add_date,products.product_name AS product_name,products.product_des AS product_des,products.product_price AS product_price,sd.subscription_frequency AS frequency , sd.subscription_discount AS discount,products.available_quantity FROM cart inner join products on cart.product_id = products.product_id and cart.user_id = ? left join subscription on cart.product_id = subscription.product_id and cart.user_id = subscription.user_id left join subscription_details sd on subscription.subscription_id = sd.subscription_id  ',req.params.user_id, (error, results)=>
    {
        
		if (error) {
			
			
            res.json(new Response());
		}
		else {
			
			console.log(results);
			if (results[0]){
			
			res.json(new Response(200,"Card details added",results));
		}
		else{
			res.json(new Response(400,"no reviews"));
		}
		}
    
});

}

	

// to delete cart items of a user
exports.deleteCartItems = (req,res)=>{
	
	let products = req.body;
	for (index in products){
	if(products[index].subscription){
		
		con.query('DELETE from subscription where user_id = ? and product_id = ?',[products[index].user_id,products[index].product_id], (error, results)=>
			{
			
				if (error) {			
				
				console.log(new Response());
			}
				else {
			
				if (results.affectedRows){
			
				console.log(new Response(200,"subscription removed successfully",results));
			}
			else{
			console.log(new Response(400,"error in removing subscription"));
			}
			}
    
		});		
	}
	con.query('DELETE from cart where user_id = ? and product_id = ?',[products[index].user_id,products[index].product_id],(error, results)=>
    {
        
		if (error) {			
            res.json(new Response());
		}
		else {
			if (results.affectedRows){
			
			res.json(new Response(200,"product removed from cart"));
		}
		else{
			res.json(new Response(400,"error in removing product"));
		}
		}
    
	});	
	}
}
	

// to save card details
exports.addCard = (req,res)=>{

	con.query('INSERT INTO cards SET ?',req.body, (error, results)=>
    {
        
		if (error) {
			
			
            res.json(new Response());
		}
		else {
			
			
			if (results.affectedRows){
			
			res.json(new Response(200,"Card details added",results));
		}
		else{
			res.json(new Response(400,"no reviews"));
		}
		}
    
});

}

// to delete card details
exports.deleteCard = (req,res)=>{

	con.query('DELETE FROM cards where user_id = ? and card_number = ?',[req.body.user_id,req.body.card_number], (error, results)=>
    {
        
		if (error) {
			
			
            res.json(new Response());
		}
		else {
			
			
			if (results.affectedRows){
			
			res.json(new Response(200,"Card details deleted",results));
		}
		else{
			res.json(new Response(400,"no such card "));
		}
		}
    
});

}

// to fetch subscription list
exports.getSubscription = (req,res)=>{

	con.query('SELECT * FROM subscription_details', (error, results)=>
    {
        
		if (error) {
			
			
            res.json(new Response());
		}
		else {
			
			
			if (results[0]){
			
			res.json(new Response(200,"subscription list",results));
		}
		else{
			res.json(new Response(400,"no subscription found"));
		}
		}
    
});

}