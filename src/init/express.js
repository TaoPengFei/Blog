import express from 'express';
import serveStatic from 'serve-static';
import bodyParser from 'body-parser';
import path from 'path';

module.exports = function (done) {

    const debug = $.createDebug('初始化Express');
    debug('路由生效..');

    const app = express();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));

    const router = express.Router();
    $.router = router;

    app.use(router);
    app.use('/static',serveStatic(path.resolve(__dirname,'../../static')));

    app.listen($.config.get('web.port'),(err)=>{
        done(err);
    });
}
