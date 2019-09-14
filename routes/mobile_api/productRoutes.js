var express = require('express');
var router = express.Router();
var productFunction  = require('../../service/mobile-function/productFunction');
var common_function = require('../../common/common_functions');

// to fetch packages for home page
router.get('/get-packages',(req,res,next)=>{
	productFunction.getPackages(req,res);
});

// to fetch product details
router.get('/get-product-details/:product_id',(req,res,next)=>{
	productFunction.getProductDetails(req,res);
});

// to fetch product list
router.get('/get-product-list/:package_id',(req,res,next)=>{
	productFunction.getProductList(req,res);
});

// to fetch product images based on product id
router.get('/get-product-images/:product_id',(req,res,next)=>{
	productFunction.getProductImages(req,res);
});

// to fetch product images based on product id
router.get('/get-nutrition-images/:product_id',(req,res,next)=>{
	productFunction.getNutritionImages(req,res);
});


// to fetch similar products
router.get('/get-similar-products/:product_type',(req,res,next)=>{
	productFunction.getSimilarProducts(req,res);
});


// to fetch product review
router.get('/get-product-review/:product_id',(req,res,next)=>{
	productFunction.getProductReviews(req,res);
});

// to add product to cart 
router.post('/add-to-cart',(req,res,next)=>{
	productFunction.addToCart(req,res);
});

// to list products of cart 
router.get('/add-to-cart/:user_id',(req,res,next)=>{
	productFunction.listCartItems(req,res);
});

// to delete a product of cart 
router.delete('/add-to-cart/',(req,res,next)=>{
	productFunction.deleteCartItems(req,res);
});



// to add card_details  
router.post('/add-card',(req,res,next)=>{
	productFunction.addCard(req,res);
});

// to delete card_details  
router.delete('/add-card',(req,res,next)=>{
	productFunction.deleteCard(req,res);
});

// to fetch availale subscriptions
router.get('/get-subscription/',(req,res,next)=>{
	productFunction.getSubscription(req,res);
});


module.exports = router;
