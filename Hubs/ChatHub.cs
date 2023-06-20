using Microsoft.AspNetCore.SignalR;

namespace signalRdemo.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Broadcast(string user, string message)
        {
            await Clients.All.SendAsync("OnMessageReceived", user, message);
        }

        public async Task RegisterUser(string user)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, user);
            await Clients.Others.SendAsync("OnNewUserRegistered", user);
        }

        public async Task SendMessage(string senderUser, string receiverUser, string message)
        {
            await Clients.Group(receiverUser).SendAsync("OnMessageReceived", senderUser, message);
        }
    }
}