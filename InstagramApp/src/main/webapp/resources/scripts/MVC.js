
const users = [{ login: 'glebek2h', password: '221299' }, { login: 'kasper', password: 'kasper' }, { login: '1', password: '1' }, { login: 'artyomcherepanov', password: 'byerak' }];

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
    view.showPosts(count, 10);
  });
}
function likeHandling(realTarget, post) {
  if (!realTarget.dataset.liked) { realTarget.dataset.liked = '0'; }
  if (realTarget.dataset.liked === '0') {
    realTarget.dataset.liked = '1';
    post.querySelector('.likes-count').textContent = `${+post.dataset.likesCount + 1} likes`;
    realTarget.firstChild.style.color = 'Tomato';// css
  } else {
    realTarget.dataset.liked = '0';
    post.querySelector('.likes-count').textContent = `${post.dataset.likesCount} likes`;
    realTarget.firstChild.style.color = 'black';// css
  }
}
function descriptionButtonHandling(realTarget, post, view) {
  const descriptionTag = realTarget.previousSibling.previousSibling;
  descriptionTag.textContent = post.dataset.description.substring(0, 200);
  realTarget.style.display = 'none';
  view.user ? post.style.height = '815px' : post.style.height = '795px';
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
    if (realTarget) {
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
            post.photolink = `resources/images/${inputPhoto.files[0].name}`;
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
    if (realTarget) {
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
            // inputPhoto.value = post.dataset.link;
            inputTags.value = post.dataset.tags;
            inputDescription.value = post.dataset.description;
            const edits = {};
            edits.id = `${randomInteger(1000, 10000)}`;
            edits.likes = [];
            inputPhoto.oninput = function () {
              edits.photolink = `resources/images/${inputPhoto.files[0].name}`;
            };
            inputTags.onchange = function () {
              edits.hashtags = [];
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
          }
          break;
        case 'delete':
          if (post.dataset.author === view.user.name) {
            view.deletePost(post.dataset.id);
          }
          break;
        case 'show-more-desc':
          descriptionButtonHandling(realTarget, post, view);
          break;
        default:
      }
    }
  });
}
function filterFormLogic(view) {
  const dateInputFrom = document.querySelector('.date-input1');
  const dateInputTo = document.querySelector('.date-input2');
  const resetButton = document.querySelector('.filter-button-reset');
  const filterButton = document.querySelector('.filter-button-confirm');
  const filterConfig = {};
  dateInputFrom.onchange = function () {
    filterConfig._dateFrom = new Date(dateInputFrom.value);
  };
  dateInputTo.onchange = function () {
    filterConfig._dateTo = new Date(dateInputTo.value);
  };
  resetButton.onclick = function () {
    dateInputFrom.value = '1999-12-22';
    dateInputTo.value = '2019-04-04';
    document.querySelector('.filter-form').style.display = 'none';
    const postTemplate = view.wrapper.querySelector('#post-template');
    view.wrapper.textContent = '';
    view.wrapper.insertAdjacentElement('beforeend', postTemplate);
    view.showPosts();
    return false;
  };
  filterButton.onclick = function () {
    document.querySelector('.filter-form').style.display = 'none';
    const postTemplate = view.wrapper.querySelector('#post-template');
    view.wrapper.textContent = '';
    view.wrapper.insertAdjacentElement('beforeend', postTemplate);
    view.showPosts(0, 10, filterConfig);
    dateInputFrom.value = '1999-12-22';
    dateInputTo.value = '2019-04-04';
    return false;
  };
}
function addSideBarListener(view, sidebar) {
  sidebar.addEventListener('click', (event) => {
    // event.preventDefault();
    const realTarget = event.target.closest('[data-action]');
    if (realTarget) {
      const { action } = realTarget.dataset;
      if (action === 'filter!') {
        filterButtonHandling(realTarget);
        filterFormLogic(view);
        realTarget.dataset.clicked = '0';
      }
    }
  });
  const searchInput = document.querySelector('.input');
  const sumbitButton = document.querySelector('.submit');
  let string;
  searchInput.onchange = function () {
    string = searchInput.value;
  };
  sumbitButton.onclick = function () { // realizing input to search form(take a look on mockup;)
    const postTemplate = view.wrapper.querySelector('#post-template');
    view.wrapper.textContent = '';
    view.wrapper.insertAdjacentElement('beforeend', postTemplate);
    const filterConfig = { hashtags: [] };
    const words = string.split(' ');
    const indexUserName = words.findIndex(el => el.charAt(0) !== '#');
    if (indexUserName !== -1) {
      filterConfig.author = words.splice(indexUserName, 1)[0];
    }
    words.forEach((tag) => {
      if (tag.length !== 0) { filterConfig.hashtags.push(`${tag}`); }
    });
    view.showPosts(0, 10, filterConfig);
    searchInput.value = '';
    return false;
  };
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
    users.find(el => JSON.stringify(el) === JSON.stringify(object))
      ? view.setAuthorized(new User(object.login)) : view.setAuthorized();
    document.querySelector('.authorization-form').style.display = 'none';
    return false;
  };
}
