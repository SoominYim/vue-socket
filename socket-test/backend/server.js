var app = require('express')();
var server = require('https').createServer(app);
var cors = require('cors')
var io = require('socket.io')(server, {
    pingTimeout: 1000,
    origin: '*',
    methods: ['GET', 'POST'],
    credentials:true,
});

//setting cors




//connection event handler
io.on('connection', function (socket) {
    console.log('Connect from Client: ' + socket)

    socket.on('hello', function (data) {
        console.log('hello from Client: ' + data)
    });

    socket.on('chat', function (data) {
        console.log('message from Client: ' + data.message)

        var rtnMessage = {
            message: data.message
        };

        socket.broadcast.emit('chat', rtnMessage);
    });

})

server.listen(3000, function () {
    console.log('socket io server listening on port 3000')
})

app.use(cors())