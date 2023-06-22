function appendUser(user)
{
    appendNavItem(user);
    appendChatBox(user)
}

function appendNavItem(user)
{
    if (document.getElementById(user+"_li"))
    {
        return;
    }
    
    var navItem = createElement("li", "", user+"_li")
    
    navItem.addEventListener("click", (event) => {
        showUserChatBox(user);
        });

    navItem.appendChild(document.createTextNode(user));
    nav.appendChild(navItem);
}

function createElement(element, className)
{
    var el = document.createElement(element);
    el.className = className;
    return el;
}

function createElement(element, className, id)
{
    var el = document.createElement(element);
    el.className = className;
    el.setAttribute("id", id);
    return el;
}

function showUserChatBox(user)
{
    var userChat = document.getElementById(user+"_chat");
    
    if (!userChat)
    {
        return;
    }
    currentVisibleChat.style.display = "none";
    userChat.style.display = "block";
    currentVisibleChat = userChat;
}

function appendChatBox(user)
{
    if (document.getElementById(user+"_input")) //if user chat box already exists
    {
        return;
    }
    var chat = createElement("div", "chats", user+"_chat");
    
    if (currentVisibleChat === null) //if it is the first chat which is appended
    {
        currentVisibleChat = chat;   
    }
    else
    {
        chat.style.display = "None";
    }
    
    msgInbox.appendChild(chat);
    var msgPage = createElement("div", "msg-page", user+"_msgPage");

    chat.appendChild(msgPage);

    var msgBottom = createElement("div", "msg-bottom");

    chat.appendChild(msgBottom)

    var inputGroup = createElement("div", "input-group");

    msgBottom.appendChild(inputGroup);
    
    var input = createElement("input", "form-control", user+"_input");
    input.setAttribute("placeholder", "write message...");
    
    input.addEventListener("keyup", (event) => {
        if (event.key === "Enter") {
            appendSentMessage
        }});

    inputGroup.appendChild(input);
}

function appendSentMessage(receiverUser, msg) {
    document.getElementById(receiverUser+"_input").value = null;
    
    var msgPage = document.getElementById(receiverUser+"_msgPage");
    var p = document.createElement("p");
    p.className = "single-msg"
    p.textContent = msg;

    if (msgPage.lastChild && msgPage.lastChild.className === "outgoing-chats")
    {
        msgPage.lastChild.lastChild.lastChild.appendChild(p);
        scrollDown(msgPage);
        return;
    }

    var divOutChats = createElement("div", "outgoing-chats");
    var divOutMsgs = createElement("div", "outgoing-msg");
    var divOutChatsMsg = createElement("div", "outgoing-chats-msg");
    
    divOutChatsMsg.appendChild(p);
    divOutMsgs.appendChild(divOutChatsMsg)
    divOutChats.appendChild(divOutMsgs);
    msgPage.appendChild(divOutChats);
    scrollDown(msgPage);
}

function scrollDown(msgPage) {
    msgPage.scrollTop = msgPage.scrollHeight;
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
        scrollDown(msgPage);
        return;
    }

    var divReceivedChats = createElement("div", "received-chats");
    var divReceivedMsgs =  createElement("div", "received-msg");
    var divReceivedMsgInbox = createElement("div", "received-msg-inbox");
    
    divReceivedMsgInbox.appendChild(p);
    divReceivedMsgs.appendChild(divReceivedMsgInbox);
    divReceivedChats.appendChild(divReceivedMsgs);
    msgPage.appendChild(divReceivedChats);
    scrollDown(msgPage);
}