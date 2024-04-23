const http = require("http");
const fs = require("fs");
const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    fs.readFile("message.text", (err, data) => {
      console.log(err);
      //console.log(data.toString());
      const fileData = data.toString();
      console.log(fileData);
      res.write("<html>");
      res.write(`<head>${fileData}</head>`);
      //res.write("<html>");
      res.write(
        '<body><form action="/message" method="POST"><input type="text" name="message"><button type="submit">send</button></form></body>'
      );
      res.end();
    });
  }
  if (url === "/message" && method === "POST") {
    const body = [];
    req.on("data", (chunk) => {
      console.log("chunk", chunk);
      body.push(chunk);
      console.log("body", body);
    });
    req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      console.log("parse", parsedBody);
      const message = parsedBody.split("=")[1];
      fs.writeFile("message.text", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
});
server.listen(3000);
