var con = require("../../config/db_config");
var exports = (module.exports = {});
var product = require("../../models/product");
var Response = require("../../models/response");
var dateTime = require("node-datetime");


/************* Admin Product Functions *************/

// Add Product Function

exports.addProduct = function(req, res, empty) {
  var pic_product_id;
  dt = dateTime.create();
  formatted = dt.format("Y-m-d H:M:S");
  newProduct = new product(
    req.body.product_name,
    req.body.product_des,
    req.body.product_price,
    req.body.available_quantity,
    req.body.product_type,
    formatted,
    formatted
  );
    var images_path = req.body.images_path;
  con.query("insert into products set ?", newProduct, function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.insertId) {
        pic_product_id = results.insertId;
        for(var i=0;i < images_path.length;i++){
          pic_data = {
            product_id:pic_product_id,
            pic_url:images_path[i]
          }
          con.query("insert into product_picture_data set ?",[pic_data],function(error,result){
            if(error){
              console.log("Failed to add product picture in database: "+error);  
            } else{
            console.log("Product picture added successfully.");
            }
          });
        }
        // res.json(new Response(200, "Product Added Successfully."));
      } else {
        res.json(new Response(400, "Failed to add product"));
      }
    }
    res.json(new Response(200, "Product Added Successfully."));
  });
};

// get all products present in db
exports.getAllProducts = function(req, res, empty) {
  con.query(
    "select product_id,product_name,product_des,product_price,product_type from products",
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "List of Products", results);
          res.json(Response);
        } else {
          res.json(new Response(400, "No products in database."));
        }
      }
    }
  );
};

// get sepecific product details

exports.getProductDetails = function(req, res, empty) {
  con.query(
    "SELECT * FROM products prod where prod.product_id = ?",
    [req.params.p_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "Product Details", results[0]);
          res.json(response);
        } else {
          res.json(new Response(400, "product does not exists in database."));
        }
      }
    }
  );
};

// delete product method
exports.deleteProducts = function(req, res, empty) {
  con.query(
    "delete from products where product_id = ?",
    [req.params.p_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          console.log(results);

          res.json(new Response(200, "Product deleted successfully."));
        } else {
          res.json(new Response(400, "product does not exists in database."));
        }
      }
    }
  );
};

// update product method
exports.updateProduct = function(req, res, empty) {
  dt = dateTime.create();
  formatted = dt.format("Y-m-d H:M:S");
  updatProduct = {
    product_name: req.body.product_name,
    product_des: req.body.product_des,
    product_price: req.body.product_price,
    available_quantity: req.body.available_quantity,
    product_type: req.body.product_type,
    product_update_date: formatted
  };

  con.query(
    "update products set ? where product_id = ?",
    [updatProduct, req.body.product_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Product updated successfully"));
        } else {
          res.json(new Response(400, "Failed to update product"));
        }
      }
    }
  );
};

/************* Postal Code Functions *************/

// add Postal Code

exports.addPostalCode = function(req, res) {
  postalDetails = {
    pincode: req.body.pincode,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country
  };

  con.query("insert into pincode_data set ?", postalDetails, function(
    error,
    results
  ) {
    if (error) {
      res.json(new Response(400,"Pincode already exist"));
    } else {
        
      if (results.affectedRows) {
        res.json(new Response(200, "Postal Code Details Added Successfully."));
      } else {
        res.json(new Response(400, "Failed to add postal code details"));
      }
    }
  });
};

// update postal code

exports.updatePostalCode = function(req, res) {
    postalDetails = {
    pincode: req.body.pincode,
    street: req.body.street,
    city: req.body.city,
    state: req.body.state,
    country: req.body.country
  };

  con.query("update pincode_data set ? where pincode = ?", [postalDetails,postalDetails.pincode], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "Postal Code Details Updated Successfully."));
      } else {
        res.json(new Response(400, "Failed to update postal code details"));
      }
    }
  });
};

// get all postal codes

exports.getAllPostalCodes = function(req, res) {
    
  con.query("select * from pincode_data", function(error, results) {
    if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "All Postal Code", results);
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to get postal code"));
        }
      }
  });
};

// delete postal code


