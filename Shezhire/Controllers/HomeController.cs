﻿using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;
using Shezhire.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Dynamic;
using System.Linq;
//using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Shezhire.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;
        private ApplicationContext db;

        public HomeController(ILogger<HomeController> logger, ApplicationContext context)
        {
            _logger = logger;
            db = context;
        }

        public class MainPageModel
        {
            public List<User> Model1 { get; set; }
            public List<Node> Model2 { get; set; }
        }

        public async Task<IActionResult> Index()
        {
            MainPageModel main = new MainPageModel();
            main.Model1 = await db.Users.ToListAsync();
            main.Model2 = await db.Nodes.ToListAsync();
            ViewBag.Count = db.Nodes.Count();
            return View(main);
        }
        
        public IActionResult Create()
        {
            return View();
        }

        public string GetNodes()
        {
            var nodes = db.Nodes.ToList().OrderBy(x=>x.Parent_id);
            string result= JsonConvert.SerializeObject(nodes);

            return result;
        }

        [HttpPost]
        public async Task<IActionResult> Create(User user)
        {
            db.Users.Add(user);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public class Nodes
        {
            public Node Model1 { get; set; }
            public List<Node> Model2 { get; set; }
        }

        public async Task<IActionResult> CreateMan()
        {
            //Nodes nodes = new Nodes();
            //nodes.Model1= new Node();
            //nodes.Model2 = await db.Nodes.ToListAsync();

            ViewBag.Nodes = await db.Nodes.ToListAsync();
            //var nodes = await db.Nodes.ToListAsync();
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> CreateMan(Node node)
        {
            db.Nodes.Add(node);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        public IActionResult Privacy()
        {
            return View();
        }

        public async Task<IActionResult> Details(int? id)
        {
            if (id != null)
            {
                User user = await db.Users.FirstOrDefaultAsync(p => p.Id == id);
                if (user != null)
                    return View(user);
            }
            return NotFound();
        }

        public async Task<IActionResult> Edit(int? id)
        {
            if (id != null)
            {
                User user = await db.Users.FirstOrDefaultAsync(p => p.Id == id);
                if (user != null)
                    return View(user);
            }
            return NotFound();
        }
        [HttpPost]
        public async Task<IActionResult> Edit(User user)
        {
            db.Users.Update(user);
            await db.SaveChangesAsync();
            return RedirectToAction("Index");
        }

        [HttpGet]
        [ActionName("Delete")]
        public async Task<IActionResult> ConfirmDelete(int? id)
        {
            if (id != null)
            {
                User user = await db.Users.FirstOrDefaultAsync(p => p.Id == id);
                if (user != null)
                    return View(user);
            }
            return NotFound();
        }

        [HttpPost]
        public async Task<IActionResult> Delete(int? id)
        {
            if (id != null)
            {
                User user = await db.Users.FirstOrDefaultAsync(p => p.Id == id);
                if (user != null)
                {
                    db.Users.Remove(user);
                    await db.SaveChangesAsync();
                    return RedirectToAction("Index");
                }
            }
            return NotFound();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
