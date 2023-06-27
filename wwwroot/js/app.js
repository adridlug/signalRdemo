var msgInbox;
var nav;
var currentVisibleChat = null;
var connection;
var senderUser;

document.addEventListener("DOMContentLoaded", function () {
  msgInbox = document.getElementById("msgInbox");
  nav = document.getElementById("nav");

  console.log("registering user...");
  senderUser = registerUserIfNeeded();
  connection = setupAndConnectSignalR();
});

function registerUserIfNeeded() {
  var usr = sessionStorage.getItem("user");
  console.log("User: " + usr);
  console.log("calling prompt");
  while (!usr) {
    usr = window.prompt("Who are you?");
  }
  sessionStorage.setItem("user", usr);

  document.getElementById("pUser").textContent = "User name: " + usr;
  return usr;
}

function sendMessage(receiverUser) {
  var input = document.getElementById(receiverUser + "_input");
  var msg = input.value;

  var msgId = crypto.randomUUID();
  appendSentMessage(receiverUser, msg, msgId);

  connection
    .invoke("SendMessage", senderUser, receiverUser, msg)
    .catch((error) => console.error(error.message));
}

function ping(receiverUser) {
  connection
    .invoke("Ping", senderUser, receiverUser)
    .catch((error) => console.error(error.message));
}
