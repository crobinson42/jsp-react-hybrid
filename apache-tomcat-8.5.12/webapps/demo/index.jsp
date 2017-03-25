<%@ page
    import="java.io.*"
    import="java.net.*"
%>

<%
    StringBuilder result = new StringBuilder();
    URL url = new URL("http://localhost:3030/main");
    HttpURLConnection conn = (HttpURLConnection) url.openConnection();
    conn.setRequestMethod("GET");
    BufferedReader rd = new BufferedReader(new InputStreamReader(conn.getInputStream()));
    String line;
    while ((line = rd.readLine()) != null) {
     result.append(line);
    }
    rd.close();
    String htmlHeader = result.toString();
%>

<html>
    <head>
        <title>JSP w/ Injected React SSR Example</title>
    </head>

    <body>
        <%= htmlHeader %>



    </body>
</html>