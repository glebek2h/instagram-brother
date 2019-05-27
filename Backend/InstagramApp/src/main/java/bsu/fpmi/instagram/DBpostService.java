package bsu.fpmi.instagram;

import bsu.fpmi.instagram.common.FilterConfig;
import bsu.fpmi.instagram.common.Post;

import java.sql.*;
import java.util.*;

public class DBpostService implements IPostService {
    private static final String userName = "root";
    private static final String password = "seva221299A";
    private static final String connectionURL = "jdbc:mysql://localhost:3306/meh?useSSL=false";
    private Connection connection = null;

    DBpostService() {
        try {
            connection = DriverManager.getConnection(connectionURL, userName, password);
        } catch (SQLException e) {
            e.printStackTrace();
        }
    }

    @Override
    public Post getPost(String id) {
        try {
            PreparedStatement ps = connection.prepareStatement("SELECT * FROM PHOTO_POST WHERE USER_ID = ?");
            ps.setInt(1, Integer.parseInt(id));
            ResultSet rs = ps.executeQuery();

            PreparedStatement ps2 = connection.prepareStatement("SELECT * FROM USER WHERE USER_ID = ?");
            ps2.setInt(1, Integer.parseInt(id));
            ResultSet rs2 = ps2.executeQuery();

            rs.next();
            rs2.next();
            String photoLink = rs.getString("PHOTO_LINK");
            String ID = Integer.toString(rs.getInt("POST_ID"));
            String description = rs.getString("DESCRIPTION");
            java.sql.Date date = rs.getDate("CREATION_DATE");
            String author = rs2.getString("NAME");
            return new Post(ID, description, date, author, photoLink, new ArrayList<>(), new ArrayList<>());//TODO tags + likes
        } catch (SQLException e) {
            e.printStackTrace();
            return new Post();
        }
    }

    @Override
    public List<Post> getPage(int skip, int top, FilterConfig filterConfig) {
        return null;
    }

    @Override
    public boolean addPost(Post post) {
        try {
            PreparedStatement ps = connection.prepareStatement("INSERT INTO `PHOTO_POST` VALUES (?,?,?,?,?)");
            ps.setInt(1, rnd(100,1000));
            ps.setString(2, post.getDescription());
            ps.setString(3, post.getCreatedAt().toString());
            ps.setString(4, post.getPhotolink());
            ps.setInt(5, Integer.parseInt(post.getId()));
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean deletePost(String id) {
        try {
            PreparedStatement ps = connection.prepareStatement("DELETE FROM PHOTO_POST WHERE POST_ID = ?");
            ps.setInt(1, Integer.parseInt(id));
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public boolean editPost(Post newPost) {
        try {
            String postID = newPost.getId();
            PreparedStatement ps = connection.prepareStatement(
                    "UPDATE PHOTO_POST SET DESCRIPTION = ?,PHOTO_LINK = ? " + //TODO: hastags
                            "WHERE USER_ID = ?");
            ps.setString(1, newPost.getDescription());
            ps.setString(2, newPost.getPhotolink());
            ps.setInt(3, Integer.parseInt(postID));
            ps.executeUpdate();
            return true;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
    public static int rnd(int min, int max)
    {
        max -= min;
        return (int) (Math.random() * ++max) + min;
    }
    public static void main(String[] args) {
        DBpostService DB = new DBpostService();
        System.out.println(DB.getPost("3"));
        DB.deletePost("16");
        DB.editPost(new Post("3", "SYPERdqwqwdTEST1", new GregorianCalendar(2016, Calendar.FEBRUARY, 11).getTime(), "glebyshek", "resources/images/SYPERTEST.jpg",
                new ArrayList<>(), new ArrayList<>()));
        System.out.println(DB.getPost("3"));
        /*DB.addPost(new Post("19", "big-kaka", new GregorianCalendar(2016, Calendar.FEBRUARY, 11).getTime(), "glebyshek", "resources/images/SYPERTEST.jpg",
                new ArrayList<>(), new ArrayList<>()));*/
    }
}
