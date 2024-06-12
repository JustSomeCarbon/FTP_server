var Client = require('ftp');
var fs = require('fs');

var c = new Client();
c.on('ready', function() {
    c.put('./sender_files/some_file.txt', './receiver_files/output.txt', function(err) {
        if (err) throw err;
        c.end();
    });
});

// connect to localhost:21 as anonymous
c.connect();