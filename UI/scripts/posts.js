
/**
 * Always store items ordered by date
 */

const defaultFilterConfig = {
  _dateFrom: new Date(-8640000000000000), _dateTo: new Date(8640000000000000), _author: '', _hashtags: [],
};
class PhotoPost {
  constructor(id, description, createdAt, author, photolink, tags = [], likes = []) {
    this._id = id;
    this._description = description;
    this._createdAt = new Date(createdAt);
    this._author = author;
    this._photolink = photolink;
    this._hashtags = tags;
    this._likes = likes;
  }

  validate() {
    if (!this._id || !this._description || this._description.length >= 200 || !this._createdAt
        || !this._author || this._author.length === 0 || !this._photolink
        || this._photolink.length === 0) {
      return false;
    }
    return true;
  }
}
class PhotoPosts {
  constructor() {
    this._photoPosts = [];
  }

  getPhotoPosts(skip = 0, top = 10, filterConfig = defaultFilterConfig) {
    if (typeof skip !== 'number' || typeof top !== 'number' || typeof filterConfig !== 'object') {
      return false;
    }
    filterConfig = Object.assign({}, defaultFilterConfig, filterConfig || {});
    let filtered = this._photoPosts
      .filter(a => (new Date(a._createdAt) >= filterConfig._dateFrom || !filterConfig._dateFrom)
        && (new Date(a._createdAt) <= filterConfig._dateTo || !filterConfig._dateTo)
        && (a._author === filterConfig._author || filterConfig._author === '')
        && (filterConfig._hashtags.length === 0
        || filterConfig._hashtags.every(el => a._hashtags.includes(el))));
    filtered = filtered.sort((a, b) => b._createdAt - a._createdAt).slice(skip, skip + top);
    return filtered;
  }

  getPhotoPost(id) {
    return this._photoPosts.find(el => el._id === id) || undefined;
  }

  addPhotoPost(post) {
    if (!this.getPhotoPost(post._id) && post.validate()) {
      this._photoPosts.push(post);
      return true;
    }
    return false;
  }

  editPhotoPost(id, edits) {
    const post = this.getPhotoPost(id);
    if (post !== undefined && post.validate()) {
      Object.keys(edits).forEach((field) => {
        if (field !== '_id' && field !== '_author' && field !== '_createdAt' && field !== '_likes') {
          post[field] = edits[field];
        }
      });
      return true;
    }
    return false;
  }

  removePhotoPost(id) {
    const i = this._photoPosts.findIndex(el => el._id === id);
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
