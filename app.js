var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var api = require('./server/routes/api');
var storyApi = require('./server/routes/storyApi');
var seriesApi = require('./server/routes/seriesApi');
var authorApi = require('./server/routes/authorApi');
var profileApi = require('./server/routes/profileApi');
var commentApi = require('./server/routes/commentApi');
var userApi = require('./server/routes/userApi');
var session = require('cookie-session');
var AWS = require('aws-sdk');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.set('trust proxy', 1)
var expiryDate = new Date(Date.now() + 48 * 60 * 60 * 1000) // 1 hour
var domain = null
if("production" === process.env.NODE_ENV){
  domain = "sukatha.com"
}

app.enable('trust proxy'); // only if you're behind a reverse proxy (Heroku, Bluemix, AWS if you use an ELB, custom Nginx setup, etc)
app.use(session({
  name: 'session',
  keys: ['checkkey'],
  cookie: {
    httpOnly: true,
    path: '/',
    signed:true,
    expires: expiryDate,
    domain:domain
  }
}))

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/stories', storyApi);
app.use('/api/series', seriesApi);
app.use('/api/authors', authorApi);
app.use('/api/profile',profileApi);
app.use('/api/comments', commentApi);
app.use('/api/user',userApi);
app.use('/api', api);



app.use('/stories/story',function(req, res, next) {
  var agent = req.get('User-Agent');
  if(agent.match(/Googlebot/)||agent.match(/Facebot/) ) {
    var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4",endpoint:"https://s3.ap-south-1.amazonaws.com"});
    var bucketName = 'bsstory';
    var keyName = req.query.a+'/'+req.query.n+'/story.html';
    var params = {Bucket: bucketName, Key: keyName};
    s3.getObject(params, function(err, data) {
      if (err){
        res.send(err);
      }else {
        var fileContents = data.Body.toString();
        res.send(fileContents);
      }
    });
  }else{
    next();
  }

});

app.use('/author/:id',function(req, res, next) {
  var agent = req.get('User-Agent');
  if(agent.match(/Googlebot/)||agent.match(/Facebot/) ) {
    var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4",endpoint:"https://s3.ap-south-1.amazonaws.com"});
    var bucketName = 'bsstory';
    var keyName = req.params.id+'/author.html';
    var params = {Bucket: bucketName, Key: keyName};
    s3.getObject(params, function(err, data) {
      if (err){
        res.send(err);
      }else {
        var fileContents = data.Body.toString();
        res.send(fileContents);
      }
    });
  }else{
    next();
  }

});


app.use('/sitemap',function(req, res, next) {
  var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4",endpoint:"https://s3.ap-south-1.amazonaws.com"});
  var bucketName = 'sukathasamples';
  var keyName = 'SEO/sitemap.xml';
  var params = {Bucket: bucketName, Key: keyName};
  s3.getObject(params, function(err, data) {
    if (err){
      res.send(err);
    }else {
      var fileContents = data.Body.toString();
      res.set('Content-Type', 'text/xml');
      res.send(fileContents);
    }
  });
});

app.use('/*', function(req, res, next) {

  var agent = req.get('User-Agent');
  if(agent.match(/Googlebot/)||agent.match(/Facebot/) ) {
    var s3 = new AWS.S3({ region:"ap-south-1","signatureVersion":"v4",endpoint:"https://s3.ap-south-1.amazonaws.com"});
    var bucketName = 'bsstory';
    var keyName = 'site.html';
    var params = {Bucket: bucketName, Key: keyName};
    s3.getObject(params, function(err, data) {
      if (err){
        res.send(err);
      }else {
        var fileContents = data.Body.toString();
        res.send(fileContents);
      }
    });
  }else{
    res.sendFile('public/index.html' , { root : __dirname});
  }
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
