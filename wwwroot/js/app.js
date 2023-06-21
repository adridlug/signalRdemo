var msgInbox = document.getElementById("msgInbox");

console.log("registering user...")
var senderUser = registerUserIfNeeded();
var connection = setupAndConnectSignalR();


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

