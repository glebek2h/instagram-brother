import javax.servlet.*;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class TimeMeasurementFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) {

    }

    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        long start = System.currentTimeMillis();
        chain.doFilter(request, response);
        long end = System.currentTimeMillis();

        HttpServletRequest httpServletRequest = ((HttpServletRequest) request);
        String requestURI = httpServletRequest.getRequestURI();

        if (requestURI.startsWith("/")) {
            request.getRequestDispatcher(requestURI.concat(" - " + (end - start) + "ms"))
                    .forward(request,response);
        } else {
            chain.doFilter(httpServletRequest, response);
        }
    }

    @Override
    public void destroy() {

    }
}
