
'use strict';

import path from 'path';
import ProjectCore from 'project-core';
import createDebug from 'debug';

const $ = global.$ = new ProjectCore();
// const $ =  new ProjectCore();


//创建Debug
$.createDebug = function(name) {
  return createDebug('Blog: ' + name);
};

const debug = $.createDebug('server');

//加载配置文件
$.init.add((done)=>{
    $.config.load(path.resolve(__dirname,'config.js'));
    const env = process.env.NODE_ENV || null;
    if (env) {
        debug('当前环境为: %s', env);
        $.config.load(path.resolve(__dirname,'../config',env + '.js'));
    }
    $.env = env;
    done();
});

//初始化MongoDB
$.init.load(path.resolve(__dirname,'init','mongodb.js'));
//加载Modles
$.init.load(path.resolve(__dirname,'models'));

//加载methods
$.init.load(path.resolve(__dirname,'methods'));

//初始化Express
$.init.load(path.resolve(__dirname,'init','express.js'));
//加载Modles
$.init.load(path.resolve(__dirname,'routes'));



//初始化
$.init((err)=>{
    if (err)  {
        console.error(err);
        process.exit(-1);
    } else {
        console.log("inited..." + $.env);
    }

    /*const item = new $.model.User({
        name: `User${$.utils.date('Ymdhs')}`,
        password: '121212',
        email: '302665611@qq.com',
        nickname: 'TEST'
    });*/
    // item.save(console.log);

    require('./test');

});

