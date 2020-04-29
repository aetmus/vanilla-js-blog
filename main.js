const addPosts = document.getElementById('new-post-form');
const postsList = document.getElementById('posts');
const posts = JSON.parse(localStorage.getItem('posts')) || [];

function addPost(e) {
  e.preventDefault();
  const title = this.querySelector('[name=title]').value;
  const content = this.querySelector('[name=content]').value;
  const id = uuidv4();
  const post = {
    title,
    content,
    id
  };
  console.log(post);
  posts.push(post);
  populateList(posts, postsList);
  localStorage.setItem('posts', JSON.stringify(posts));
  this.reset();
}

function populateList(posts = [], postsList) {
  postsList.innerHTML = posts.map((post, i) => {
    return `
      <div class="post">
        <h3 class="title">${post.title}</h3>
        <p class="content">${post.content}</p>
        <input type="button" value="Delete Post" class="delete-button" data-index=${i} id="${post.id}" />
      </div>
    `;
  })
    .join('');
}

function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function deletePost(e) {
  if (!e.target.matches('input')) return;
  const el = e.target;
  const index = el.dataset.index;
  posts.splice(index, 1);
  localStorage.setItem('posts', JSON.stringify(posts));
  populateList(posts, postsList);
}

addPosts.addEventListener('submit', addPost);
postsList.addEventListener('click', deletePost);

populateList(posts, postsList);
