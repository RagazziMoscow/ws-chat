const messages = document.getElementsByClassName('chat__messages')[0];
const form = document.getElementsByClassName('chat__form')[0];
const input = form.getElementsByTagName('input')[0];
const status = document.getElementsByClassName('app__status')[0];

const socket = new WebSocket("ws://localhost:3000");;


function addMessage(message) {
	const newMessage = document.createElement('p');
	newMessage.innerHTML = message;
	messages.appendChild(newMessage);
}

form.addEventListener('submit', (e) => {
	e.preventDefault();

	const value = input.value;
	addMessage(value);
	socket.send(value);

	input.value = '';
});



socket.onopen = () => {
	status.innerHTML = 'ONLINE';
	status.classList.remove('app__status--offline');
}

socket.onmessage = (event) => {
	addMessage(event.data);
}

socket.onclose = () => {
	status.innerHTML = 'OFFLINE';
	status.classList.add('app__status--offline');
}