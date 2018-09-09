'use strict';

// import mongoose from 'mongoose';
import validator from 'validator';

module.exports = function (done) {


    $.method('user.add').check({
        name: {required: true, validata: (v) => validator.isLength(v,{min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
        email: {required: true, validata: (v) => validator.isEmail(v)},
        password: {required: true, validate: (v) => validator.isLength(v,{min: 6}) }
    });

    //添加
    $.method('user.add').register(async function (params, callback) {

        params.name = params.name.toLowerCase();

        {
            const user = await $.method('user.get').call({name: params.name});
            if (user) {
                return callback(new Error(`用户 ${params.name} 已经存在.`));
            }
        }

        {
            const user = await $.method('user.get').call({email: params.email});
            if (user) {
                return callback(new Error(`用户的邮箱 ${params.email} 已经存在.`))
            }
        }

        params.password = $.utils.encryptPassword(params.password.toString());

        const user = new $.model.User(params)
        user.save(console.log);
    });

    /*$.method('user.get').check({
        _id: {validata: (v) => validator.isMongoId(v)},
        name: {required: true, validata: (v) => validator.isLength(v,{min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
        email: {required: true, validata: (v) => validator.isEmail(v)}
    });*/

    //查询
    $.method('user.get').register(async function (params, callback) {
        const query = {};
        if (params.name) {
            query.name = params.name;
        } else if (params.email) {
            query.email = params.email;
        } else if (params._id) {
            query._id = params._id;
        } else {
            return callback(new Error(`缺失参数 _id|name|email`))
        }
        $.model.User.findOne(query,callback);
    });

    //更新检查
    $.method('user.update').check({
        _id: {validata: (v) => validator.isMongoId(v)},
        name: {required: true, validata: (v) => validator.isLength(v,{min: 4, max: 20}) && /^[a-zA-Z]/.test(v)},
        email: {required: true, validata: (v) => validator.isEmail(v)}
    });

    //更新
    $.method('user.update').register(async function (params, callback) {
        const user = await $.method('user.get').call(params);
        if (!user) {
            return callback(new Error(`用户 ${params.name} 不存在..`));
        }

        const update = {};
        if (params.name && user.name !== params.name) update.name = params.name;
        if (params.email && user.email !== params.email) update.email = params.email;
        if (params.password) update.password = params.password;
        if (params.nickname) update.nickname = params.nickname;
        if (params.about) update.about = params.about;

        $.model.User.update({_id: user._id},{$set: update}, callback);
    });

    done();
}
