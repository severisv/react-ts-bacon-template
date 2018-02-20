using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Server.Utils;

namespace Server.Controllers
{
    public class HomeController : Controller
    {
        // Matcher alle url'er som ikke begynner på /api
        [Route("{*url:regex(^(?!api).*)}")]
        [Route("")]
        public IActionResult Index()
        {
            var index = System.IO.File.ReadAllText("wwwroot/dist/index.html");

            var initialState = new
            {
                User = new
                {
                    Name = "Frank"
                }
            }.ToJson();

            var result = index.Replace("<initialState></initialState>", $"<script>var initialState = {initialState};</script>");

            return Content(result, "text/html");

        }


        [Route("api/value")]
        public object Value() => new { value = "Frank" };

        [HttpPost]
        [Route("api/value")]
        public object PostValue() => new { success = new Random().Next(2) };
    }
}
