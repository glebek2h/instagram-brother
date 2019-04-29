package bsu.fpmi.instagram;
import com.google.gson.annotations.JsonAdapter;

import javax.servlet.RequestDispatcher;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;

@WebServlet(name = "Posts")
public class PostsServlet extends HttpServlet {

    private Posts posts = new Posts();

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String JSONPost = request.getReader().readLine();
        posts.addPost(JSONPost);
    }

    protected void doPut(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String JSONPost = request.getReader().readLine();
        posts.editPost(JSONPost);
    }

    protected void doDelete(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String id = request.getParameter("id");
        response.getWriter().write(posts.deletePost(id));
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        String id = request.getParameter("id");
        String result = id != null ? posts.getPost(id) : posts.getPosts();
        response.getWriter().write(result);
    }
}