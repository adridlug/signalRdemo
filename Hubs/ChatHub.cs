using Microsoft.AspNetCore.SignalR;

namespace signalRdemo
{
    public class ChatHub: Hub
    {
        public async Task SendMessage(string msg)
        {
            
        }
    }
}