const http = require('http');
const fs = require('fs');
const host = '127.0.0.1';
const port = 3455;

const server = http.createServer( (req,res) => {
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('./index.html', null, (err,data) => {
        if (err) {
            res.writeHead(404);
            res.write('File not found!');
        } else {
            res.write(data);
        };
        res.end();
    });
});

server.listen(port, host, () => {
    console.log('Server listening on', host, port);
});