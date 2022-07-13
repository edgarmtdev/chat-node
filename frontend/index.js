const socket = io.connect('http://localhost:4000/')
const login = document.getElementById('login')
const chat = document.getElementById('messages')
const chatCont = document.getElementById('chat')
const activeUsers = document.getElementById('actives')

login.addEventListener('submit', (event) => {
    event.preventDefault()
    const { username } = event.target
    socket.emit('active', username.value)
    username.value = ''
})

socket.on('user connected', (users) => {
    activeUsers.innerHTML = ''
    users.forEach(user => {
        const li = document.createElement('li')
        li.innerText = user
        activeUsers.appendChild(li)
    });
})

messages.addEventListener('submit', (event) => {
    event.preventDefault()
    const { message } = event.target
    socket.emit('send message', message.value)
    message.value = ''
})

socket.on('res message', (message) => {
    const li = document.createElement('li')
    li.innerText = message
    chatCont.appendChild(li)
})

