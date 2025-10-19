const { tcpServer } = require("./dist/index");

const app = tcpServer();

app.get("/", (req, res) => {
  res.send("Hello, World!");
})

app.post("/data", (req, res) => {
  res.send(`Received data: ${req.getBody()}`);
});

app.listen(8080, () => {
  console.log("TCP Server is listening on port 8080");
});