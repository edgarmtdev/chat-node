const activeUsers = document.getElementById('actives')
let usersActive = []

export const Actives = (socket, root) => {
    socket.on('user connected', (users) => {
        usersActive = users
        root.appendChild(renderUsers(users))
    })

    socket.on('user disconnected', (users) => {
        root.appendChild(renderUsers(users))
    })
}

export function renderUsers(users) {
    activeUsers.innerHTML = ''
    users.forEach(user => {
        const li = document.createElement('li')

        li.innerText = user.name
        li.classList.add('user')
        li.onclick = () => {
            window.location.hash = `/t/${user.id}`
        }
        activeUsers.appendChild(li)
    })
    return activeUsers
}