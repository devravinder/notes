const https = require('https');
const http = require('http')
const fs = require('fs');

const HTPP_PORT=8080
const HTTPS_PORT=8443



http.createServer(options, function (req, res) {
  res.writeHead(200);
  res.end(`Http response from ${HTTPS_PORT} port `);
}).listen(HTTPS_PORT);



// for express

// in place of app pass express app

var key  = fs.readFileSync('ssl_files/server.key'); //key.key  // key.pem
var cert = fs.readFileSync('ssl_files/server.crt');  //crt.crt // cert.pem 
// .crt --> given by CA authority / selft signed .crt

/* var ca1 = fs.readFileSync('/gdroot-g2.crt')
var ca2 = fs.readFileSync('/gd_bundle-g2-g1.crt')
 */

var credentials = {key, cert,passphrase:"Ilive*ss2"};
//var credentials = {key, cert,ca:[ca1,ca2],passphrase:'givePassword'} 



/* const httpsPort=process.env.HTTPS_PORT || 443
var httpsServer = https.createServer(credentials, app); 
   httpsServer.listen(httpsPort);
 */

//   -----------------------or 
https.createServer(credentials, function (req, res) {
  res.writeHead(200);
  res.end(`Https response from ${HTTPS_PORT} port`);
}).listen(HTTPS_PORT);




 