exports.deletePostalCode = function(req, res) {
    
    con.query("delete from pincode_data where pincode = ?",[req.params.pincode],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Postal code deleted successfully."));
        } else {
          res.json(new Response(400, "postal code does not exists in database."));
        }
      }
    });
  };


  /************* Notification Functions *************/

  // add new notification

  exports.addNotification = function(req, res) {
    dt = dateTime.create();
    formatted = dt.format("Y-m-d H:M:S");
    notification = {
      notification_data: req.body.notification_data,
      creation_date: formatted,
      expiry_date: req.body.expiry_date,
      updated_at: formatted,
    };
  
    con.query("insert into notification set ?", notification, function(
      error,
      results
    ) {
      if (error) {
        res.json(new Response(400,"notification already exist"));
      } else {
          
        if (results.affectedRows) {
          res.json(new Response(200, "Notification Added Successfully."));
        } else {
          res.json(new Response(400, "Failed to add notification"));
        }
      }
    });
  };
  
  // update notification
  
  exports.updateNotification = function(req, res) {
    dt = dateTime.create();
    formatted = dt.format("Y-m-d H:M:S");
    notification = {
      notification_data: req.body.notification_data,
      expiry_date: req.body.expiry_date,
      updated_at: formatted,
    };
  
    con.query("update notification set ? where notification_id = ?", [notification,req.body.notification_id], function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Notification Updated Successfully."));
        } else {
          res.json(new Response(400, "Failed to update notification"));
        }
      }
    });
  };
  
  // get all notification
  
  exports.getAllNotification = function(req, res) {
      
    con.query("select * from notification", function(error, results) {
      if (error) {
          res.json(new Response());
        } else {
          if (results.length != 0) {
            response = new Response(200, "All notification", results);
            res.json(response);
          } else {
            res.json(new Response(400, "Failed to get notification"));
          }
        }
    });
  };
  

 


  function deleteNotificationById(notification_id) {
    
  con.query("delete from notification where notification_id = ?",[notification_id],
  function(error, results) {
    if (error) {
      console.log(new Response());
    } else {
      if (results.affectedRows) {
        console.log(new Response(200, "Notification deleted successfully."));
      } else {
        console.log(new Response(400, "Notification does not exists in database."));
      }
    }
  });
};

 // delete Notification

exports.deleteNotification = function(req,res){

      dt = dateTime.create();
    formatted = dt.format("Y-m-d");
    
   con.query("select notification_id from notification where expiry_date = ?",formatted,function(error, results){
        if(error){
            console.log("Error: "+ error);
            res.json(new Response());
        } else{
          console.log(results);
          
            if(results.length != 0){
              for (var i = 0; i < results.length; i++) {
                    deleteNotificationById(results[i]);
                }
                res.json(new Response(200, "Notifications deleted successfully."));
            }
            else {
              res.json(new Response(200, "Notifications are not expired"));
            }
        }

    })
  
}


//...........Support Functions................//

//add support details

exports.addSupport = function(req, res) {
  support = {
    contact_no: req.body.contact_no,
    message: req.body.message
  };

  con.query("insert into support set ?", support, function(
    error,
    results
  ) {
    if (error) {
      console.log(error);
      
      res.json(new Response());
    } else {
        
      if (results.affectedRows) {
        res.json(new Response(200, "Support Details Added Successfully."));
      } else {
        res.json(new Response(400, "Failed to add support details"));
      }
    }
  });
};

// update postal code

exports.updateSupport = function(req, res) {
  support = {
    contact_no: req.body.contact_no,
    message: req.body.message
  };

  con.query("update support set ? where support_id = ?", [support,req.body.support_id], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "support Details Updated Successfully."));
      } else {
        res.json(new Response(400, "Failed to update support details"));
      }
    }
  });
};

// get all postal codes

exports.getAllSupport = function(req, res) {
    
  con.query("select * from support", function(error, results) {
    if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "All support details", results);
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to get support details"));
        }
      }
  });
};

// delete postal code


exports.deleteSupport = function(req, res) {
    
    con.query("delete from support where support_id = ?",[req.params.support_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Support detail deleted successfully."));
        } else {
          res.json(new Response(400, "Support detail does not exists in database."));
        }
      }
    });
  };


