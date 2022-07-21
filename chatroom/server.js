
const express = require('express');
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io=require("socket.io")(server);
// Set static folder
app.use(express.static(path.join(__dirname+"/public")));

io.on("connection", function(socket){
    socket.on("newuser", function(username){
     socket.broadcast.emit("update", username + "joined the conversation");
    });
    socket.on("exituser",function(username){
        socket.broadcast.emit("update", username + "left the conversation");
       });
    socket.on("chat",function(message){
        socket.broadcast.emit("chat",message);
       });

});
server.listen(3000, () => console.log(`Server running on port 3000`));
