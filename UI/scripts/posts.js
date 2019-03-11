var posts = (function () {
    var module = {};
    var photoPosts = [
        {
            id: "1",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2013-02-23T23:00:00"),
            author: "Mr.Snow",
            photoLink: "images/1",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "2",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2012-03-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/2",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "3",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "Mr.Snow",
            photoLink: "images/3",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "4",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-05-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/4",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "5",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/5",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "6",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/6",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "7",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-06-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/7",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "8",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/8",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "8",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2015-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/9",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "10",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/10",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "11",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/11",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "12",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2013-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/12",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "13",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/13",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "14",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2011-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/14",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "15",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/15",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "16",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/16",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "17",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/17",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "18",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/18",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "19",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/19",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
        {
            id: "20",
            description: "Herring sea chub Sevan trout sleeper shark, zebra shark chum salmon, mudminnow Atlantic silverside South American Lungfish European eel. Goldspotted killifish snubnose eel Sacramento splittail zingel",
            createdAt: new Date("2018-02-23T23:00:00"),
            author: "gleb9990",
            photoLink: "images/20",
            likes: ["gleb","hleb"],
            hashtags: ["#famcs", "#bsu", "#programming"],
        },
    ];
    var defaultFilterConfig =
    {
        dateFrom: new Date(-8640000000000000),
        dateTo: new Date(8640000000000000),
        author: "",
        hashtags: [],
    };

    function commonHashtags(posthashtags, confighashtags) {
        for (var i = 0; i < posthashtags.length; i++) {
            for (var j = 0; j < confighashtags.length; j++) {
                if (posthashtags[i] == confighashtags[j]) {
                    return true;
                }
            }
        }
        return false;
    }
    module.getPhotoPosts = function (skip = 0, top = 10, filterConfig = defaultFilterConfig) {
        if (typeof skip !== 'number' || typeof top !== 'number' || typeof filterConfig !== 'object') {
            console.log('Incorrect getPhotoPosts params');
            return false;
        }
        var filtered_mas = photoPosts.filter(a =>
            (a.createdAt >= filterConfig.dateFrom || !filterConfig.dateFrom) &&
            (a.createdAt <= filterConfig.dateTo || !filterConfig.dateTo) &&
            (a.author == filterConfig.author || filterConfig.author == "") &&
            (commonHashtags(a.hashtags, filterConfig.hashtags) || filterConfig.hashtags.length == 0)
        ).sort(function (a, b) {
            return a.createdAt - b.createdAt;
        }).slice(skip, skip + top);
        return filtered_mas;
    }

    module.getPhotoPost = function (id)//check
    {
        return photoPosts.find((el) => el.id === id);
    };
    module.validatePhotoPost = function (post) {
        if (typeof (post.author) !== 'string' || typeof (post.description) !== 'string' ||
            !post.createdAt || !post.author || !post.photoLink || typeof (post.photoLink) !== 'string' ||
            !post.likes || typeof (post.id) !== 'string' || !(post.createdAt instanceof Date))
            return false;
        return true;
    };
    module.addPhotoPost = function (post) {
        if (!photoPosts.find((el) => el.id === post.id) && validatePhotoPost(post)) {
            photoPosts.push(post);
            photoPosts.sort((a, b) => a.createdAt - b.createdAt);
            return true;
        }
        return false;
    };
    module.editPhotoPost = function (id, edits) {
        const i = photoPosts.findIndex((el) => el.id === id);
        if (i === -1) {
            console.log('No posts with such ID');
            return false;
        }
        var post = posts.getPhotoPost(id);
        for (var field in edits) {
            if (field != "id" && field != "author" && field != "createdAt" && field != "likes") {
                post[field] = edits[field];
            }
        }
        console.log(post);
        return true;
    };
    module.removePhotoPost = function (id) {
        const i = photoPosts.findIndex((el) => el.id === id);
        if (i === -1) {
            console.log('No posts with such ID');
            return false;
        }
        photoPosts.splice(i, 1);
        console.log(photoPosts);
        return true;
    };

    return module;
})();