//...........Order Functions................//  

//get order history

exports.getorders = function(req, res) {
    
  con.query("SELECT us.user_id,us.user_name,ord.order_id,ord.order_status,ord.order_place_date,ord.order_amount,\
  ord.order_pincode,ord.payment_method,addr.address_line1,addr.address_line2,addr.city,addr.state,\
  addr.country,ord_d.product_quantity,prod.product_name,prod.product_price,prod.available_quantity\
   from users us inner join orders ord on us.user_id = ord.user_id\
    inner join address addr on ord.delivery_address_id = addr.address_id\
     inner join order_details ord_d on ord.order_id = ord_d.order_id\
      inner join products prod on prod.product_id = ord_d.product_id\
       where addr.address_type ='d'", function(error, results) {
    if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "All orders details", results);
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to get orders details"));
        }
      }
  });
};

// update order status

exports.updateOrderStatus = function(req,res){

  order = {
    order_status: req.body.order_status,
  };

  con.query("update orders set ? where order_id = ?", [order,req.body.order_id], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "Order status Updated Successfully."));
      } else {
        res.json(new Response(400, "Failed to update order status"));
      }
    }
  });
};


//assign driver 

exports.assignDriver = function(req,res){

  driver = {
    order_id: req.body.order_id,
    driver_contact_no: req.body.driver_contact_no
  };

  con.query("insert into assigned_drivers set ?", [driver], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "driver assign to order_id: "+driver.order_id+" Successfully."));
      } else {
        res.json(new Response(400, "Failed to assign driver"));
      }
    }
  });
};


//...........Package Functions................//  

//create package
exports.createPackage = function(req, res) {
  productPackage = {
    package_name: req.body.package_name,
    
  };

  con.query("insert into package set ?", productPackage, function(
    error,
    results
  ) {
    if (error) {
      res.json(new Response());
    } else {
        
      if (results.affectedRows) {
        res.json(new Response(200, "Package Added Successfully."));
      } else {
        res.json(new Response(400, "Failed to add package"));
      }
    }
  });
};

// update package

exports.updatePackage = function(req, res) {
  productPackage = {
    package_name: req.body.package_name,
    
  };

  con.query("update package set ? where package_id = ?", [productPackage,req.body.package_id], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "package Updated Successfully."));
      } else {
        res.json(new Response(400, "Failed to update package"));
      }
    }
  });
};

// get all packages

exports.getPackages = function(req, res) {
    
  con.query("select package_id,package_name from package", function(error, results) {
    if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "All packages", results);
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to get packages"));
        }
      }
  });
};

// delete package


exports.deletePackage = function(req, res) {

  con.query("delete from package_products where package_id = ?",[req.params.package_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          console.log(new Response(200, "product deleted successfully."));
        } else {
          console.log(new Response(400, "product does not exists in package."));
        }
      }
    });
    
    con.query("delete from package where package_id = ?",[req.params.package_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Package deleted successfully."));
        } else {
          res.json(new Response(400, "Package does not exists in database."));
        }
      }
    });
  };


  //add product to package

  exports.addPackageProductport = function(req,res){
    var pacakageProduct = {
      package_id:req.body.package_id,
      product_id:req.body.product_id
      
    }

    con.query("select product_id from package_products where package_id = ? and product_id =?",[pacakageProduct.package_id,pacakageProduct.product_id], function(error, results) {
      if (error) {
        
        
        res.json(new Response());
        } else {
          if (results.length != 0) {
            response = new Response(400, "product already exist in the package");
            res.json(response);
          } else {
            
            con.query("insert into package_products set ?",[pacakageProduct], function(error, results) {
              if (error) {
                  res.json(new Response());
                } else {
                  if (results.affectedRows) {
                    response = new Response(200, "product added to package");
                    res.json(response);
                  } else {
                    res.json(new Response(400, "Failed to add product to packages"));
                  }
                }
            });

          }
        }
    });

   
  };

  // get all products of package
  exports.getPackageProduct = function(req,res){
    con.query("select prod.product_name,prod.product_price,prod.product_type,prod.product_id,pa.package_name,pa.package_id from products prod inner join package_products pack on prod.product_id = pack.product_id inner join package pa on pack.package_id = pa.package_id;", function(error, results) {
      if (error) {
          res.json(new Response());
        } else {
          if (results.length != 0) {
            response = new Response(200, "All packages products", results);
            res.json(response);
          } else {
            res.json(new Response(400, "Failed to get packages products"));
          }
        }
    });
  };
 

  //delete package product

  
  exports.deletePackageProduct = function(req, res) {
    
    con.query("delete from package_products where package_id = ? and product_id =?",[req.body.package_id,req.body.product_id],
    function(error, results) {
      if (error) {
        console.log(error);
        
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "package product deleted successfully."));
        } else {
          res.json(new Response(400, "package product does not exists in database."));
        }
      }
    });
  };





  
