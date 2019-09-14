var express = require("express");
var router = express.Router();
var empty = require('is-empty');
var fn  = require('../../service/web-function/admin-function');
var path = require('path');
var multer = require('multer');



//...........Product Api................//
// Add Product

router.post("/product",function(req,res){
    fn.addProduct(req,res,empty);
});

//Update Product

router.put("/product",function(req,res){
    fn.updateProduct(req,res,empty);
});

//Get All Products

router.get("/products",function(req,res){
    fn.getAllProducts(req,res,empty);
});

//Get Specific Product 

router.get("/product/:p_id",function(req,res){
    fn.getProductDetails(req,res,empty);
});

// Delete Product

router.delete("/product/:p_id",function(req,res){
    fn.deleteProducts(req,res,empty);
});


//...........Postal Address Apis................//
// Add Postal Address

router.post("/postalCode",function(req,res){
    fn.addPostalCode(req,res,empty);
});

//Update Postal Address

router.put("/postalCode",function(req,res){
    fn.updatePostalCode(req,res,empty);
});

//Get All Postal Address

router.get("/postalCode",function(req,res){
    fn.getAllPostalCodes(req,res,empty);
});


// Delete Postal Address

router.delete("/postalCode/:pincode",function(req,res){
    fn.deletePostalCode(req,res,empty);
});


//...........Notification Apis................//
// Add notification

router.post("/notification",function(req,res){
    fn.addNotification(req,res,empty);
});

//Update notification

router.put("/notification",function(req,res){
    fn.updateNotification(req,res,empty);
});

//Get All notification

router.get("/notification",function(req,res){
    fn.getAllNotification(req,res,empty);
});

//Delete all expired notifications

router.delete("/notification",function(req,res){
    fn.deleteNotification(req,res,empty);
});




//...........Support Apis................//
// Add Support Details

router.post("/support",function(req,res){
    fn.addSupport(req,res,empty);
});

//Update Support Details

router.put("/support",function(req,res){
    fn.updateSupport(req,res,empty);
});

//Get All  Support Details

router.get("/support",function(req,res){
    fn.getAllSupport(req,res,empty);
});

//Delete Support Detail

router.delete("/support/:support_id",function(req,res){
    fn.deleteSupport(req,res,empty);
});



//...........Order Apis................//

// get all orders
router.get("/orderHistory",function(req,res){
    fn.getorders(req,res,empty);
});


//update order status

router.put("/updateOrderStatus",function(req,res){
    fn.updateOrderStatus(req,res,empty);
});

// assign driver to order

router.post("/assignDriver",function(req,res){
    fn.assignDriver(req,res,empty);
});



//...........Package Apis................//

//Create new package
router.post("/package",function(req,res){
    fn.createPackage(req,res,empty);
});


// get all package

router.get("/package",function(req,res){
    fn.getPackages(req,res,empty);
});

//update pacakge

router.put("/package",function(req,res){
    fn.updatePackage(req,res,empty);
});

// delete package

router.delete("/package/:package_id",function(req,res){
    fn.deletePackage(req,res,empty);
});

// add product to package

router.post("/addPackageProduct",function(req,res){
    fn.addPackageProductport(req,res,empty);
});

//get package products 

router.get("/getPackageProduct",function(req,res){
    fn.getPackageProduct(req,res,empty);
});


//delete package product

router.delete("/deletePackageProduct",function(req,res){
    fn.deletePackageProduct(req,res,empty);
});



//...........Subscription Details Apis................//


// add subscription details

router.post("/subscriptionDetails",function(req,res){
    fn.addSubscriptionDetails(req,res,empty);
});

//get subscription details

router.get("/subscriptionDetails",function(req,res){
    fn.getSubscriptionDetails(req,res,empty);
});


//delete subscription details

router.delete("/subscriptionDetails/:subscription_id",function(req,res){
    fn.deleteSubscriptionDetails(req,res,empty);
});

//update subscription details

router.put("/subscriptionDetails",function(req,res){
    fn.updateSubscriptionDetails(req,res,empty);
});


// //...........Discount Details Apis................//


// // add discount details

// router.post("/discount",function(req,res){
//     fn.addDiscount(req,res,empty);
// });

// //get discount details

// router.get("/discount",function(req,res){
//     fn.getDiscount(req,res,empty);
// });


// //delete discount details

// router.delete("/discount/:discount_id",function(req,res){
//     fn.deleteDiscount(req,res,empty);   
// });

// //update discount details

// router.put("/discount",function(req,res){
//     fn.updateDiscount(req,res,empty);
// });




//...........Bulk order Details Apis................//


// add bulk order details

router.post("/bulkOrder",function(req,res){
    fn.addBulkOrder(req,res,empty);
});

//get bulk order details

router.get("/bulkOrder",function(req,res){
    fn.getBulkOrder(req,res,empty);
});


//delete bulk order details

router.delete("/bulkOrder/:bulk_orders_id",function(req,res){
    fn.deleteBulkOrder(req,res,empty);   
});

//update bulk order details

router.put("/bulkOrder",function(req,res){
    fn.updateBulkOrder(req,res,empty);
});



//................Review Api's.................//


// get all review

router.get("/adminReview/:product_id",function(req,res){
    fn.getAllReviews(req,res,empty);
});

// delete review

router.delete("/adminReview/:review_id",function(req,res){
    fn.deleteReview(req,res,empty);
});



//.............upload image............//

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

router.post('/upload-product-image',upload.array('photo',5), function (req, res) {
    
	console.log(req.files);
	if (!req.files) {
        console.log("No file received");
        res.json({
          check: false
        });
    
      } else {
        console.log('file received = '+ req.files);
        
		res.json({
          status: "400",
		  message:"product images uploaded uploaded succesfully",
		  imagePath:req.files
		});
		
		
	  
	  }
});


router.post('/upload-nutrition-images/:product_id',upload.array('photo',5), function (req, res) {
    
	if (!req.files) {
        console.log("No file received");
        res.json({
          check: false
        });
    
      } else {
        console.log('file received = '+ req.files);
        
		fn.addNutritionImages(req,res);
		
	  
	  }
});
module.exports = router;