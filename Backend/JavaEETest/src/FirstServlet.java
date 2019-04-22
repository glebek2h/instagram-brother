import java.io.IOException;
import com.google.gson.*;
public class FirstServlet extends javax.servlet.http.HttpServlet {
    protected void doPost(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {
        //if(request.getRequestURL().equals("check"))
        //{
            //Gson gson = new Gson();
            //response.getWriter().println(gson.toJson(response.getStatus()));
        //}
        //response.getWriter().println("post");
    }

    protected void doGet(javax.servlet.http.HttpServletRequest request, javax.servlet.http.HttpServletResponse response) throws javax.servlet.ServletException, IOException {

        response.getWriter().println("Java Web Application");
    }
}
