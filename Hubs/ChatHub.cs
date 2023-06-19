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
            await Clients.Others.SendAsync("OnNewUserRegistered", user);
        }
    }
}