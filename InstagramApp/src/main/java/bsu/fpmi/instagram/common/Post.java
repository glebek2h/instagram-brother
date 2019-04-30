package bsu.fpmi.instagram.common;

import java.util.ArrayList;
import java.util.Date;

public class Post {
    private int id;
    private String description;
    private Date createdAt;
    private String author;
    private String photoLink;
    private ArrayList<String> likes;
    private ArrayList<String> tags;

    public Post(int id, String description, Date createdAt, String author,
                String photoLink, ArrayList<String> likes, ArrayList<String> tags) {
        this.id = id;
        this.description = description;
        this.createdAt = createdAt;
        this.author = author;
        this.photoLink = photoLink;
        this.likes = likes;
        this.tags = tags;
    }

    public int getId() {
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

    public String getPhotoLink() {
        return photoLink;
    }

    public ArrayList<String> getLikes() {
        return likes;
    }

    public ArrayList<String> getTags() {
        return tags;
    }
}