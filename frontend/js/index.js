'use strict'

import router from "./router/index.js"

window.onload = () => {
    let path = window.location.hash
    router(path)
    window.onhashchange = () => {
        path = window.location.hash

        router(path)
    }
}