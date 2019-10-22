const net = require('net');
const fs = require('fs');

const server = net.createServer();

let currentFiles;

fs.readdir('./files/', (err, files) => {
  console.log(files);
  currentFiles = files;
});

server.listen(3140, () => {
  console.log("Server listening on port 3140.");
});

server.on('connection', (client) => {
  client.setEncoding('utf8');

  console.log('New Client Connection');
  client.write('Hello visitor.  What file would you like to request?');
  client.write("You may type 'files' for a list of available files.");

  client.on('data', (data) => {
    console.log('Client is requesting: ', data);

    if (data === 'files') {
      client.write(`The following files are currently available:\n ${currentFiles}`);
    } else {
      // Check to see if the string is an available file, and transfer it if so.
    }
  });
});