'use strict'

import validate from "../api/auth/validate.js"
import getUsers from "../api/data/users.js"
import { Chat, addEvents } from "../components/chat.js"
import { auth, Login } from "../components/login.js"
import Users from "../components/users.js"

const root = document.getElementById('root')

const router = async (path) => {
    const [socket, user] = await validate()
    root.innerHTML = ''
    switch (path) {
        case '#/':
            root.appendChild(Chat())
            if (user.logged) return addEvents(socket)
        case '#/login':
            root.appendChild(Login())
            return auth()
        case '#/people':
            const users = await getUsers()
            if (users) {
                return root.appendChild(Users(users))
            }
        case `#/t/`: 
            return
        case '':
            return root.innerHTML = `<div>Hola</>`
    }
}

export default router