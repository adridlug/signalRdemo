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
  getToken()
    .then((response) => response.json())
    .then((json) => {
      connection = setupAndConnectSignalR(json.access_token);
    });
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
    .invoke("SendMessage", senderUser, receiverUser, msg, msgId)
    .catch((error) => console.error(error.message));
}

function ping(receiverUser) {
  connection
    .invoke("Ping", senderUser, receiverUser)
    .catch((error) => console.error(error.message));
}

function sendConfirmMessgeRead(receiverUser, msgId) {
  connection
    .invoke("ConfirmMessageRead", senderUser, receiverUser, msgId)
    .catch((error) => console.error(error.message));
}

function getToken() {
  var data = new FormData();
  data.append("client_id", "client1");
  data.append("client_secret", "secret");
  data.append("grant_type", "client_credentials");

  return fetch("https://demo.duendesoftware.com/connect/token", {
    method: "POST",
    headers: {
      "CONTENT-TYPE": "application/x-www-form-urlencoded",
    },
    body: "client_id=m2m.short&client_secret=secret&grant_type=client_credentials&scope=api",
  });

  //.then((response) => response.json())
  //.then((json) => console.log(json.access_token));
}
