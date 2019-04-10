
const users = [{ login: 'glebek2h', password: '221299' }, { login: 'kasper', password: 'kasper' }, { login: '1', password: '1' }];

function randomInteger(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  rand = Math.round(rand);
  return rand;
}
function showMorePosts(view) {
  const button = document.querySelector('#show-more');
  let count = 0;
  button.addEventListener('click', () => {
    count += 10;
    view.showPosts(count);
  });
}
function likeHandling(realTarget, post) {
  if (!realTarget.dataset.liked) { realTarget.dataset.liked = '0'; }
  if (realTarget.dataset.liked === '0') {
    realTarget.dataset.liked = '1';
    post.querySelector('.likes-count').textContent = `${+post.dataset.likesCount + 1} likes`;
    realTarget.style.backgroundColor = 'red';// css
  } else {
    realTarget.dataset.liked = '0';
    post.querySelector('.likes-count').textContent = `${post.dataset.likesCount} likes`;
    realTarget.style.backgroundColor = 'white';// css
  }
}
function descriptionButtonHandling(realTarget, post) {
  const descriptionTag = realTarget.previousSibling.previousSibling;
  descriptionTag.textContent = post.dataset.description.substring(0, 200);
  realTarget.style.display = 'none';
}

function signInButtonHandling(signInButton) {
  if (!signInButton.dataset.clicked)signInButton.dataset.clicked = '0';
  if (signInButton.dataset.clicked === '0') {
    signInButton.dataset.clicked = '1';
    document.querySelector('.authorization-form').style.display = 'block';
  } else {
    signInButton.dataset.clicked = '0';
    document.querySelector('.authorization-form').style.display = 'none';
  }
}
function filterButtonHandling(filterButton) {
  if (!filterButton.dataset.clicked)filterButton.dataset.clicked = '0';
  if (filterButton.dataset.clicked === '0') {
    filterButton.dataset.clicked = '1';
    filterButton.nextSibling.nextSibling.style.display = 'block';
  } else {
    filterButton.dataset.clicked = '0';
    filterButton.nextSibling.nextSibling.style.display = 'none';
  }
}
function addPostButtonHandling(addPostButton, view) {
  if (!addPostButton.dataset.clicked)addPostButton.dataset.clicked = '0';
  document.querySelector('.add-post-form').querySelector('.inp-user').placeholder = `   ${view.user.name}`;
  document.querySelector('.current-date').textContent = `   ${new Date().toLocaleString('en-US', dateConfig)}`;
  if (addPostButton.dataset.clicked === '0') {
    addPostButton.dataset.clicked = '1';
    document.querySelector('.add-post-form').style.display = 'block';
  } else {
    addPostButton.dataset.clicked = '0';
    document.querySelector('.add-post-form').style.display = 'none';
  }
}
function editPostButtonHandling(realTarget, view) {
  if (!realTarget.dataset.clicked)realTarget.dataset.clicked = '0';
  document.querySelector('.add-post-form').querySelector('.inp-user').placeholder = `   ${view.user.name}`;
  document.querySelector('.current-date').textContent = `   ${new Date().toLocaleString('en-US', dateConfig)}`;
  if (realTarget.dataset.clicked === '0') {
    realTarget.dataset.clicked = '1';
    document.querySelector('.add-post-form').style.display = 'block';
  } else {
    realTarget.dataset.clicked = '0';
    document.querySelector('.add-post-form').style.display = 'none';
  }
}
function addHeaderListener(view, header) {
  const form = document.querySelector('.add-post-form');
  const inputPhoto = form.firstChild.nextSibling;
  const inputTags = document.querySelector('.add-post-form-tags');
  const inputDescription = document.querySelector('.add-post-form-des');
  header.addEventListener('click', (event) => {
    const realTarget = event.target.closest('[data-action]');
    const { action } = realTarget.dataset;
    switch (action) {
      case 'add-post':
        // event.preventDefault();
        addPostButtonHandling(realTarget, view);
        const post = new PhotoPost();
        post.id = `${randomInteger(1000, 10000)}`;
        post.likes = [];
        post.hashtags = [];
        inputPhoto.oninput = function () {
          post.photolink = `images/${inputPhoto.files[0].name}`;
        };
        inputTags.onchange = function () {
          const tagsArray = inputTags.value.split('#');
          tagsArray.forEach((tag) => {
            if (tag.length !== 0) { post.hashtags.push(`#${tag}`); }
          });
        };
        inputDescription.onchange = function () {
          post.description = inputDescription.value;
        };
        document.querySelector('.continue').onclick = function () {
          document.querySelector('.add-post-form').style.display = 'none';
          post.author = view.user.name;
          post.createdAt = new Date().toLocaleString('en-US', dateConfig);
          view.addPost(post);
          return false;
        };
        realTarget.dataset.clicked = '0';
        inputPhoto.value = '';
        inputTags.value = '';
        inputDescription.value = '';
        break;
      case 'log-out':
        view.setAuthorized();
        break;
      case 'sign-in':
        signInButtonHandling(realTarget);
        realTarget.dataset.clicked = '0';
        break;
      default:
    }
  });
}
function addWrapperListener(view, wrapper) {
  const form = document.querySelector('.add-post-form');
  const inputPhoto = form.firstChild.nextSibling;
  const inputTags = document.querySelector('.add-post-form-tags');
  const inputDescription = document.querySelector('.add-post-form-des');
  wrapper.addEventListener('click', (event) => {
    const realTarget = event.target.closest('[data-action]');
    const post = realTarget.closest('.post');
    const { action } = realTarget.dataset;
    switch (action) {
      case 'like':
        likeHandling(realTarget, post);
        break;
      case 'edit':
        // event.preventDefault();
        if (post.dataset.author === view.user.name) {
          editPostButtonHandling(realTarget, view);
          const edits = {};
          edits.id = randomInteger(1000, 10000);
          edits.likes = [];
          edits.hashtags = [];
          inputPhoto.oninput = function () {
            edits.photolink = `images/${inputPhoto.files[0].name}`;
          };
          inputTags.onchange = function () {
            const tagsArray = inputTags.value.split('#');
            tagsArray.forEach((tag) => {
              if (tag.length !== 0) { edits.hashtags.push(`#${tag}`); }
            });
          };
          inputDescription.onchange = function () {
            edits.description = inputDescription.value;
          };
          document.querySelector('.continue').onclick = function () {
            document.querySelector('.add-post-form').style.display = 'none';
            edits.author = view.user.name;
            edits.createdAt = new Date().toLocaleString('en-US', dateConfig);
            view.editPost(post.dataset.id, edits);
            return false;
          };
          realTarget.dataset.clicked = '0';
          inputPhoto.value = '';
          inputTags.value = '';
          inputDescription.value = '';
        }
        break;
      case 'delete':
        if (post.dataset.author === view.user.name) {
          view.deletePost(post.dataset.id);
        }
        break;
      case 'show-more-desc':
        descriptionButtonHandling(realTarget, post);
        break;
      default:
    }
  });
}
function addSideBarListener(sidebar) {
  sidebar.addEventListener('click', (event) => {
    // event.preventDefault();
    const realTarget = event.target.closest('[data-action]');
    const { action } = realTarget.dataset;
    if (action === 'filter!') {
      filterButtonHandling(realTarget);
    }
  });
}
function signInFormLoginLogic(view) {
  const inputLogin = document.querySelector('.input-login');
  const inputPassword = document.querySelector('.input-password');
  const loginButton = document.querySelector('.login-auth');
  const object = { login: '', password: '' };
  inputLogin.oninput = function () {
    object.login = inputLogin.value;
  };
  inputPassword.oninput = function () {
    object.password = inputPassword.value;
  };
  loginButton.onclick = function () {
    localStorage.setItem('object-input', JSON.stringify(object));
    users.find(el => JSON.stringify(el) === JSON.stringify(object))
      ? view.setAuthorized(new User(object.login)) : view.setAuthorized();
    document.querySelector('.authorization-form').style.display = 'none';
    return false;
  };
}
