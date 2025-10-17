using HygieTestAPI.Data;
using HygieTestAPI.Models;
using HygieTestAPI.Models.DTO.Biere;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
        public async Task<ActionResult> PostBiere([FromForm] AddBiereDTO addBiereDTO)
        {
            if (addBiereDTO.LogoFile == null || addBiereDTO.LogoFile.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            var uploadsFolder = Path.Combine("wwwroot/images");
            if (!Directory.Exists(uploadsFolder))
                Directory.CreateDirectory(uploadsFolder);

            var fileName = $"{Guid.NewGuid()}{Path.GetExtension(addBiereDTO.LogoFile.FileName)}";
            var filePath = Path.Combine(uploadsFolder + "/Bieres/", fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await addBiereDTO.LogoFile.CopyToAsync(stream);
            }

            var biereEntity = new Bieres
            {
                Name = addBiereDTO.Name,
                Degre = addBiereDTO.Degre,
                Prix = addBiereDTO.Prix,
                Logo = $"/images/Bieres/{fileName}",
                BrasseriesId = addBiereDTO.BrasserieId

            };

            dbContext.Add(biereEntity);
            await dbContext.SaveChangesAsync();

            return Ok(biereEntity);
        }

        [HttpGet]
        [Route("{biereId}")]
        public async Task<ActionResult> getBiereFromId(Guid biereId) 
        { 
            var Biere = await dbContext.bieres.Where(b => b.Id == biereId).ToListAsync();

            return Ok(Biere[0]);
        }

        [HttpGet]
        [Route("Grossiste/{grossisteId}")]
        public async Task<ActionResult> GetBieresFromGrossiste(Guid grossisteId) 
        {
            var stockGrossiste = await dbContext.stocks
                .Where(s => s.GrossistesId == grossisteId)
                .ToListAsync();

            var listBiere = new List<Bieres>();

            foreach (var stock in stockGrossiste)
            {
                var Biere = await dbContext.bieres.Where(b => b.Id == stock.BieresId).ToListAsync();
                listBiere.Add(Biere[0]);
            }

            return Ok(listBiere);
        }

        [HttpGet]
        [Route("Brasserie/{brasserieId}")]
        public async Task<ActionResult> GetBieresFromBrasserie(Guid brasserieId)
        {
            var bieresFromBrasserie = await dbContext.bieres.Where(b => b.BrasseriesId == brasserieId).ToListAsync();
            return Ok(bieresFromBrasserie);
        }

    }
}
