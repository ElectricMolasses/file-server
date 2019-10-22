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
    conn.write('down Bumpkin');
  });

  conn.on('data', (data) => {
    if (false) {

    } else console.log(data);
  });

  return conn;
};

const requestFile = function(connection, file, path) {

}

const save = function(connection, data, path, request) {
  
};

connect('localhost');
//save('g', 'g', 'temp', 'test');