export default async function login(data) {
    fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    })
        .then(res => {
            if (res.ok) return res.json()
            throw new Error('No session')
        }).then(data => {
            console.log(data)
        }).catch(err => console.log(err.message))
}