export default function connectSocket() {
    const socket = io.connect('http://localhost:4000/', {
        withCredentials: true
    })
    return socket
} 