var Product = /** @class */ (function () {
    function Product(product_name, product_des, product_price, available_quantity, product_type, product_creation_date, product_update_date) {
        this.product_name = product_name;
        this.product_des = product_des;
        this.product_price = product_price;
        this.available_quantity = available_quantity;
        this.product_type = product_type;
        this.product_creation_date = product_creation_date;
        this.product_update_date = product_update_date;
        
        
    }
    return Product;
}());
module.exports = Product;