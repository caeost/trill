/**
 * Module dependencies.
 * 
 * Balla github inbrowzer editz
 *
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');

var trillho = express();

trillho.configure(function(){
  trillho.set('port', process.env.PORT || 3000);
  trillho.set('views', __dirname + '/views');
  trillho.set('view engine', 'ejs');
  trillho.use(express.favicon());
  trillho.use(express.logger('dev'));
  trillho.use(express.bodyParser());
  trillho.use(express.methodOverride());
  trillho.use(express.cookieParser('your secret here'));
  trillho.use(express.session());
  trillho.use(trillho.router);
  trillho.use(express.static(path.join(__dirname, 'public')));
});

trillho.configure('development', function(){
  trillho.use(express.errorHandler());
});

trillho.get('/', routes.index);
trillho.get('/users', user.list);

http.createServer(trillho).listen(trillho.get('port'), function(){
  console.log("Express server listening on port " + trillho.get('port'));
});
