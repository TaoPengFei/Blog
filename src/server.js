
'use strict';

import path from 'path'
import ProjectCore from 'project-core';

const $ = global.$ = new ProjectCore();
// const $ =  new ProjectCore();

//加载配置文件
$.init.add((done)=>{
    $.config.load(path.resolve(__dirname,'config.js'));
    const env = process.env.NODE_ENV || null;
    if (env) {
        $.config.load(path.resolve(__dirname,'../config',env + '.js'));
    }
    $.env = env;
    done();
});

//初始化MongoDB
$.init.load(path.resolve(__dirname,'init','mongodb.js'));
//加载Modles
$.init.load(path.resolve(__dirname,'models'));


//初始化
$.init((err)=>{
    if (err)  {
        console.error(err);
        process.exit(-1);
    } else {
        console.log("inited..." + $.env);
    }

    const item = new $.model.User({
        name: `User${$.utils.date('Ymdhs')}`,
        password: '121212',
        nickname: 'TEST'
    });
    item.save(console.log);

});