//...........Subscription Details Functions................//

//add subscription details

exports.addSubscriptionDetails = function(req, res) {
  subcription = {
    subscription_frequency: req.body.subscription_frequency,
    subscription_discount: req.body.subscription_discount
  };

  con.query("insert into subscription_details set ?", subcription, function(
    error,
    results
  ) {
    if (error) {
      console.log(error);
      
      res.json(new Response());
    } else {
        
      if (results.affectedRows) {
        res.json(new Response(200, "Subcription Details Added Successfully."));
      } else {
        res.json(new Response(400, "Failed to add subcription details"));
      }
    }
  });
};

// update subscription details

exports.updateSubscriptionDetails = function(req, res) {
  subcription = {
    subscription_frequency: req.body.subscription_frequency,
    subscription_discount: req.body.subscription_discount
  };

  con.query("update subscription_details set ? where subscription_id = ?", [subcription,req.body.subscription_id], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "Subscription Details Updated Successfully."));
      } else {
        res.json(new Response(400, "Failed to update Subscription details"));
      }
    }
  });
};

// get all subscription details

exports.getSubscriptionDetails = function(req, res) {
    
  con.query("select * from subscription_details", function(error, results) {
    if (error) {
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "All Subscription details", results);
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to get Subscription details"));
        }
      }
  });
};

// delete subscription details


exports.deleteSubscriptionDetails = function(req, res) {
    
    con.query("delete from subscription_details where subscription_id = ?",[req.params.subscription_id],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Subscription detail deleted successfully."));
        } else {
          res.json(new Response(400, "Subscription detail does not exists in database."));
        }
      }
    });
  };


//   //...........Discount Details Functions................//

// //add discount details

// exports.addDiscount = function(req, res) {
//   discount  = {
//     discount_percentage: req.body.discount_percentage,
//     product_quantity: req.body.product_quantity
//   };

//   con.query("insert into discounts set ?", discount, function(
//     error,
//     results
//   ) {
//     if (error) {
//       console.log(error);
      
//       res.json(new Response());
//     } else {
        
//       if (results.affectedRows) {
//         res.json(new Response(200, "Discount Details Added Successfully."));
//       } else {
//         res.json(new Response(400, "Failed to add Discount details"));
//       }
//     }
//   });
// };

// // update discount details

// exports.updateDiscount = function(req, res) {
//   discount  = {
//     discount_percentage: req.body.discount_percentage,
//     product_quantity: req.body.product_quantity
//   };

//   con.query("update discounts set ? where discount_id = ?", [discount,req.body.discount_id], function(error, results) {
//     if (error) {
//       res.json(new Response());
//     } else {
//       if (results.affectedRows) {
//         res.json(new Response(200, "Discount Details Updated Successfully."));
//       } else {
//         res.json(new Response(400, "Failed to update discount details"));
//       }
//     }
//   });
// };

// // get all discount details

// exports.getDiscount = function(req, res) {
    
//   con.query("select * from discounts", function(error, results) {
//     if (error) {
//         res.json(new Response());
//       } else {
//         if (results.length != 0) {
//           response = new Response(200, "All discount details", results);
//           res.json(response);
//         } else {
//           res.json(new Response(400, "Failed to get discount details"));
//         }
//       }
//   });
// };

// // delete discount details


// exports.deleteDiscount = function(req, res) {
    
