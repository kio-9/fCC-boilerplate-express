require('dotenv').config() // to access .env variables
const bodyParser = require('body-parser'); // to parse POST requests
let express = require('express');
let app = express();

app.use(bodyParser.urlencoded({extended: false})); // middleware to handle URL encoded data
// extended is a configuration option that tells body-parser which parsing needs to be used. 
// When extended=false it uses the classic encoding querystring library. 
// When extended=true it uses qs library for parsing.

// The order of the middlewares matter
app.use("/", function(req, res, next) {
    const method = req.method;
    const path = req.path;
    const ip = req.ip;

    console.log(`${method} ${path} - ${ip}`);
    next();
})

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
    let msg = "Hello json";
    if (process.env.MESSAGE_STYLE === "uppercase") {
        msg = msg.toUpperCase();
    }
    const jsonData ={"message": msg};
    res.json(jsonData);
})

// Chained middleware and final handler
app.get("/now", function(req, res, next){ // middleware
    req.time = new Date().toString();
    next();
}, function(req, res){ // handler
    res.json({time: req.time});
})

// the parameter :word in the path is store in req.paramas.word
app.get("/:word/echo", function(req, res, next){
    res.json({echo: req.params.word}); // the next() function is not needed when a response is implemented
});

// to Get Query Parameter Input from the Client
/* 
route_path: '/library'
actual_request_URL: '/library?userId=546&bookId=6754'
req.query: {userId: '546', bookId: '6754'}
*/
const handler = (req, res, next) => {
    if (req.method === "GET"){ // when using get, the data is input in the URL
        res.json({name: `${req.query.first} ${req.query.last}`});
    }
    if (req.method === "POST"){
        res.json({name: `${req.body.first} ${req.body.last}`}); // when using post, the data is input in the body
    }
}
app.route("/name").get(handler).post(handler);




























 module.exports = app;
