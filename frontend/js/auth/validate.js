async function validate() {
    const res = await fetch('http://localhost:4000/api/auth/validate', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })

    const data = await res.json()
    return data
}

export default validate