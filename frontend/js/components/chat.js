'use strict'

const idFriend = document.location.hash.split('/')[2]
let socketFriend = document.location.hash.split('/')[3]
console.log(socketFriend);

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
    const messages = document.getElementById('messages')
    const chatCont = document.getElementById('chat')
    messages.addEventListener('submit', (event) => {
        event.preventDefault()
        const { message, idSocket } = event.target
        socket.emit('send message', socketFriend, idFriend, message.value)
        message.value = ''
        idSocket.value = ''
    })

    socket.on('res message', (message) => {
        const li = document.createElement('li')
        li.innerText = message
        chatCont.appendChild(li)
    })

    socket.on('private send message', message => {
        console.log(message);
    })

    socket.on('message sended', message => {
        console.log(message);
    })
}