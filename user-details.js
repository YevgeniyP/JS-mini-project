const userTitle = document.getElementById('user-title')
const userDetails = document.getElementById('user-details')

const userId = new URL(window.location).searchParams.get('userId')

function createUserDetailsList(user, parentTag) {
    for (const userKey in user) {
        const block = document.createElement('p')
        block.classList.add('user-details-paragraph')
        parentTag.append(block)
        if (typeof user[userKey] === 'object') {
            createUserDetailsList(user[userKey], block)
            continue
        }
        createUserAttribute(userKey, user, block)
    }
}

function createUserAttribute(userKey, user, parentTag) {
    const attribute = document.createElement('span')
    attribute.innerText = `${userKey}: `
    attribute.classList.add('user-details-header')
    const value = document.createElement('span')
    value.innerText = user[userKey]
    parentTag.append(attribute, value)
}

function createUserPosts(userId, parentTag) {
    fetch(`https://jsonplaceholder.typicode.com/users/${userId}/posts`)
        .then(response => response.json())
        .then(posts => posts.map(post => {
            const postElement = document.createElement('div')
            postElement.classList.add('list-element', 'user-post-list-element')
            parentTag.append(postElement)
            const postTitle = document.createElement('p')
            postTitle.innerText = post.title
            const postDetailsBtn = document.createElement('button')
            postDetailsBtn.innerText = 'Details'
            postDetailsBtn.classList.add('details-button')
            postDetailsBtn.addEventListener('click', ()=>{
                window.location.href=`post-details.html?postId=${post.id}`
            })
            postElement.append(postTitle, postDetailsBtn)
        }))
}

fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
        document.title = user.name
        userTitle.innerText = user.name

        const userInfoBlock = document.createElement('div')
        userDetails.append(userInfoBlock)

        createUserDetailsList(user, userInfoBlock)

        const postButton = document.createElement('button')
        userDetails.append(postButton)
        postButton.innerText = 'Post of current user'
        postButton.classList.add('details-button')
        postButton.addEventListener('click', e => {
            e.preventDefault()
            const userPostBlock = document.createElement('div')
            userPostBlock.classList.add('user-posts-list')
            userDetails.append(userPostBlock)
            createUserPosts(userId, userPostBlock)
        })
    })