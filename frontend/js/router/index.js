'use strict'

import { Chat, addEvents } from "../components/chat.js"
import { auth, Login } from "../components/login.js"

const root = document.getElementById('root')

const router = (path) => {
    root.innerHTML = ''
    switch (path) {
        case '#/':
            root.appendChild(Chat())
            return addEvents()
        case '#/login':
            root.appendChild(Login())
            return auth()
        case '': 
            return root.innerHTML = `<div>Hola</>`
    }
}

export default router