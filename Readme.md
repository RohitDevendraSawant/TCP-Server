# ExpressLite – A Minimal HTTP Server Built on Raw TCP

## Aim of the Project

The purpose of ExpressLite is to demonstrate how Express.js works internally..by building a lightweight HTTP server using Node’s native `net` module, without relying on the built-in `http` package.

This project is for learning and experimentation, showing:
- How raw TCP sockets handle HTTP communication.
- How HTTP requests can be parsed manually.
- How to route requests using a minimal routing system.
- How Express-like `get()` and `post()` handlers can be implemented.

## Note:
- Express internally wraps a TCP server using Node’s http module enabling connections from browsers and Postman.
Since ExpressLite uses only the TCP layer, it must be tested using tools like curl.
Detailed testing steps are included in the last section.

## Technologies & Packages Used

 - Typescript
 - NodeJs
 - net module

## Project Flow

1. **Client connects** → The TCP server accepts a connection via Node’s `net.createServer()`.
2. **Raw request received** → Data arrives in raw HTTP format (headers + body).
3. **Request parsing** → `RequestParser` splits and extracts:
   - Method (e.g., GET, POST)
   - Path (e.g., `/data`)
   - Headers
   - Body (if `Content-Length` present)
4. **Routing** → `RouteStore` looks up the matching handler for `(method, path)`.
5. **Response generation** → `HttpRes` builds a raw HTTP response.
6. **Response sent** → The TCP socket writes back to the client.
7. **Connection closed** → Client disconnects, completing the request-response cycle.

## Example Usage

import { tcpServer } from "./TCPServer";

const app = tcpServer();

app.get("/", (req, res) => {
  res.send(200, "Hello from ExpressLite GET!");
});

app.post("/data", (req, res) => {
  console.log("Received body:", req.getBody());
  res.send(200, "POST data received!");
});

app.listen(8080, () => {
  console.log("🚀 ExpressLite server running on port 8080");
});

Alternately you can use the clientServer.js file from repo.

## Steps to test
 - clone the repo.
 - run npm i in terminal.
 - run npm run test to run clientServer.js
 - this will start the TCP server and server is now able to receive the req.
 - hit this curl in another terminal: curl.exe -v http://localhost:8080/

