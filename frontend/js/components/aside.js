const aside = document.getElementById('active-users')
const activeUsers = document.getElementById('actives')

export const Actives = (socket) => {
    socket.on('user connected', (users) => {
        aside.appendChild(renderUsers(users))
    })

    socket.on('user disconnected', (users) => {
        aside.appendChild(renderUsers(users))
    })
}

export function renderUsers(users) {
    activeUsers.innerHTML = ''
    users.forEach(user => {
        const li = document.createElement('li')

        li.innerText = user.name
        li.classList.add('user')
        li.onclick = () => window.location.hash = `/t/${user.id}/${user.idSocket}`
        
        activeUsers.appendChild(li)
    })
    return activeUsers
}