//     con.query("delete from discounts where discount_id = ?",[req.params.discount_id],
//     function(error, results) {
//       if (error) {
//         res.json(new Response());
//       } else {
//         if (results.affectedRows) {
//           res.json(new Response(200, "Discount detail deleted successfully."));
//         } else {
//           res.json(new Response(400, "Discount detail does not exists in database."));
//         }
//       }
//     });
//   };


    //...........Bulk Order Details Functions................//

//add bulk order details

exports.addBulkOrder = function(req, res) {
  bulkOrder  = {
    product_id: req.body.product_id,
    discount_percentage:req.body.discount_percentage,
    minimum_quantity:req.body.minimum_quantity
  };

  con.query("insert into bulk_orders set ?", bulkOrder, function(
    error,
    results
  ) {
    if (error) {
      console.log(error);
      
      res.json(new Response());
    } else {
        
      if (results.affectedRows) {
        res.json(new Response(200, "Bulk order Details Added Successfully."));
      } else {
        res.json(new Response(400, "Failed to add bulk order details"));
      }
    }
  });
};

// update bulk order details

exports.updateBulkOrder = function(req, res) {
  bulkOrder  = {
    product_id: req.body.product_id,
    discount_percentage:req.body.discount_percentage,
    minimum_quantity:req.body.minimum_quantity
  };

  con.query("update bulk_orders set ? where bulk_orders_id = ?", [bulkOrder,req.body.bulk_orders_id], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.affectedRows) {
        res.json(new Response(200, "Bulk order Details Updated Successfully."));
      } else {
        res.json(new Response(400, "Failed to update bulk order details"));
      }
    }
  });
};

// get all bulk order details

exports.getBulkOrder = function(req, res) {
    
  con.query("select bulk.bulk_orders_id,prod.product_id,prod.product_name,prod.product_des,bulk.discount_percentage,bulk.minimum_quantity from bulk_orders bulk inner join  products prod on prod.product_id = bulk.product_id where bulk_orders_status = '1'", function(error, results) {
    if (error) {
      console.log(error);
      
        res.json(new Response());
      } else {
        if (results.length != 0) {
          response = new Response(200, "All bulk order details", results);
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to get bulk order details"));
        }
      }
  });
};

// delete bulk order details


exports.deleteBulkOrder = function(req, res) {
    
    con.query("update bulk_orders set bulk_orders_status = 0 where bulk_orders_id = ?",[req.params.bulk_orders_id],
    function(error, results) {
      if (error) {
        
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          res.json(new Response(200, "Bulk order detail deleted successfully."));
        } else {
          res.json(new Response(400, "Bulk order detail does not exists in database."));
        }
      }
    });
  };


//..............Review Function..............//

// get all review of product

exports.getAllReviews = function(req, res) {

  con.query("select review,reviewer_name,review_date,rating_star,review_id from review where product_id = ? and deleted = 1", [req.params.product_id], function(error, results) {
    if (error) {
      res.json(new Response());
    } else {
      if (results.length !=0) {
        res.json(new Response(200, "All reviews fetched successfully",results));
      } else {
        res.json(new Response(400, "Failed to get products"));
      }
    }
  });
};

// delete review

exports.deleteReview = function(req, res) {
    
  con.query("update review set deleted = 0 where review_id =?",[req.params.review_id], function(error, results) {
    if (error) {
        res.json(new Response());
      } else {
        
        if (results.affectedRows) {
          response = new Response(200, "Review deleted successfully");
          res.json(response);
        } else {
          res.json(new Response(400, "Failed to delete review"));
        }
      }
  });
};


 

// adding nutrition images
 
  
 exports.addNutritionImages = function(req, res) {
	imagess =req.files;
	for (index in imagess){
    con.query("INSERT INTO nutrition (product_id,pic_url) VALUES (?,?)",[req.params.product_id,imagess[index].filename],
    function(error, results) {
      if (error) {
        res.json(new Response());
      } else {
        if (results.affectedRows) {
          console.log("Nutrition Images addedd successfully.");
        } 
      }
    });
	
	}
	res.json(new Response(200, "Nutrition Images addedd successfully."));
  }; 
