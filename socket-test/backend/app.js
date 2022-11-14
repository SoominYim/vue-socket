var express = require('express')
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var io = require('socket.io')(server);

// localhost:3000/main 브라우저에 res.sendFile() 내부의 파일이 띄워진다.
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With"); next();
});
app.get('/', function(req, res) {
    res.sendFile('Hi Chating App Server');
});
io.on('connection', function (socket) {

    console.log('Connect from Client: ' + socket)

    socket.on('chat', function (data) {
        console.log('message from Client: ' + data.message)
        var rtnMessage = {
            message : data.message
            ,socketId : data.socketId
        }; // 클라이언트에게 메시지를 전송한다
        socket.broadcast.emit('chat', rtnMessage);
    });
})

server.listen(3001, function() {
    console.log('socket io server listening on port 3001')
})