
function setupAndConnectSignalR()
{
    var _connection = new signalR.HubConnectionBuilder()
        .withUrl("/chatHub")
        .build();

    _connection.on("OnNewUserRegistered", function(user) {
        appendUser(user);
    });

    _connection.start().then(function () {
        console.log("connected");

        _connection.invoke("RegisterUser", senderUser).catch(function (error) {
            return console.error(error);
        })
    }).catch((error) => {
        return console.error(error);
    });
}