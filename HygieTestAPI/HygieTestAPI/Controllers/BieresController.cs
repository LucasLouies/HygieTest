using HygieTestAPI.Data;
using HygieTestAPI.Models;
using HygieTestAPI.Models.DTO;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;

namespace HygieTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BieresController : Controller
    {
        private readonly ApplicationDbContext dbContext;

        public BieresController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetAllBieres() 
        {
            var allBieres = dbContext.bieres.ToList();

            return Ok(allBieres);
        }

        [HttpPost]
        public ActionResult PostBiere(AddBiereDTO addBiereDTO)
        {
            var biereEntity = new Bieres
            {
                Name = addBiereDTO.Name,
                Degre = addBiereDTO.Degre,
                Prix = addBiereDTO.Prix,
            };

            dbContext.bieres.Add(biereEntity);

            dbContext.SaveChanges();

            return Ok(biereEntity);
        }

    }
}
