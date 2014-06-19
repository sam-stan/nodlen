"use strict";
var http = require("http"),
    express = require("express"),
    path = require("path"),
    socket = require("socket.io"); 

var exprs = express();

exprs.set("views",path.join(__dirname,"views"));
exprs.set("view engine","ejs");

var httpserver = http.createServer( function () {
  console.log("this is a http sever test");
});

var expressserver = exprs.get("/",function (req, res){
  res.render("index",{ 
               content: "hey i am being rendered ._.",
               title: "I am from server ._."
  });
});

httpserver.listen(1234);
expressserver.listen(1235);

var htserver = http.createServer(expressserver).listen(1236);
var io = socket.listen(htserver);

io.sockets.on("connection", function (socket) {
  socket.emit("serverdata",
  {
    "where": "i am from server",
    "when": "just now",
    "who": "Sam"
  });
});
