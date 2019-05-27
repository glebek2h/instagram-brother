package bsu.fpmi.instagram.RestServices;

import javax.servlet.ServletException;
import javax.servlet.annotation.MultipartConfig;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.Part;
import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;

@MultipartConfig
public class UploadServlet extends HttpServlet {

    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        Part part = request.getPart("upload");
        File uploads = new File(getServletContext().getInitParameter("dir"));
        File file = new File(uploads, part.getSubmittedFileName());
        Files.copy(part.getInputStream(), file.toPath());
        response.getOutputStream().println("resources/images/" + part.getSubmittedFileName());
    }


    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String imageName = request.getParameter("image");
        response.getOutputStream().println("<img src = 'resources/images/" + imageName + "' alt=\"File not found.\"/>");
    }
}
