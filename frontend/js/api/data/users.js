export default async function getUsers() {
    const res = await fetch('http://localhost:4000/api/users', {
        method: 'GET',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
        }
    })
    const users = await res.json()
    return users
}