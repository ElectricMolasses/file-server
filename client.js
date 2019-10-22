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
  });

  conn.on('data', (data) => {
    console.log(data);
  });

  return conn;
};

connect('localhost');