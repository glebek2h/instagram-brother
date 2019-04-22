<%--
  Created by IntelliJ IDEA.
  User: fpm.kazachin
  Date: 2019-04-21
  Time: 20:46
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
        String name = request.getParameter("name");
    %>
    <%= "Name is " + name %>
</p>
</body>
</html>
