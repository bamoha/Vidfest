navigator.webKitGetUserMedia({video : true, audio : false}, function(stream){


var Peer = require('simple-peer');


var peer = new Peer({
	initiator : location.hash === '#me', 
	trickle : false,
	stream : stream
});


peer.on('signal', function(data) {
	document.getElementById('myId').value = JSON.stringify(data)
});

document.getElementById('connect').addEventListener('click', function(){
	var yourId = JSON.parse(document.getElementById('yourId').value);
	peer.signal(yourId);
});

document.getElementById('send').addEventListener('click', function(){
	var yourMessage = document.getElementById('yourMessage').value;
	peer.send('yourMessage')
});

peer.on('data', function(data){
	document.getElementById('messages').textcontent += data + '\n'
});

peer.on('stream', function(stream){
	var video = document.createElement('video');
	document.body.appendChild(video);
	video.src = window.URL.createObjectURL(stream);
	video.play();
})

}, function(err){
	console.error(err);
});