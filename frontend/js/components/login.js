'use strict'

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

function createElement(type, { attrs, content }) {
    const element = document.createElement(type)
    attrs.forEach(attr => {
        element.setAttribute(attr.name, attr.value)
    })
    element.innerText = content
    return element
}