var Review = /** @class */ (function () {
    function Review(review,reviewer_name,review_date,rating_star,review_id) {
        this.review = review,
        this.reviewer_name = reviewer_name,
        this.review_date = review_date,
        this.rating_star = rating_star,
        this.review_id = review_id
    }
    return Review;
}());
module.exports = Review;