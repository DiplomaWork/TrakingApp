using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using TrackingApp.Models;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;
using TrackingApp.Libs;

namespace TrackingApp.Controllers
{
    [Authorize]
    public class RouteController : Controller
    {
        private TrackingEntitiesContext db = new TrackingEntitiesContext();
        // GET: Rout
        public ActionResult Index()
        {
            var routes = db.Routes.OrderBy(r => r.Date).ToList();
            return View(routes);
        }

        public ActionResult Create()
        {
            Route route = new Route();
            route.UserId = User.Identity.GetUserId();
            route.Private = false;
            route.Completed = false;
            return View(route);
        }
        [HttpPost]
        public ActionResult Create(Route route)
        {
            if (ModelState.IsValid)
            {
                db.Routes.Add(route);
                db.SaveChanges();
            }
            ViewBag.Error = "Can`t save it. Sorry :`(";
            return RedirectToAction("Index");
        }
        public ActionResult Edit(long id)
        {
            Route route = db.Routes.Find(id);
            return View(route);
        }
        [HttpPost]
        public ActionResult Edit(Route route)
        {
            if (ModelState.IsValid)
            {
                db.Entry(route).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();
            }
            ViewBag.Error = "Can`t save it. Sorry :`(";
            return View(route);
        }

        [HttpPost]
        public JsonResult Delete(long id) 
        {
            var route = db.Routes.Find(id);
            db.Routes.Remove(route);
            db.SaveChanges();
            return Json(new { id });
        }
    }
}