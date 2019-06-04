package bsu.fpmi.instagram.common;

import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

public class Post {
    private String id;
    private String description;
    private Date createdAt;
    private String author;
    private String photolink;
    private List<String> likes;
    private List<String> hashtags;

    public Post() {
        this.id = "";
        this.description = "";
        this.createdAt = new Date();
        this.author = "";
        this.photolink = "";
        this.likes = Collections.emptyList();
        this.hashtags = Collections.emptyList();
    }
    public Post(String id, String description, Date createdAt, String author,
                String photolink, ArrayList<String> likes, ArrayList<String> tags) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photolink = photolink;
        this.likes = likes;
        this.hashtags = tags;
    }

    public String getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public Date getCreatedAt() {
        return createdAt;
    }

    public String getAuthor() {
        return author;
    }

    public String getPhotolink() {
        return photolink;
    }

    public List<String> getLikes() {
        return likes;
    }

    public List<String> getHashtags() {
        return hashtags;
    }

    public void setId(String id) {
        this.id = id;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public void setCreatedAt(Date createdAt) {
        this.createdAt = createdAt;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public void setPhotolink(String photolink) {
        this.photolink = photolink;
    }

    public void setLikes(List<String> likes) {
        this.likes = likes;
    }

    public void setHashtags(List<String> hashtags) {
        this.hashtags = hashtags;
    }

    @Override
    public String toString() {
        return "Post{" +
                "id='" + id + '\'' +
                ", description='" + description + '\'' +
                ", createdAt=" + createdAt +
                ", author='" + author + '\'' +
                ", photolink='" + photolink + '\'' +
                ", likes=" + likes +
                ", hashtags=" + hashtags +
                '}';
    }
}