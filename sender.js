const net = require('net');
const fs = require('fs');

let server;
let  istream = fs.createReadStream("./sender_files/some_file.txt");

server = net.createServer(socket => {
    socket.pipe(process.stdout);
    istream.on("readable", function() {
        let data;
        while (data = this.read()) {
            socket.write(data);
        }
    });

    istream.on("end", function() {
        socket.end();
    });

    socket.on("end", () => {
        server.close(() => { console.log("\ttransfer done!"); });
    })
});

server.listen(8000, '0.0.0.0', () => {
    console.log("server listening on port 8000\n");
});