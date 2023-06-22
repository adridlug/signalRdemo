using Microsoft.AspNetCore.SignalR;

namespace signalRdemo
{
    public class ChatHub: Hub
    {
        public async Task RegisterUser(string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user);
            await Clients.Others.SendAsync("OnNewUserRegistered", user);
        }

        public async Task Ping(string senderUser, string receiverUser)
        {
            await Clients.Group(receiverUser).SendAsync("OnPingReceived", senderUser);
        }
    }
}