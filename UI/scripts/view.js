
const dateConfig = {
  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
};
class User {
  constructor(name) {
    this.name = name;
  }
}
const wrapper = document.querySelector('#wrapper');
class View {
  constructor(model) {
    this.photoPosts = model;
  }

  buildPost(post) {
    if (this.photoPosts.addPhotoPost(post)) {
      const postNode = this.getNodeWithHtml(post);
      wrapper.insertAdjacentElement('afterbegin', postNode);
      return true;
    }
    return false;
  }

  deletePost(id) {
    if (this.photoPosts.removePhotoPost(id)) {
      const childNode = document.querySelector(`[data-id="${id}"]`);
      if (childNode) {
        childNode.parentNode.removeChild(childNode);
      }
      return true;
    }
    return false;
  }

  editPost(id, edits) {
    if (this.photoPosts.editPhotoPost(id, edits)) {
      const childNode = document.querySelector(`[data-id="${id}"]`);
      if (childNode) {
        const editedChildNode = this.getNodeWithHtml(this.photoPosts.getPhotoPost(id));
        childNode.parentNode.replaceChild(editedChildNode, childNode);
      }
      return true;
    }
    return false;
  }

  showPosts(skip = 0, top = 10, filterConfig = defaultFilterConfig) {
    this.photoPosts.getPhotoPosts(skip, top, filterConfig).forEach((post) => {
      const postNode = this.getNodeWithHtml(post);
      wrapper.insertAdjacentElement('beforeend', postNode);
    });
  }

  displayHeaderElements(user) {
    if (user instanceof User) {
      document.querySelector('.user-name').textContent = user.name;
      document.querySelector('.sign-in').style.display = 'none';
      document.querySelector('.user-name').style.display = 'inline-block';
      document.querySelector('.log-out').style.display = 'inline-block';
      document.querySelector('.add-post').style.display = 'inline-block';
    }
  }

  getNodeWithHtml(post) {
    const template = document.getElementById('post-template');
    const fragment = document.importNode(template.content, true);
    const postNode = fragment.firstElementChild;
    const likesCount = post.likes.length;
    const placeholders = postNode.querySelectorAll('[data-target]');
    [].forEach.call(placeholders || [], (phElement) => {
      const key = phElement.getAttribute('data-target');
      if (key === 'createdAt') {
        phElement.textContent = post[key].toLocaleString('en-US', dateConfig);
      } else if (key === 'photolink') {
        phElement.src = post[key];
      } else if (key === 'likes') {
        phElement.textContent = `${likesCount} likes`;
      } else { phElement.textContent = post[key]; }
    });
    const tagsBlock = postNode.querySelector('.tags-block');
    postNode.dataset.id = post.id;
    tagsBlock.innerHTML = post.hashtags.map(
      tag => `<li class="tag"><a href="" >${tag}</a></li>`
    ).join('');
    return postNode;
  }
}
