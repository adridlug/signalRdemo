var msgInbox = document.getElementById("msgInbox");
var nav = document.getElementById("nav");
var currentVisibleChat = null;

console.log("registering user...")
var senderUser = registerUserIfNeeded();
//TODO: register chat user to server

setupAndConnectSignalR();

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