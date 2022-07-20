'use strict'

import login from "../api/auth/login.js"
import createElement from "../libs/ui/createElems.js"

export const Login = () => {
    const login = document.createElement('form')
    login.id = 'login'

    const email = createElement('input', {
        attrs: [
            { name: 'type', value: 'text' },
            { name: 'name', value: 'email' },
            { name: 'placeholder', value: 'Email' }
        ]
    })
    const password = createElement('input', {
        attrs: [
            { name: 'type', value: 'password' },
            { name: 'name', value: 'password' },
            { name: 'placeholder', value: 'Password' }
        ]
    })
    const button = createElement('button', {
        attrs: [
            { name: 'type', value: 'submit' },
        ],
        content: 'SignIn'
    })

    login.appendChild(email)
    login.appendChild(password)
    login.appendChild(button)
    return login
}

 

export function auth() {
    const authLogin = document.getElementById('login')
    authLogin.addEventListener('submit', (event) => {
        event.preventDefault()
        const { email: { value: email }, password: { value: password } } = event.target

        login({email, password})
    })
}