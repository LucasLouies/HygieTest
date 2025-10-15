using HygieTestAPI.Data;
using HygieTestAPI.Models.DTO;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HygieTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GrossistesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public GrossistesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetAllGrossistes()
        {
            var AllGrossistes = dbContext.grossistes.ToList();
            return Ok(AllGrossistes);
        }

        [HttpPost]
        public async Task<ActionResult> PostGrossiste(AddGrossisteDTO addGrossisteDTO)
        {
            var grossisteEntity = new Grossistes
            {
                Name = addGrossisteDTO.Name,
            };

            dbContext.Add(grossisteEntity);
            await dbContext.SaveChangesAsync();

            return Ok(grossisteEntity);
        }
    }
}