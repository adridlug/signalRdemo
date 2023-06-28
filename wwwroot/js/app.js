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
}
