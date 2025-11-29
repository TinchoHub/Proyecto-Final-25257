const http = require('http');

const server = http.createServer((req, res) => {
    console.log("metodo", req.method);
    console.log("url", req.url);
    res.statusCode = 200;
    res.end('Hello, World!\n');
});

const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});