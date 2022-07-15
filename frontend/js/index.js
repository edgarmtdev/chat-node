'use strict'

import router from "./router/index.js"

window.onload = () => {
    window.onhashchange = () => {
        const path = window.location.hash
        router(path)
    }
}