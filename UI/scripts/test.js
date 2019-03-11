var authorConfig = {
    dateFrom: new Date(-8640000000000000),
    dateTo: new Date(8640000000000000),
    author: "Mr.Snow",
    hashtags: [],
};
var post = {
    id: "322",
    description: "MMM",
    createdAt: new Date("2000-02-23T23:00:00"),
    author: "glebek2h",
    photoLink: "images/38",
    likes: ["gleb", "seva"],
    hashtags: ["#famcs", "#bsu", "#programming"],
}
function test() {
    console.log(posts.getPhotoPosts(0, 10, { author: "Mr.Snow", dateFrom: new Date("2015-02-23T23:00:00") }));
    console.log("trying to add 'good' posts - successful:")
    posts.addPhotoPost(post);
    console.log(posts.getPhotoPosts(0, 30));
    posts.addPhotoPost({
        id: "228",
        description: "MMM",
        createdAt: new Date("2019-03-11T23:22:00"),
        author: "glebek2h",
        photoLink: "images/132",
        likes: ["glebyshek", "seva"],
        hashtags: ["#famcs", "#bsu", "#programming"],
    });
    console.log(posts.getPhotoPosts(0, 30));
    console.log("trying to add 'bad' posts - unsuccessful:")
    posts.addPhotoPost({
        id: "228",
        description: "MMM",
        createdAt: new Date("2019-03-11T23:22:00"),
        photoLink: "images/132",
        likes: ["glebyshek", "seva"],
        hashtags: ["#famcs", "#bsu", "#programming"],
    });

    console.log(posts.getPhotoPosts(0, 30));
    console.log("-getPhotoPosts");
    console.log("10 posts:");
    console.log(posts.getPhotoPosts());
    console.log("3 posts start from the second:");
    console.log(posts.getPhotoPosts(1, 3));
    console.log("skip = 6 and default-argument for top:");
    console.log(posts.getPhotoPosts(6));
    console.log("posts after filtering:");
    console.log(posts.getPhotoPosts(0, 10, {
        author: "glebek2h",
        hashtags: ["#famcs", "#bsu"],
        startDate: new Date(2018, 0, 0),
    }));

    console.log("-getPhotoPost");
    console.log("post with id 2:");
    console.log(posts.getPhotoPost("2"));
    console.log("post with id 100:");
    console.log(posts.getPhotoPost("100"));
    console.log("with invalid argument:");
    console.log(posts.getPhotoPost(100));

    console.log("-validatePhotoPost");
    console.log("with valid");
    console.log(posts.validatePhotoPost({
        id: "228",
        author: "glebushek",
        description: "MMMM",
        photoLink: "acdw",
        createdAt: new Date("2018-01-01")
    }));
    console.log("with invalid");
    console.log(posts.validatePhotoPost({
        author: "glebushek",
        photoLink: "acdw",
        createdAt: new Date("2018-01-01")
    }));

    console.log("-editPhotoPost");
    console.log("id=3 post before editing:");
    console.log(posts.getPhotoPost("3"));
    console.log("try to edit id=3 post:");
    console.log(posts.editPhotoPost("3", {
        description: "new description",
        hashtags: ["new tag1", "new tag2"]
    }));
    console.log("id=3 post after editing:");
    console.log(posts.getPhotoPost("3"));
    console.log("with invalid argument:");
    console.log(posts.editPhotoPost("213"));

    console.log("-removePhotoPost");
    console.log("with invalid argument:");
    console.log(posts.removePhotoPost(""));
    console.log("remove id=3 post");
    console.log(posts.removePhotoPost("3"));
    console.log("try to get id=3 post");
    console.log(posts.getPhotoPost("3"));
    console.log("all posts: ");
    console.log(posts.getPhotoPosts(0, 30));
}
test();