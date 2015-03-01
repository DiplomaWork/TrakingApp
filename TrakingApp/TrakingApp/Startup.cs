using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(TrakingApp.Startup))]
namespace TrakingApp
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
