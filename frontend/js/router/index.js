'use strict'

import { Chat, addEvents } from "../components/chat.js"
import { Login } from "../components/login.js"

const root = document.getElementById('root')

const router = (path) => {
    root.innerHTML = ''
    switch (path) {
        case '#/':
            console.log(path);
            root.appendChild(Chat())
            return addEvents()
        case '#/login':
            console.log(path);
            return root.appendChild(Login())
    }
}

export default router