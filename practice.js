const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const url = req.url;
  const method = req.method;

  if (url === "/") {
    // Read the file content asynchronously
    fs.readFile("message.txt", (err, data) => {
      if (err) {
        console.error("Error reading message.txt:", err);
        res.statusCode = 500;
        res.end("Error reading message file.");
        return;
      }

      // Now that we have the data, construct the response
      const fileData = data.toString();
      res.write("<html>");
      res.write(`<body>${fileData}</body>`);
      res.write("</html>");
      res.end();
    });
  } else if (url === "/message" && method === "POST") {
    // Handle POST request for saving message (already in your code)
  } else {
    // Handle other routes (optional)
    res.statusCode = 404;
    res.end("404 Not Found");
  }
});

server.listen(3000);
