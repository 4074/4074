const fs = require('fs')
const path = require('path')
const http = require('http')

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').toString()

http.createServer(function (req, res) {
  console.log(req.headers)
  res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
  res.write(html, 'utf-8')
  res.end()
}).listen(5400)