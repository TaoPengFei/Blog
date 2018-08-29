module.exports = function (set, get, has) {
    set('db.mongodb','mongodb://127.0.0.1/Blog');
    set('web.port','8080');
    /*if (has("dev")) {

    }*/
};
