import createElement from "../libs/ui/createElems.js";

export default function Users(users) {
    const sectionUsers = createElement('div', {
        attrs: [
            { name: 'class', value: 'section-users' }
        ],
    })

    users.forEach(user => {
        const card = createElement('div', {
            attrs: [
                { name: 'class', value: 'section-users_card' },
            ],
            content: user.name
        })
        sectionUsers.appendChild(card)
    });
    return sectionUsers
}