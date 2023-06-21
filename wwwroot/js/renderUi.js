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
