var msgInbox = document.getElementById("msgInbox");

console.log("registering user...")
var senderUser = registerUserIfNeeded();
var connection = setupAndConnectSignalR();

function appendSentMessage(receiverUser, msg) {
    var msgPage = document.getElementById(receiverUser+"_msgPage");
    var p = document.createElement("p");
    p.className = "single-msg"
    p.textContent = msg;

    if (msgPage.lastChild && msgPage.lastChild.className === "outgoing-chats")
    {
        msgPage.lastChild.lastChild.lastChild.appendChild(p);
        scroll(msgPage);
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
    scroll(msgPage);
}

function appendReceivedMessage(senderUser, msg)
{
    var msgPage = document.getElementById(senderUser+"_msgPage");
    var p = document.createElement("p");
    p.className = "single-msg"
    p.textContent = msg;

    if (msgPage.lastChild && msgPage.lastChild.className === "received-chats")
    {
        msgPage.lastChild.lastChild.lastChild.appendChild(p);
        scroll(msgPage);
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
    scroll(msgPage);
}

function setupAndConnectSignalR() {
    var _connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

    _connection.on("OnMessageReceived", function (senderUser, message) {
        appendReceivedMessage(senderUser, message);
    });

    _connection.on("OnNewUserRegistered", function (user) {
       appendChatBox(user);
       ping(user);
    });

    _connection.on("OnPingReceived", function(user) {
        appendChatBox(user);
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
        _connection.invoke("RegisterUser", senderUser).catch(function (err) {
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

function sendMessage(receiverUser)
{
    var input = document.getElementById(receiverUser+"_input")
    var msg = input.value;

    appendSentMessage(receiverUser, msg);

    connection.invoke("SendMessage", senderUser, receiverUser, msg).catch(function (err) {
        console.error(err.toString());
    });
}

function ping(receiverUser)
{
    connection.invoke("Ping", senderUser, receiverUser).catch(function (err) {
        console.error(err.toString());
    });
}


function scroll(msgPage) {
    msgPage.scrollTop = msgPage.scrollHeight;
}

function appendChatBox(user)
{
    var chat = document.createElement("div");
    chatclassName = "chats";

    msgInbox.appendChild(chat);

    var msgPage = document.createElement("div");
    msgPage.setAttribute("id", user+"_msgPage");
    msgPage.className = "msg-page";

    chat.appendChild(msgPage);

    var msgBottom = document.createElement("div");
    msgBottom.className = "msg-bottom";

    chat.appendChild(msgBottom)

    var inputGroup = document.createElement("div");
    inputGroup.className = "input-group";

    msgBottom.appendChild(inputGroup);

    var input = document.createElement("input");
    input.className = "form-control";
    input.setAttribute("id", user+"_input");
    input.setAttribute("placeholder", "write message...");
    
    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            sendMessage(user);
        }});

    inputGroup.appendChild(input);
}