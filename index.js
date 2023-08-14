var { createServer } = require('http')
var {Server} = require('socket.io')
const fs = require('fs')
const url = require('url')
const Login = require('./login') // 登录
const Registry = require('./registry')
const indexHtml = fs.readFileSync(require.resolve('./index.html'),{encoding:'utf8'})
var http = createServer((req,res)=>{
    const pathname = url.parse(req.url).pathname
    res.writeHead(200,{'content-type':'text/html;charset=UTF8'})
    switch(pathname){
        case '/login':
            Login(req,res)
        break;
        case '/registry':
          Registry(req,res)
        break;
        default:
            res.end(indexHtml)
        break;
    }
})
var io = new Server(http,{
  cors:{
    origin:'*',
    methods:['get','post']
  }
})
io.on('connection',(socket)=>{
  socket.on('send-message',(data)=>{
    socket.broadcast.emit('msg_res',data)
  })
})
http.listen(1234,()=>{
  console.log('http://localhost:1234')
})