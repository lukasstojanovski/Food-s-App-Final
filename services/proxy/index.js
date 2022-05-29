const path = require("path")
const proxy = require("express-http-proxy")
const express = require("express")
const config = require("../../pkg/config")

const app = express();

app.use(
    '/api/v1/blog',
    proxy(
        'http://127.0.0.1:10001',
        {proxyReqPathResolver: (req) => `http://127.0.0.1:10001/api/v1/blog${req.url}`}
    )
);

app.use(
    'http://127.0.0.1:10001/api/v1/blog',
    express.static(path.join(__dirname, '/../../web/build'))
);

const PORT = process.env.PORT || config.get('services').proxy.port;

console.log('Proxy starting port', PORT);

app.listen(PORT, err => {
    if(err) {
        return console.log(err);
    }
    console.log(`Service started on port ${PORT}`)
})