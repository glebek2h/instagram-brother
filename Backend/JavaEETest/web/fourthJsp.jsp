<%--
  Created by IntelliJ IDEA.
  User: fpm.kazachin
  Date: 2019-04-22
  Time: 20:54
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>Title</title>
</head>
<body>
<p>
    <%
        RequestDispatcher dispatcher = request.getRequestDispatcher("/firstJsp.jsp");
        dispatcher.forward(request, response);
    %>
</p>
</body>
</html>
