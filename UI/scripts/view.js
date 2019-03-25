const photoPosts = new PhotoPosts();
photoPosts.addPhotoPost(new PhotoPost('1', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2011-02-23T23:00:00'), 'gleb9990', 'images/1.jpg', ['#famcs'], ['kek']));
photoPosts.addPhotoPost(new PhotoPost('2', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2000-02-23T23:00:00'), 'nastya', 'images/2.jpg', ['#bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('3', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2018-02-23T23:00:00'), 'glebek2h', 'images/3.jpg', ['#famcs', '#bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('4', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2014-02-23T23:00:00'), 'gleb9990', 'images/4.jpg', ['#famcs', '#bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('5', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2018-02-23T23:00:00'), 'kop', 'images/5.jpg', ['#famcs', '#bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('6', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2012-02-23T23:00:00'), 'dima', 'images/6.jpg', ['#famcs', '#bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('7', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2007-02-23T23:00:00'), 'sasha', 'images/7.jpg', ['#famcs', '#bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('8', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2018-02-23T23:00:00'), 'gleb', 'images/8.jpg', ['#famcs', ' #bsu'], ['lol', 'kek']));
photoPosts.addPhotoPost(new PhotoPost('9', 'Hackerman refers to an image of the character HACKERMAN from the 2015 film Kung Fury that is used in jokes regarding a persons inflated sense of self-esteem when they solve a simple technical issue. ', new Date('2018-02-23T23:00:00'), 'gleb9990', 'images/10.jpg', ['#famcs', '#bsu'], ['lol', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1', 'kek', '1']));

const dateConfig = {
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
};
class View {
  constructor() {
    this.isLoggedUser = false;
  }

  static addPost(post) {
    if (photoPosts.addPhotoPost(post)) {
      const wrapper = document.querySelector('#wrapper');
      const newPost = this.getNodeWithHtml(post);
      wrapper.insertAdjacentElement('afterbegin', newPost);
      return true;
    }
    return false;
  }

  static deletePost(id) {
    if (photoPosts.removePhotoPost(id)) {
      const childNode = document.getElementsByClassName(`${id}`)[0];
      if (childNode) {
        childNode.parentNode.removeChild(childNode);
      }
      return true;
    }
    return false;
  }

  static editPost(id, edits) {
    if (photoPosts.editPhotoPost(id, edits)) {
      const childNode = document.getElementsByClassName(`${id}`)[0];
      if (childNode) {
        const editedChildNode = this.getNodeWithHtml(photoPosts.getPhotoPost(id));
        childNode.parentNode.replaceChild(editedChildNode, childNode);
      }
      return true;
    }
    return false;
  }

  static showPosts() {
    photoPosts._photoPosts.forEach((post) => {
      const wrapper = document.querySelector('#wrapper');
      const newPost = this.getNodeWithHtml(post);
      wrapper.insertAdjacentElement('afterbegin', newPost);
    });
  }

  static headerView() {
    const header = document.createElement('header');
    header.innerHTML = `
          <h1 class = "site-name"> glebogram </h1>
          ${this.isLoggedUser ? `<button class="add-post"><i class="fas fa-plus fa-2x"></i></button>
          <div class = "user-name">gleb9990</div>
          <button id = "log-out"><img src="images/user-image.png" alt="user-image" id = "user-pic"></button>` : ''}
          ${this.isLoggedUser ? '' : '<button id = "sign-in"><span>sign in</span></button>'}`;
    const body = document.getElementsByTagName('body')[0];
    body.parentNode.appendChild(header);
    body.insertAdjacentElement('afterbegin', header);
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
    newPost.classList.add(`${post.id}`);
    const tagsBlock = newPost.querySelector('.tags-block');
    post.hashtags.forEach((tag) => {
      const li = document.createElement('li');
      li.classList.add('tag');
      li.innerHTML = `<a href="" >${tag}</a>`;
      tagsBlock.insertAdjacentElement('beforebegin', li);
    });
    return newPost;
  }
}
