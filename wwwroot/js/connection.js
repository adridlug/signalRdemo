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