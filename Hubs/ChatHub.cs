using Microsoft.AspNetCore.SignalR;

namespace signalRdemo
{
    public class ChatHub: Hub
    {
        public async Task RegisterUser(string user)
        {
            await Clients.All.SendAsync("OnNewUserRegistered", user);
        }
    }
}