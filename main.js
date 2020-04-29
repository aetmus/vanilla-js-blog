const newPostForm = document.getElementById('new-post-form');

function handleFormSubmission(e) {
  e.preventDefault();
  const newPostTitle = e.srcElement.elements.title.value;
  const newPostContent = e.srcElement.elements['new-post-content'].value;
  const newPost = { newPostTitle, newPostContent }
  let formSuccess = validateForm();
  if (!formSuccess) {
    return;
  } else {
    document.getElementById('formError').innerHTML = '';
    addPostToDOM(newPost);
    e.srcElement.reset();
  }
}

function createPostHTML(post) {
  return `
  <div class="post">
    <h3 class="title">${post.newPostTitle}</h3>
    <input type="button" value="Delete Post" class="delete-button" />
    <p class="content">${post.newPostContent}</p>
  </div>
`;
}

function addPostToDOM(post) {
  let DOMPost = createPostHTML(post);
  document.getElementById('posts').innerHTML += DOMPost;
}

function validateForm() {
  const formTitle = document.forms['new-post-form']['new-post-title'].value;
  const formContent = document.forms['new-post-form']['new-post-content'].value;
  if (!formTitle || !formContent) {
    let errorMessage = 'Neither field can be blank!';
    document.getElementById('formError').innerHTML = errorMessage;
    return false;
  }
  return true;
}

const deleteButtons = [...document.getElementsByClassName('delete-button')];

function getPosts() {
  const posts = document.getElementById('posts');
  console.log(posts.childNodes);
}

function deletePost(e) {
  console.log(e);
  alert('the Delete Buttons don\'t work');
}

deleteButtons.forEach(button => {
  button.addEventListener('click', deletePost);
});

newPostForm.addEventListener('submit', handleFormSubmission);
