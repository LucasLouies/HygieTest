using HygieTestAPI.Data;
using HygieTestAPI.Models.DTO.Stock;
using HygieTestAPI.Models.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace HygieTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StocksController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public StocksController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        [HttpGet]
        public ActionResult GetAllStocks()
        {
            var AllStocks = dbContext.stocks.ToList();
            return Ok(AllStocks);
        }

        [HttpPost]
        public async Task<ActionResult> PostStock(AddStockDTO addStockDTO)
        {
            var stockExists = await dbContext.stocks
                .AnyAsync(s => s.GrossistesId == addStockDTO.GrossisteId && s.BieresId == addStockDTO.BiereId);

           

            if (stockExists)
            {
                var stock = await dbContext.stocks
                    .FirstOrDefaultAsync(s => s.GrossistesId == addStockDTO.GrossisteId && s.BieresId == addStockDTO.BiereId);

                stock!.Quantite = addStockDTO.Quantite;
                await dbContext.SaveChangesAsync();
                return Ok(stock);
            }
            else 
            {
                var stockEntity = new Stocks
                {
                    BieresId = addStockDTO.BiereId,
                    GrossistesId = addStockDTO.GrossisteId,
                    Quantite = addStockDTO.Quantite
                };
                dbContext.Add(stockEntity);
                await dbContext.SaveChangesAsync();

                return Ok(stockEntity);
            }
        }

        [HttpGet]
        [Route("Grossiste/{grossisteId}")]
        public async Task<ActionResult> GetStockFromGrossiste(Guid grossisteId)
        {
            var listStock = await dbContext.stocks
                .Where(s => s.GrossistesId == grossisteId)
                .OrderBy(s => s.BieresId)
                .ToListAsync();

            return Ok(listStock);
        }

    }
}
