using HygieTestAPI.Data;
using HygieTestAPI.Models.DTO.Devis;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace HygieTestAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DevisController : ControllerBase
    {
        private readonly ApplicationDbContext dbContext;

        public DevisController(ApplicationDbContext dbContext)
        {
            this.dbContext = dbContext;
        }


        [HttpPost]
        public async Task<IActionResult> CheckDevis([FromBody] DevisDTO devisDTO)
        {
            var allGood = true;
            var messageErreur = "";

            //pas vide
            if (devisDTO.LignesDevis.Length == 0) { 
                allGood = false;
                messageErreur += "\nLa commande est vide !";
            }

            //grossiste existe
            var grossiste = await dbContext.grossistes
                .Where(g => g.Id == devisDTO.GrossisteId)
                .ToListAsync();

            if (grossiste.Count != 1) {
                allGood = false;
                messageErreur += "\nLe grossiste n'existe pas !";
            }

            //pas de doublon
            var doublons = devisDTO.LignesDevis
                .GroupBy(x => x.BiereId)
                .Where(g => g.Count() > 1)
                .ToList();

            bool estUnique = doublons.Count == 0;

            if (!estUnique)
            {
                allGood = false;
                messageErreur += "\nLes doublons dans un devis sont interdits !";
            }

            //stock du grossiste suffisant
            foreach (var ligneDevis in devisDTO.LignesDevis)
            {
                var stock = dbContext.stocks
                    .Where(s => s.GrossistesId == devisDTO.GrossisteId && s.BieresId == ligneDevis.BiereId)
                    .FirstOrDefault();

                if (stock != null && stock.Quantite < ligneDevis.Quantite)
                {
                    allGood = false;
                    messageErreur += "\nLe grossiste n'a pas assez de stock !";
                    break;
                }
            }

            //biere vendu par le grossiste
            foreach (var ligneDevis in devisDTO.LignesDevis)
            {
                var stock = dbContext.stocks
                    .Where(s => s.GrossistesId == devisDTO.GrossisteId && s.BieresId == ligneDevis.BiereId)
                    .FirstOrDefault();

                if (stock != null && stock.GrossistesId != devisDTO.GrossisteId)
                {
                    allGood = false;
                    messageErreur += "\nLe grossiste ne vends pas toutes les bieres !";
                    break;
                }
            }

            if (allGood)
                return Ok();

            var erreur = new
            {
                message = messageErreur
            };


            return BadRequest(erreur);
        }
    }
}
