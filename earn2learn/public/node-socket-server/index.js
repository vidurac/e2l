var server = require('http').Server();

var io = require('socket.io')(server);

var Redis = require('ioredis');

var redis = new Redis();

// redis.subscribe('user-channel-*');
//
// redis.on('message', function(channel, message){
//
//   	console.log(message);
//   	// message = JSON.parse(message);
//   	// console.log(message);
// 	// io.sockets.in(message.email).emit(channel + ':' + message.event,message.data);
//   	// io.emit(channel + ':' + message.event, message.data);
//
// });


io.on('connection', function(socket) {
	//
});
redis.psubscribe('*', function(err, count) {
	//
});
redis.on('pmessage', function(subscribed, channel, message) {
	console.log(message);
	message = JSON.parse(message);
	console.log('Channel is ' + channel + ' and message is ' + message);
	// io.emit(channel, message.data);
	io.emit(channel + ':' + message.event, message.data);
});

// io.sockets.on('connection', function (socket) {
//   socket.on('join', function (data) {
//   	console.log('joined : ' + data.email);
//     socket.join(data.email); // We are using room of socket io
//   });
// });

server.listen(3000, function () {
	console.log('http:localhost:3000 is running...');
});
