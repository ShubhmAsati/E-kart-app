var express = require("express");
var path = require('path');
var port = 8081;


var app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});


// User Api's
var m_user = require('./routes/mobile_api/userRoutes');
app.use('/api/muser',m_user);

var m_product = require('./routes/mobile_api/productRoutes');
app.use('/api/mproduct',m_product);

var m_order = require('./routes/mobile_api/orderRoutes');
app.use('/api/morder',m_order);


// Products Api's
var admin = require('./routes/web-api/adminRoutes');
app.use('/api',admin);


app.use(express.static(path.join(__dirname, 'public')));
//Mail Box Api's

var mailBox = require('./routes/common-api/commonRoutes');
app.use('/api',mailBox);


/*listen to the port*/

app.listen(port,function(){
    console.log("server is now running on port....."+port);
});


