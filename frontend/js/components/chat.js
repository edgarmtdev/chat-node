'use strict'

const socket = io.connect('http://localhost:4000/', {
    withCredentials: true
})

const chat = `
    <aside id="active-users" class="container_users">
        <h1>Active Users</h1>
        <ul id="actives"></ul>
    </aside>
    <form id="online">
        <input type="text" name="username" placeholder="Username">
        <button>Connect</button>
    </form>
    <section id="chat"></section>
    <div class="container_write">
    <form id="messages">
        <input type="text" name="message" placeholder="Write...">
        <button>Send</button>
    </form>
</div>
`

export const Chat = () => {
    const div = document.createElement('div')
    div.innerHTML = chat
    return div
}


export const addEvents = () => {
    const online = document.getElementById('online')
    const messages = document.getElementById('messages')
    const chatCont = document.getElementById('chat')
    const activeUsers = document.getElementById('actives')

    online.addEventListener('submit', (event) => {
        event.preventDefault()
        const { username } = event.target
        socket.emit('active', username.value)
        username.value = ''
    })

    socket.on('user connected', (users) => {
        console.log(users);
        activeUsers.innerHTML = ''
        users.forEach(user => {
            const li = document.createElement('li')
            li.innerText = user.idUser
            activeUsers.appendChild(li)
        });
    })

    messages.addEventListener('submit', (event) => {
        event.preventDefault()
        const { message } = event.target
        console.log(message.value);
        socket.emit('send message', message.value)
        message.value = ''
    })

    socket.on('res message', (message) => {
        const li = document.createElement('li')
        li.innerText = message
        chatCont.appendChild(li)
    })
}