# jsp-react-hybrid
A Tomcat server will use JSP's to build webpages using Node.js &amp; React.js server side rendering


### Setup

> You must have Node.js installed on your system and ports 3030 & 8080 not currently in-use

You'll need to startup the 2 servers, in the project root run these commands:

Run cmd > `sh start_tomcat.sh`

> This will install npm deps then start the node.js server on port 3030

Run cmd > `sh start_node.sh`

> This will start Tomcat on port 8080

In your browser you can view the running JSP page for this demo at `localhost:8080/demo`. That
JSP is calling the node.js server for a server-side-rendered React component and
injecting the result into the JSP-html body.

You can also view the running node.js server by going to `localhost:3030/{package-name[@{version number}]}`.
For purposes of demonstration I've setup an npm package names `hoopla-common`.
You can run `localhost:3030/hoopla-common@2.0.1` (you can omit or change version number).


