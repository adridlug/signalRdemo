
var button = document.getElementById("sendButton");
var msgList = document.getElementById("messagesList");

console.log("registering user...")
var user = registerUserIfNeeded();
var connection = setupAndConnectSignalR();
registerUiEventHandlers();


function setupAndConnectSignalR() {
    var _connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

    _connection.on("OnMessageReceived", function (user, message) {
        var li = document.createElement("li");
        li.textContent = user+ " wrote: "+message;
        msgList.appendChild(li);
    });

    _connection.on("OnNewUserRegistered", function (user) {
        var li = document.createElement("li");
        li.textContent = user+ " joined the chat";
        msgList.appendChild(li);
    });
    
    _connection.onreconnecting(function (error) {
        if (error)
        {
            console.log(error);
        }
        console.log("reconnecting");
    });
    
    _connection.onreconnected( function (connectionId) {
        console.log("Successfully reconnected");
        if (connectionId)
            console.log("ConnectionId: "+connectionId);
    });
    
    _connection.start().then(function () { 
        button.disabled = false;
        console.log("connected");
        _connection.invoke("RegisterUser", user).catch(function (err) {
            console.error(err.toString());
        })
    });

    return _connection;
}

function registerUserIfNeeded() {
    var usr = sessionStorage.getItem("user");
    console.log("User: "+usr);
    if (!usr)
    {
        console.log("calling prompt")
        usr = prompt("Who are you?");
        sessionStorage.setItem("user", usr);
    } 
    document.getElementById("labelUser").textContent = "Hi "+ usr
    return usr;
}

function registerUiEventHandlers() {
    button.addEventListener("click", function(event) {
        var msg = document.getElementById("messageInput").value;
    
        connection.invoke("Broadcast", user, msg).catch(function (err) {
            console.error(err.toString());
        });
    });
}