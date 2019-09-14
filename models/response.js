var Response = /** @class */ (function () {
    function Response(status, message, data) {
        if (status === void 0) { status = 500; }
        if (message === void 0) { message = "Internal Server Error"; }
        if (data === void 0) { data = {}; }
        this.data = data;
        this.status = status;
        this.message = message;
    }
    return Response;
}());
module.exports = Response;