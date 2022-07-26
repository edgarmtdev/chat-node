import connectSocket from "../../libs/socket.js"

async function validate() {
    const res = await fetch('http://localhost:4000/api/auth/validate', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()

    let socket

    if (data.logged) {
        socket = connectSocket()
        socket.emit('online')
    }

    return [socket, data]
}

export default validate