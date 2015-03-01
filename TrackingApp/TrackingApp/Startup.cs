using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrackingApp.Startup))]
namespace TrackingApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
