
const dateConfig = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};

class View {
  constructor(model, isLoggedUser) {
    this.photoPosts = model;
    this.isLoggedUser = isLoggedUser;
  }

  addPost(post) {
    if (this.photoPosts.addPhotoPost(post)) {
      const wrapper = document.querySelector('#wrapper');
      const newPost = View.getNodeWithHtml(post);
      wrapper.insertAdjacentElement('afterbegin', newPost);
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
        const editedChildNode = View.getNodeWithHtml(this.photoPosts.getPhotoPost(id));
        childNode.parentNode.replaceChild(editedChildNode, childNode);
      }
      return true;
    }
    return false;
  }

  showPosts() {
    this.photoPosts.getPhotoPosts().reverse().forEach((post) => {
      const wrapper = document.querySelector('#wrapper');
      const newPost = View.getNodeWithHtml(post);
      wrapper.insertAdjacentElement('afterbegin', newPost);
    });
  }

  displayHeaderElements() {
    if (this.isLoggedUser) {
      document.querySelector('#sign-in').style.display = 'none';
      document.querySelector('.user-name').style.display = 'inline-block';
      document.querySelector('#log-out').style.display = 'inline-block';
    }
  }

  static getNodeWithHtml(post) {
    const newPost = document.createElement('div');
    newPost.innerHTML = `<div class = "post">
      <p class = "postInfo">
          <b>${post.author}</b><date>${post.createdAt.toLocaleString('en-US', dateConfig)}</date> 
      </p>
      <div class="image">
          <img src=${post.photolink} alt="1" width="640" height="640">
      </div>
      <div class = "description">
          <button class="like"><i class="far fa-thumbs-up fa-2x"></i></button><p class="likes-count">${post.likes.length}</p>
          <p>
              <b>${post.author}</b> ${post.description} <button class="description-button">...</button><br> 
          </p>
          <ul class="tags-block">
          </ul>  
      </div>
      </div>`;
    const tagsBlock = newPost.querySelector('.tags-block');
    newPost.dataset.id = post.id;
    tagsBlock.innerHTML = post.hashtags.map(
      tag => `<li class="tag"><a href="" >${tag}</a></li>`
    ).join('');
    return newPost;
  }
}
