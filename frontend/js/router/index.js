'use strict'

import validate from "../api/auth/validate.js"
import getUsers from "../api/data/users.js"
import { Chat, addEvents } from "../components/chat.js"
import { auth, Login } from "../components/login.js"
import Users from "../components/users.js"

const root = document.getElementById('root')
const usersActives = document.getElementById('active-users')

const router = async (path) => {
    const [socket, user] = await validate()
    root.innerHTML = ''
    switch (path) {
        case '#/':
            usersActives.style.display = 'block'
            root.appendChild(Chat())
            if (user.logged) return addEvents(socket)
        case '#/login':
            usersActives.style.display = 'none'
            root.appendChild(Login())
            return auth()
        case '#/people':
            usersActives.style.display = 'block'
            const users = await getUsers()
            if (users) {
                return root.appendChild(Users(users))
            }
        case `#/t/`: 
            return
        case '':
            usersActives.style.display = 'none'
            return root.innerText = `Inicio`
    }
}

export default router