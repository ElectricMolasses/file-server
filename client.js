const net = require('net');
const fs = require('fs');
const io = process.stdin;

io.setEncoding('utf8');

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

const conn = connect('localhost');

io.on('data', (data) => {
  conn.write(data);
  console.log('Sent:', data);
});
//save('g', 'g', 'temp', 'test');