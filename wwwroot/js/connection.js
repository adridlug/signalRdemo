
function setupAndConnectSignalR()
{
    var _connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();

    _connection.start().then(function () {
        console.log("connected");
    }).catch((error) => {
        return console.error(error);
    });
}