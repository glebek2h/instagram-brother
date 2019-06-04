"use strict";
/**
 * Always store items ordered by date
 */
const defaultFilterConfig = {
  _dateFrom: new Date(-8640000000000000), _dateTo: new Date(8640000000000000), author: '', hashtags: [],
};
const dateConfig = {
  year: 'numeric', month: 'numeric', day: 'numeric', hour: 'numeric', minute: 'numeric',
};

class PhotoPost {
  constructor(id, description, createdAt, author, photolink, tags = [], likes = []) {
    this.id = id;
    this.description = description;
    this.createdAt = new Date(createdAt).toLocaleString('en-Us', dateConfig);
    this.author = author;
    this.photolink = photolink;
    this.hashtags = tags;
    this.likes = likes;
  }

  validate() {
    if (!this.id || !this.description || this.description.length >= 200 || !this.createdAt
        || !this.author || this.author.length === 0 || !this.photolink
        || this.photolink.length === 0) {
      return false;
    }
    return true;
  }
}
class PostsService {

  async getPhotoPosts(skip, top, config) { // TODO
    const response = await fetch(`/photoposts`, {
      method: 'GET',
    }).catch(error => console.log(error));
    if (!response.ok) {
      console.log(response.statusText);
    }
    const result = await response.json();
    return result;
  }

  async getPhotoPost(id) {
    const response = await fetch(`/photo-post?id=${id}`, {
      method: 'GET',
    }).catch(error => console.log(error));
    const result = await response.json();
    return result;
  }

  async addPhotoPost(post) {
    const postId = await this.getPhotoPost(post.id).id;
    if (!postId && post.validate()) {
      const response = fetch('/photo-post', {
        method: 'POST',
        body: JSON.stringify(post),
      }).catch(error => console.log(error));
      if (!response.ok) {
        console.log(response.statusText);
      }
    }
  }

  async editPhotoPost(id, edits) {
    const post = await this.getPhotoPost(id);
    if (post && new PhotoPost(post).validate()) {
      const response = await fetch('/photo-post', {
        method: 'PUT',
        body: JSON.stringify(edits),
      }).catch(error => console.log(error));
      if (!response.ok) {
        console.log(response.statusText);
      }
    }
  }
   /*editPhotoPost(id, edits) {
    const post =  this.getPhotoPost(id);
    if (post && post.validate()) {
      Object.keys(edits).forEach((field) => {
        if (field !== 'id' && field !== 'author' && field !== 'createdAt' && field !== 'likes') {
          post[field] = edits[field];
        }
      });
      return true;
    }
    return false;
  }*/

  removePhotoPost(id) {
    const i = this._photoPosts.findIndex(el => el.id === id);
    if (i === -1) {
      return false;
    }
    this._photoPosts.splice(i, 1);
    return true;
  }

  addAll(postsArray) {
    const badPosts = [];
    postsArray.forEach((post) => {
      const valid = this.addPhotoPost(post);
      if (!valid) badPosts.push(post);
    });
    return badPosts;
  }

  clear() {
    this._photoPosts = [];
  }
}
