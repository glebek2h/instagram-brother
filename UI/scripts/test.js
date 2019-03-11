var authorConfig = {
    dateFrom: new Date(-8640000000000000),
    dateTo: new Date(8640000000000000),
    author: "Mr.Snow",
    hashtags: [],
};
var unvalid = {
    id: "29",
    description: ".",
    createdAt: new Date("2018-02-23T23:00:00"),
    author: "dqwq",
    hashtags: ["awd"],
};
var valid = {
    id: "2",
    description: ".",
    createdAt: new Date("2018-02-23T23:00:00"),
    author: "dwqqdw",
    photoLink: 'dqwwd',
    likes: 10,
    hashtags: ["adw"],
};
var post = {
    id: "10",
    description: "MMM",
    createdAt: new Date("2000-02-23T23:00:00"),
    author: "glebek2h",
    photoLink: "images/38",
    likes: 100,
    hashtags: ["#famcs", "#bsu", "#programming"],
}
function test() {
    console.log(posts.getPhotoPost("1"));
    console.log(posts.getPhotoPosts(0, 10));
    console.log(posts.getPhotoPosts(0, 10, authorConfig));
    console.log(posts.validatePhotoPost(unvalid));
    posts.addPhotoPost(post);
    console.log(posts.getPhotoPosts(0, 21));
    posts.editPhotoPost("1", { photoLink: "http://google.com", hashtags: ["cats", "dogs"] });
    posts.removePhotoPost("2");
    console.log(posts.getPhotoPosts(0, 10));
    console.log(posts.getPhotoPosts(0, 10, authorConfig));
}
test();