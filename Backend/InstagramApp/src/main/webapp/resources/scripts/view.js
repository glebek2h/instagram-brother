
class User {
  constructor(name) {
    this.name = name;
  }
}

class View {
  constructor(wrapper, model, user) {
    this.photoPosts = model;
    this.wrapper = wrapper;
    this.user = user;
  }

   async addPost(post) {
    if (this.photoPosts.addPhotoPost(post)) {
      const postNode = View.buildPost(post);
      this.wrapper.insertAdjacentElement('afterbegin', postNode);
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

  async editPost(id, edits) {
      await this.photoPosts.editPhotoPost(id, edits);// todo get rid of that
      const childNode = document.querySelector(`[data-id="${id}"]`);
      if (childNode) {
          const post = await this.photoPosts.getPhotoPost(id);
          const editedChildNode = View.buildPost(post);
          childNode.parentNode.replaceChild(editedChildNode, childNode);
      }
  }

  async showPosts(skip = 0, top = 10, filterConfig = defaultFilterConfig) {
   /* this.photoPosts.getPhotoPosts(skip, top, filterConfig)
        .then(posts => posts.forEach((post) => {
          const postNode = View.buildPost(post);
          this.wrapper.insertAdjacentElement('beforeend', postNode);
        }));*/
    const posts = await this.photoPosts.getPhotoPosts(skip, top, filterConfig);
      posts.forEach((post) => {
          const postNode = View.buildPost(post);
          this.wrapper.insertAdjacentElement('beforeend', postNode);
      });

  }

  setAuthorized(user) {
    if (user instanceof User) {
      document.body.classList.toggle('is-auth', true);
      document.querySelector('.user-name').textContent = user.name;
      this.user = user;
    } else {
      document.body.classList.toggle('is-auth', false);
      this.user = undefined;
    }
  }

  static buildPost(post) {
    const template = document.querySelector('#post-template');
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
      } else if (key === 'description') {
        phElement.textContent = post[key].substring(0, 76);
      } else { phElement.textContent = post[key]; }
    });
    const tagsBlock = postNode.querySelector('.tags-block');
    postNode.dataset.id = post.id;
    postNode.dataset.likesCount = likesCount;
    postNode.dataset.description = post.description;
    postNode.dataset.author = post.author;
    postNode.dataset.tags = post.hashtags;
    tagsBlock.innerHTML = post.hashtags.map(
      tag => `<li class="tag"><a href="" >${tag}</a></li>`
    ).join('');
    return postNode;
  }
}
