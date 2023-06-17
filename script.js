const userList = document.getElementById('user-list')

function createUserList(usersArray) {
    usersArray.map(user => {
        const block = document.createElement('div')
        block.classList.add('user-list-element', 'list-element')
        createUserElement(user, block)
        userList.append(block)
    })
}

function createUserElement(user, parentTag) {
    const title = document.createElement('p')
    title.innerText = `${user.id}. ${user.name}`
    const userBtn = document.createElement('button')
    userBtn.innerText = 'Details'
    userBtn.classList.add('details-button')
    userBtn.addEventListener('click', () => {
        window.location.href = `user-details.html?userId=${user.id}`
    })
    parentTag.append(title, userBtn)
}

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(users => createUserList(users))