'use strict'

import validate from "../auth/validate.js"
import { Chat, addEvents } from "../components/chat.js"
import { auth, Login } from "../components/login.js"

const root = document.getElementById('root')

const router = async (path) => {
    root.innerHTML = ''
    switch (path) {
        case '#/':
            root.appendChild(Chat())
            const user = await validate()
            if (user.logged) return addEvents()
        case '#/login':
            root.appendChild(Login())
            return auth()
        case '#/people':
            return root.innerText = 'xD'
        case '':
            return root.innerHTML = `<div>Hola</>`
    }
}

export default router