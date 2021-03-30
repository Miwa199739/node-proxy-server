// const express = require('express');
// const morgan = require("morgan");
// const { createProxyMiddleware } = require('http-proxy-middleware');

// // Create Express Server
// const app = express();

// // Configuration
// const PORT = 4444;
// const HOST = "localhost";

// // Logging
// app.use(morgan('dev'));

// // Info GET endpoint
// app.get('/info', (req, res, next) => {
//     res.set('Content-Type', 'text/plain');
//     res.send('This is a proxy service which proxies to Billing and Account APIs.');
//  });

//  // Proxy endpoints
// app.use('/json_placeholder', createProxyMiddleware({
//     target: API_SERVICE_URL,
//     changeOrigin: true,
//     pathRewrite: {
//         [`^/json_placeholder`]: '',
//     },
//  }));

//  // Start the Proxy
// app.listen(PORT, HOST, () => {
//     console.log(`Starting Proxy at ${HOST}:${PORT}`);
//  });


// var http = require('http'),
//     httpProxy = require('http-proxy');
// //
// // Create your proxy server and set the target in the options.
// //
// httpProxy.createProxyServer({target:'http://localhost:4444'}).listen(8000); // See (†)

// //
// // Create your target server
// //
// http.createServer(function (req, res) {
//   res.writeHead(200, { 'Content-Type': 'text/plain' });
//   res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
//   res.end();
// }).listen(4444);

var http = require('http'),
    httpProxy = require('http-proxy');

//
// Create a proxy server with custom application logic
//
var proxy = httpProxy.createProxyServer({});

//
// Create your custom server and just call `proxy.web()` to proxy
// a web request to the target passed in the options
// also you can use `proxy.ws()` to proxy a websockets request
//
// var server = http.createServer(function (req, res) {
//     // You can define here your custom logic to handle the request
//     // and then proxy the request.
//     proxy.web(req, res, {
//         target: 'https://adf.azure.com/assets/exp-builder/',
//         changeOrigin: true,
//         secure: false
//     });
// });

// console.log("listening on port 5555")
// server.listen(5555);

const server = http.createServer(function(req, res) {
    // You can define here your custom logic to handle the request
    // and then proxy the request.
    if (req.url === '/'){
      proxy.web(req, res, {
        target: 'https://adf.azure.com/assets/exp-builder/',
        changeOrigin: true,
        // toProxy: true,
        secure: false
      });
      return;
    }
    proxy.web(req, res, {
      target: 'https://adf.azure.com/',
      changeOrigin: true,
      // toProxy: true,
      secure: false
    });
  });
  server.listen(3003);

// var http = require('http'),
//     httpProxy = require('http-proxy');
// fs = require('fs');
// var proxy = httpProxy.createProxyServer({});
// var server = http.createServer(function (req, res) {
//     proxy.web(req, res, {
//         target: 'https://adf.azure.com/',
//         ssl: false,
//         changeOrigin: true
//     });
//     // res.writeHead(200, )
//     // var jsonData = fs.readFileSync('AzureBlobFSSample.adf.plugin.json', {
//     //     encoding: 'utf8'
//     // });
//     // res.writeHead(200, {
//     //     'Content-Type': 'text/plain',
//     //     'Access-Control-Allow-Origin': '*',
//     //     'Access-Control-Allow-Methods':'POST, GET, OPTIONS',
//     //     'Access-Control-Allow-Headers': 'cache-control'
//     // });
//     // res.write(jsonData);
//     // res.end();
// });
// console.log("listening on port 4444")
// server.listen(4444);

// // Listen for the `error` event on `proxy`.
// // as we will generate a big bunch of errors
// proxy.on('error', function (err, req, res) {
//     console.log(err);
//     res.writeHead(500, {
//         'Content-Type': 'text/plain'
//     });
//     res.end("Oops");
// });

// proxy.on('proxyRes', function (proxyRes, req, res) {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
// });
