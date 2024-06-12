const { Client } = require('basic-ftp');

const client = new Client();

console.log("listing files in sender_files/");
client.list("./sender_files/");
