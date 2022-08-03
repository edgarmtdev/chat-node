const dateExpires = new Date(new Date().setDate(new Date().getDate() + 7))

function setCookies(res, token, data) {
    return res.cookie('token', token, {
        httpOnly: true,
        secure: true,
        expires: dateExpires,
        sameSite: 'none'
    }).json(data)
}

export default setCookies