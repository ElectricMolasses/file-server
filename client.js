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
    console.log(data + '\n');
    if (data.match(/^FILE/i)) {
      console.log('Receiving...');
      fs.writeFile('temp/Bumpking', data, (err) => {
        if (err) console.log(err);
        else console.log('saved');
      });
    } else console.log('failed');
  });

  return conn;
};
const save = function(file, path) {
  
};

connect('localhost');
//save('g', 'g', 'temp', 'test');