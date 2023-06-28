using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;

namespace signalRdemo
{
    public class AdminRequirement : AuthorizationHandler<AdminRequirement, HubInvocationContext>, IAuthorizationRequirement
    {
        protected override Task HandleRequirementAsync(AuthorizationHandlerContext context, AdminRequirement requirement, HubInvocationContext resource)
        {
            var userName = context.User.FindFirst(x => x.Type == "client_id")?.Value;
            var methodName = resource.HubMethod.Name;

            //if (userName == "m2m.short" && methodName == "Broadcast")
            if (userName == "admin" && methodName == "Broadcast")
            {
                context.Succeed(requirement);
            }

            return Task.CompletedTask;
        }
    }
}