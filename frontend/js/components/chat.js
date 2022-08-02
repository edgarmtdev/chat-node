'use strict'

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

    messages.addEventListener('submit', (event) => {
        console.log(usersActive);
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

    socket.on('private send message', chats => {
        console.log(chats);
    })

    socket.on('message sended', chats => {
        console.log(chats);
    })
}