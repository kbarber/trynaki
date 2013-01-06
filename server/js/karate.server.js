function Server(port) {
  var self = this;

  this.port = port || 9090;

  var http = require('http'),
      express = require('express'),
      app = express();

  app.configure(function() {
    app.use(express.static(__dirname + '/public'));
  });

  var svr = http.createServer(app);
  svr.listen(this.port);
}
