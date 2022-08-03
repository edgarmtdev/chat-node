'use strict'

import validate from "../api/auth/validate.js"
import getUsers from "../api/data/users.js"
import { Chat, addEvents } from "../components/chat.js"
import { auth, Login } from "../components/login.js"
import { Actives } from "../components/aside.js";
import Users from "../components/users.js"

const root = document.getElementById('root')
const usersActives = document.getElementById('active-users')

const params = /[#\/a-zA-Z0-9]{28,30}/

const router = async (path) => {
    const regex = params.test(path)
    const [socket, user] = await validate()
    root.innerHTML = ''
    if (regex) {
        Actives(socket)
        usersActives.style.display = 'block'
        root.appendChild(Chat())
        if (user.logged) return addEvents(socket)
    } else {
        switch (path) {
            case '#/':
                usersActives.style.display = 'block'
                Actives(socket)
                return
            case '#/login':
                usersActives.style.display = 'none'
                root.appendChild(Login())
                return auth()
            case '#/people':
                const users = await getUsers()
                usersActives.style.display = 'block'
                return root.appendChild(Users(users))

            case '':
                usersActives.style.display = 'none'
                return root.innerText = `Inicio`
        }
    }
}

export default router