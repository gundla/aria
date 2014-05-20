var express = require('express');
var app = express();

// other node modules of interest
var _ = require('underscore');

// utils 
var utils = require('./utils/utils');

//  Initialize logger
var logger = require('./utils/logger');
var loggerStream = {
  write: function(message, encoding){
    logger.info(message);
  }
}
function logErrors(err, req, res, next) {
  logger.error(err.stack);
  next(err);
}
function errorHandler(err, req, res, next) {
  logger.error('500: ' + req.path);

  res.status(500);
  //res.redirect('/static/html/404.html');
  next(err);
}

// Initialize configuration properties
var config = require('./config');

app.configure(function(){
  //fix ip for logs
  app.enable('trust proxy');

  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.engine('jade', require('jade').__express);

  app.use(express.json());
  app.use(express.urlencoded());

  app.use(express.methodOverride());

  //access logs
  app.use(express.logger({stream: loggerStream}));

  // routing
  app.use(express.cookieParser());
  app.use(express.session({secret: 'secret'}));

  // set static directory as public and prefex all requests for static resources with static
  app.use(express.static(__dirname + '/static'));
  app.use('/static', express.static(__dirname + '/static'));
  
  app.use(app.router);

  // redirect to custom 404 page
  app.use(function(req, res){
    logger.error('404: ' + req.path);

    res.status(404).sendfile(__dirname + '/static/404.html');
    //res.redirect('/static/html/404.html');
  });

  //error handling
  app.use(logErrors);
  app.use(errorHandler);
});

// custom configurations for environment
app.configure('local', function(){
  _.extend(app.locals, config.local);
});

app.configure('development', function(){
 _.extend(app.locals, config.dev);
});

app.configure('qa', function(){
  _.extend(app.locals, config.qa);
});

app.configure('production', function(){
  _.extend(app.locals, config.prod);
});

// is a route polled by apache to verify node server is running
app.get('/monitor.html', function(req, res, next){
  res.send(200);
});

app.get('/', function(req, res, next){
  res.render('pages/main');
})


// start the app
var server = app.listen(app.locals.port, function(){
  console.log("Express server listening on port %d in %s mode", app.locals.port, app.settings.env);
});