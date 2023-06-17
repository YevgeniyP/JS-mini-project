const postId = new URL(window.location).searchParams.get('postId')
const postTitleBlock = document.getElementById('post-title')
const postDetailsBlock = document.getElementById('post-details')
const postCommentsBlock = document.getElementById('post-comments')

function createPostDetails(post) {
    for (const postKey in post) {
        const postBlockTitle = document.createElement('p')
        postBlockTitle.innerText = postKey
        postBlockTitle.classList.add('user-details-header')
        const postBlockBody = document.createElement('p')
        postBlockBody.classList.add('user-details-paragraph')
        postBlockBody.innerText = post[postKey]
        postDetailsBlock.append(postBlockTitle, postBlockBody)
    }
}


fetch(`https://jsonplaceholder.typicode.com/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
        document.title = post.title
        postTitleBlock.innerText = post.title
        createPostDetails(post)
    })

fetch(`https://jsonplaceholder.typicode.com/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
        comments.map(comment => {
            const commentElement = document.createElement('div')
            commentElement.classList.add('list-element')
            commentElement.innerText = comment.body
            postCommentsBlock.append(commentElement)
        })
    })