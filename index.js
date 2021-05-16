const fs = require('fs')
const path = require('path')
const http = require('http')

const html = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf8').toString()
const feedback = fs.readFileSync(path.join(__dirname, 'feedback.html'), 'utf8').toString()

http.createServer(function (req, res) {
  console.log(req.headers)
  if (req.url === '/receive') {
    res.writeHead(200, {"Content-Type": "application/json; charset=utf-8"})
    res.write('{}', 'utf-8')
  } else if (req.url === '/feedback') {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write(feedback, 'utf-8')
  } else {
    res.writeHead(200, {"Content-Type": "text/html; charset=utf-8"})
    res.write(html, 'utf-8')
  }
  res.end()
}).listen(5400)