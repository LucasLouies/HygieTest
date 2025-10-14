using HygieTestAPI.Data;
using HygieTestAPI.Models.DTO;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace HygieTestAPI.Controllers
{
    //localhost:xxxx/api/brasseries
    [Route("api/[controller]")]
    [ApiController]
    public class BrasseriesController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public BrasseriesController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetAllBrasseries() 
        {
            var AllBrasseries = dbContext.brasseries.ToList();

            return Ok(AllBrasseries);
        }

        [HttpPost]
        public ActionResult PostBrasserie(AddBrasserieDTO addBrasserieDTO)
        {
            var brasserieEntity = new Brasseries()
            {
                Name = addBrasserieDTO.Name,
                Logo = addBrasserieDTO.Logo,
            };

            dbContext.brasseries.Add(brasserieEntity);

            dbContext.SaveChanges();

            return Ok(brasserieEntity);
        }
    }
}