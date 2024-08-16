let express = require('express');
let app = express();

// Using middlewares to access static assets in the public directory
app.use("/public", express.static(__dirname + "/public"));

app.get("/", function(req, res) {
    // serves the string "Hello Express" when a get request is made in the root directory "/"
    // res.send('Hello Express');

    // to respond to requests with a file
    // Use Node global variable __dirname to get the absolute path of the file
    const absolutePath = __dirname + "/views/index.html";
    res.sendFile(absolutePath);
})

// to create an API that sends a JSON
app.get("/json", function(req, res) {
    res.json({"message": "Hello json"});
})
































 module.exports = app;
