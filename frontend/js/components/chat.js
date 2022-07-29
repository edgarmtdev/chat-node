'use strict'

const activeUsers = document.getElementById('actives')

const chat = `
    <section id="chat"></section>
    <div class="container_write">
    <form id="messages">
        <input type="text" name="message" placeholder="Write...">
        <input type="text" name="idSocket" placeholder="Socket">
        <button>Send</button>
    </form>
</div>
`

export const Chat = () => {
    const div = document.createElement('div')
    div.innerHTML = chat
    return div
}


export const addEvents = (socket) => {

    const online = document.getElementById('online')
    const messages = document.getElementById('messages')
    const chatCont = document.getElementById('chat')

    socket.on('user connected', (users) => {
        renderUsers(users)
    })

    messages.addEventListener('submit', (event) => {
        event.preventDefault()
        const { message, idSocket } = event.target
        console.log(message.value);
        socket.emit('send message', idSocket.value, message.value)
        message.value = ''
        idSocket.value = ''
    })

    socket.on('res message', (message) => {
        const li = document.createElement('li')
        li.innerText = message
        chatCont.appendChild(li)
    })

    socket.on('user disconnected', (users) => {
        renderUsers(users)
    })

    socket.on('private send message', chats => {
        console.log(chats);
    })

    socket.on('message sended', chats => {
        console.log(chats);
    })
}

function renderUsers(users) {
    console.log(users);
    activeUsers.innerHTML = ''
    users.forEach(user => {
        const li = document.createElement('li')

        li.innerText = user.name

        li.classList.add('user')
        
        li.onclick = () => {
            window.location.hash = `/t/${user.idSocket}`
        }
        activeUsers.appendChild(li)
    })
}