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

    if (data === 'a') console.log('An a');

    if (data.replace('\n', '') === 'files') {
      console.log('Printing file request to client.');
      client.write(`The following files are currently available:\n ${currentFiles}`);
    }
    if (data.match(/^down/i)) {
      data = data.split(' ');
      data[1] = data[1].replace('\n', '');
      console.log('Client is requesting: ', data);
      console.log(data[1]);
      if (fs.existsSync('files/' + data[1])) {
        console.log('Buffering');
        bufferFile('files/' + data[1], client, sendTo);
      } else {
        console.log('Invalid file');
      }
    }
  });
});

const bufferFile = function(file, client, callback) {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.log(err);
    }
    callback(client, data);
  });
};

const sendTo = function(client, data) {
  client.write('FILE:: ' + data);
};