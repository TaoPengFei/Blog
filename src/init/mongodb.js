'use strict';

import mongoose from 'mongoose';

module.exports = function (done) {
    const conn = mongoose.createConnection($.config.get('db.mongodb'),{useNewUrlParser:true},);
    /*const conn = mongoose.connect($.config.get('db.mongodb'),{useNewUrlParser:true}, function (err) {
        if (err){
            console.log('Connection Error:' + err);
        } else {
            console.log('Connection success!');
        }
    });*/

    $.mongodb = conn;

    $.model = {};

    done();
}
