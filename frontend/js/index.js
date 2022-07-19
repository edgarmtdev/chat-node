'use strict'

import router from "./router/index.js"
let logged = false
let user

window.onload = async () => {
    let path = window.location.hash
    router(path)
    window.onhashchange = () => {
        path = window.location.hash

        router(path)
    }

    await validate()
}

async function validate() {
    const res = await fetch('http://localhost:4000/api/auth/validate', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()
    logged = data.logged
    user = data.user
    viewData()
}

function viewData() {
    console.log(logged);
    console.log(user);
}