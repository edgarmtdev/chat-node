function createElement(type, { attrs, content }) {
    const element = document.createElement(type)
    attrs.forEach(attr => {
        element.setAttribute(attr.name, attr.value)
    })
    element.innerText = content
    return element
}

export default createElement