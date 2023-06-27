function setupAndConnectSignalR() {
  var _connection = new signalR.HubConnectionBuilder()
    .withUrl("/chatHub")
    .build();

  _connection.on("OnMessageReceived", function (senderUser, message, msgId) {
    appendReceivedMessage(senderUser, message, msgId);
  });

  _connection.on("OnNewUserRegistered", function (user) {
    appendUser(user);
    ping(user);
  });

  _connection.on("OnPingReceived", function (user) {
    appendUser(user);
  });

  _connection.onreconnecting(function (error) {
    if (error) {
      console.log(error);
    }
    console.log("reconnecting");
  });

  _connection.on("OnConfirmMessageReadReceived", function(senderUser, msgId) {
    markMessageAsRead(msgId);
  });

  _connection.onreconnected(function (connectionId) {
    console.log("Successfully reconnected");
    if (connectionId) console.log("ConnectionId: " + connectionId);
  });

  _connection.start().then(function () {
    console.log("connected");
    _connection.invoke("RegisterUser", senderUser).catch(function (err) {
      console.error(err.toString());
    });
  });

  return _connection;
}
