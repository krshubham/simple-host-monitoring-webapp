const express = require('express');
const si = require('systeminformation');
const fs = require('fs');
const path = require('path');


const server = express();


server.get('/', (req,res) => {
  res.send(fs.readFileSync(path.join(__dirname,'../client/index.html')).toString('utf-8'));
})

/**
 * Fetching the current CPU information of the host
 */

server.get('/sysinfo', (req,res) => {
  si.cpu((data) => {
    res.json(data);
  })
});


/**
 * Fetching the current network information
 */
server.get('/netinfo', (req,res) => {
  si.networkInterfaces((data) => {
    res.json(data);
  });
});

/**
 * Fetching the current status of the CPU Load
 */
server.get('/loadinfo', (req,res) => {
  si.currentLoad((data) => {
    res.json(data);
  })
});

server.get('/processinfo', (req,res) => {
  si.processes((data) => {
    res.json(data);
  })
});

/**
 * Server listens on @port {3000}
 */
server.listen('3000', () => {
  console.log('Server is listening on port 3000');
});