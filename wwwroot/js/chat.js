var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub").build();

connection.on("OnMessageReceived", function (user, message) {
    console.log(user+ " wrote: "+message)
});

connection.onreconnecting(function (error) {
    if (error)
    {
        console.log(error);
    }
    console.log("reconnecting");
});

connection.onreconnected( function (connectionId) {
    console.log("Successfully reconnected");
    if (connectionId)
        console.log("ConnectionId: "+connectionId);
});

connection.start().then(function () { console.log("Connected")});