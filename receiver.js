const net = require('net');
const fs = require('fs');
// remote server alias from cmd line arguments
const remote_server = process.argv[2];

let socket;

// connect to the remote server
socket = remote_server ? net.connect(8000, remote_server) : net.connect(8000);

let out_stream = fs.createWriteStream("./receiver_files/out_file.txt");

let date = new Date();
let size = 0;
let elapsed;

socket.on('data', (chunk) => {
    size += chunk.length;
    elapsed = new Date - date;
    socket.write(`\r${(size / (1024 * 1024)).toFixed(2)} Mb of data was sent from sender.\n\tTotal elapsed time: ${elapsed / 1000} sec`);
    process.stdout.write(`\r${(size / (1024 * 1024)).toFixed(2)} Mb of data was sent from sender.\n\tTotal elapsed time: ${elapsed / 1000} sec`);
    out_stream.write(chunk);
});

socket.on('end', () => {
    console.log(`\nFinished sending file. speed was ${((size / (1024 * 1024)) / (elapsed / 1000)).toFixed(2)} Mb/sec`);
});