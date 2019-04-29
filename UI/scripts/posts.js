
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
class PhotoPosts {
  constructor() {
    this._photoPosts = [];
    this.restore();
  }

  save() {
    localStorage.removeItem('posts');
    const jsonPosts = JSON.stringify(this._photoPosts);
    localStorage.setItem('posts', jsonPosts);
  }

  restore() {
    if (localStorage.length !== 0) {
      const jsonPosts = localStorage.getItem('posts');
      const objectsArray = JSON.parse(jsonPosts);
      objectsArray.forEach((post) => {
        this._photoPosts.push(new PhotoPost(post.id, post.description, post.createdAt, post.author, post.photolink, post.hashtags, post.likes));
      });
    }
  }

  getPhotoPosts(skip = 0, top = 10, filterConfig = defaultFilterConfig) {
    if (typeof skip !== 'number' || typeof top !== 'number' || typeof filterConfig !== 'object') {
      return false;
    }
    filterConfig = Object.assign({}, defaultFilterConfig, filterConfig || {});
    let filtered = this._photoPosts
      .filter(a => (new Date(a.createdAt) >= filterConfig._dateFrom || !filterConfig._dateFrom)
        && (new Date(a.createdAt) <= filterConfig._dateTo || !filterConfig._dateTo)
        && (a.author === filterConfig.author || filterConfig.author === '')
        && (filterConfig.hashtags.length === 0
        || filterConfig.hashtags.every(el => a.hashtags.includes(el))));
    filtered = filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(skip, skip + top);
    return filtered;
  }

  getPhotoPost(id) {
    return this._photoPosts.find(el => el.id === id);
  }

  addPhotoPost(post) {
    if (!this.getPhotoPost(post.id) && post.validate()) {
      this._photoPosts.push(post);
      this.save();
      return true;
    }
    return false;
  }

  editPhotoPost(id, edits) {
    const post = this.getPhotoPost(id);
    if (post && post.validate()) {
      Object.keys(edits).forEach((field) => {
        if (field !== 'id' && field !== 'author' && field !== 'createdAt' && field !== 'likes') {
          post[field] = edits[field];
        }
      });
      this.save();
      return true;
    }
    return false;
  }

  removePhotoPost(id) {
    const i = this._photoPosts.findIndex(el => el.id === id);
    if (i === -1) {
      return false;
    }
    this._photoPosts.splice(i, 1);
    this.save();
    return true;
  }

  addAll(postsArray) {
    const badPosts = [];
    postsArray.forEach((post) => {
      const valid = this.addPhotoPost(post);
      if (!valid) badPosts.push(post);
    });
    this.save();
    return badPosts;
  }

  clear() {
    this._photoPosts = [];
  }
}
