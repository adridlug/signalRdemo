

var userInput = document.getElementById("userInput");
var msgPage = document.getElementById("msgPage"); 

console.log("registering user...")
var user = registerUserIfNeeded();
var connection = setupAndConnectSignalR();
registerUiEventHandlers();


function appendSendMessage(msg) {
    var divOutChats = document.createElement('div');
    divOutChats.className = "outgoingchats";
    var divOutMsgs = document.createElement('div');
    divOutMsgs.className = "outgoing-msg";
    var divOutChatsMsg = document.createElement('div');
    divOutChatsMsg.className = "outgoing-chats-msg"
    var p = document.createElement("p");
    p.textContent = msg;

    divOutChatsMsg.appendChild(p);
    divOutMsgs.appendChild(divOutChatsMsg)
    divOutChats.appendChild(divOutMsgs);
    msgPage.appendChild(divOutChats);
}

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
    document.getElementById("pUser").textContent = "User name: "+ usr
    return usr;
}

function registerUiEventHandlers() {
    userInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            var msg = userInput.value;

            appendSendMessage(msg);

            connection.invoke("Broadcast", user, msg).catch(function (err) {
                console.error(err.toString());
            });
        }
      });
}