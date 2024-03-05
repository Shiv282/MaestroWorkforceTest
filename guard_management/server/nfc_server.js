//------https://web.dev/articles/how-to-use-local-https
//------https://stackoverflow.com/questions/5998694/how-to-create-an-https-server-in-node-js
//------https://github.com/GoogleChrome/samples/issues/677

const https = require('https');
const fs = require('fs');
const express = require('express')

const app = express();
const options = {
  key: fs.readFileSync('localhost-key.pem'),
  cert: fs.readFileSync('localhost.pem'),
};

app.get('/',(req,res)=>{
    res.render("index");
})

const server = https.createServer(options,app);

// const server = https.createServer(options, function (req, res) {
//   // server code
//   console.log("Server up")
//   fs.readFile('index.html', (err, data) => {
//       if (err) {
//         res.writeHead(500);
//         return res.end('Error loading index.html');
//       }
  
//       res.writeHead(200, {'Content-Type': 'text/html'});
//       res.end(data);
//     });
// });

server.listen(3030);
