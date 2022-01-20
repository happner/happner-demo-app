const http = require("http");
const finalhandler = require('finalhandler')
const serveStatic = require('serve-static');

let serve = serveStatic('public', {index: ['index.html', 'index.htm']})

let server = http.createServer(function onRequest(req, res) {
    serve(req, res, finalhandler(req, res));
})

server.listen(3000);
console.log("Server started and listing on http://localhost:3000");