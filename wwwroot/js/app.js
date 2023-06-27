var msgInbox;
var nav;
var currentVisibleChat = null;
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