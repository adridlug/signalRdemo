

var userInput = document.getElementById("userInput");
var msgPage = document.getElementById("msgPage"); 

console.log("registering user...")
var user = registerUserIfNeeded();
var connection = setupAndConnectSignalR();
registerUiEventHandlers();


function appendSentMessage(msg) {
    var p = document.createElement("p");
    p.className = "single-msg"
    p.textContent = msg;

    if (msgPage.lastChild.className === "outgoing-chats")
    {
        msgPage.lastChild.lastChild.lastChild.appendChild(p);
        scroll();
        return;
    }

    var divOutChats = document.createElement('div');
    divOutChats.className = "outgoing-chats";
    
    var divOutMsgs = document.createElement('div');
    divOutMsgs.className = "outgoing-msg";
    
    var divOutChatsMsg = document.createElement('div');
    divOutChatsMsg.className = "outgoing-chats-msg"
    
    divOutChatsMsg.appendChild(p);
    divOutMsgs.appendChild(divOutChatsMsg)
    divOutChats.appendChild(divOutMsgs);
    msgPage.appendChild(divOutChats);
    scroll();
}

function appendReceivedMessage(msg)
{
    var p = document.createElement("p");
    p.className = "single-msg"
    p.textContent = msg;

    if (msgPage.lastChild.className === "received-chats")
    {
        msgPage.lastChild.lastChild.lastChild.appendChild(p);
        scroll();
        return;
    }

    var divReceivedChats = document.createElement('div');
    divReceivedChats.className = "received-chats";
    
    var divReceivedMsgs = document.createElement('div');
    divReceivedMsgs.className = "received-msg";
    
    var divReceivedMsgInbox = document.createElement('div');
    divReceivedMsgInbox.className = "received-msg-inbox"
    
    divReceivedMsgInbox.appendChild(p);
    divReceivedMsgs.appendChild(divReceivedMsgInbox);
    divReceivedChats.appendChild(divReceivedMsgs);
    msgPage.appendChild(divReceivedChats);
    scroll();
}

function setupAndConnectSignalR() {
    var _connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

    _connection.on("OnMessageReceived", function (user, message) {
        appendReceivedMessage(message);
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

function sendMessage()
{
    var msg = userInput.value;

    appendSentMessage(msg);

    connection.invoke("SendMessage", user, "Nico", msg).catch(function (err) {
        console.error(err.toString());
    });
}

function registerUiEventHandlers() {
    userInput.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            sendMessage();
        }
    });
}

function scroll() {
    msgPage.scrollTop = msgPage.scrollHeight;
}