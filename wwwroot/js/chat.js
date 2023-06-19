var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

var button = document.getElementById("sendButton");
var msgList = document.getElementById("messagesList");

button.addEventListener("click", function(event) {
    var user = document.getElementById("userInput").value;
    var msg = document.getElementById("messageInput").value;

    connection.invoke("Broadcast", user, msg).catch(function (err) {
        console.error(err.toString());
    });
});


button.disabled = true;

connection.on("OnMessageReceived", function (user, message) {
    var li = document.createElement("li");
    li.textContent = user+ " wrote: "+message;
    msgList.appendChild(li);
});

connection.onreconnecting(function (error) {
    if (error)
    {
        console.log(error);
    }
    console.log("reconnecting");
});

connection.onreconnected( function (connectionId) {
    console.log("Successfully reconnected");
    if (connectionId)
        console.log("ConnectionId: "+connectionId);
});

connection.start().then(function () { 
    button.disabled = false;
    console.log("connected");
});