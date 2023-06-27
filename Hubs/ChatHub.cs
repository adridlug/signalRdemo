using Microsoft.AspNetCore.SignalR;

namespace signalRdemo.Hubs
{
    public class ChatHub : Hub
    {
        public async Task Broadcast(string senderUser, string message)
        {
            await Clients.All.SendAsync("OnMessageReceived", senderUser, message);
        }

        public async Task RegisterUser(string senderUser)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, senderUser);
            Console.WriteLine($"User: {senderUser} registered");
            await Clients.Others.SendAsync("OnNewUserRegistered", senderUser);
        }

        public async Task SendMessage(string senderUser, string receiverUser, string message, string msgId)
        {
            await Clients.Group(receiverUser).SendAsync("OnMessageReceived", senderUser, message, msgId);
        }

        public async Task Ping(string senderUser, string receiverUser)
        {
            await Clients.Group(receiverUser).SendAsync("OnPingReceived", senderUser);
        }

        public async Task ConfirmMessageRead(string senderUser, string receiverUser, string msgId)
        {
             await Clients.Group(receiverUser).SendAsync("OnConfirmMessageReadReceived", senderUser, msgId);
        }
    }
}