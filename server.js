var express = require('express'),
	compress = require('compression'),
	serveStatic = require('serve-static'),
	app = express(),
	port = process.env.PORT || 8080;

app.use(compress());

// rewrite
app.use(function(req, res, next) {
	if (!req.url.match(/(^\/?(css|images|js)\/|\.[a-z]+(\?.*)?$)/g)) {
		req.url = '/';
	}
	
	if (req.url.match(/^\/?cache\.manifest$/g)) {
		res.set({
			'Cache-Control' : 'max-age=0',
			'Expires' : new Date().toUTCString(),
			'Last-Modified' : new Date().toUTCString()
		});
	}
	
	next();
});

app.use(serveStatic('public/'));

app.listen(port, function() {
	console.log('Server listening on localhost:'+port);
});