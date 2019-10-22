const net = require('net');
const fs = require('fs');

const connect = function(server) {
  const conn = net.createConnection({
    host: server,
    port: 3140
  });

  conn.setEncoding('utf8');

  conn.on('connect', () => {
    console.log('Connection established.');
    conn.write('files');
    conn.write('down test');
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};

const save = function(connection, data, path, request) {
  fs.writeFile(`${path}/${request}.txt`, '', (err) => {
    if (err) {
      return console.log(err);
    }
  });

  fs.createWriteStream(`${path}/${request}`, );
};

//connect('localhost');
save('g', 'g', 'temp', 'test');