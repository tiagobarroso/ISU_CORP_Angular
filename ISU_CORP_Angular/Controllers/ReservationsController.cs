using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using ISU_CORP_Angular.Entities;
using ISU_CORP_Angular.Models;

namespace ISU_CORP_Angular.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly ReservationService _reservationService;

        public ReservationsController(ReservationContext context)
        {
            _reservationService = new ReservationService(context);
        }

        // GET: Reservations
        public Object Get([FromQuery] int page = 1, [FromQuery] int size = 10, [FromQuery] string sortBy = null)
        {
            var count = 0;
            
            List<Reservation> list = _reservationService.GetAllReservations(page, size, sortBy, out count);

            return new {  list = list, count = count };
        }

        // GET: Reservations/Details/5
        [HttpGet("{id}")]
        public async Task<Reservation> Get(int id)
        {
            return await _reservationService.GetAllReservationById(id);
        }

        [HttpPatch]
        public async Task<OkResult> Patch([FromBody] Reservation reservation)
        {
            reservation.Date = reservation.Date != DateTime.MinValue ? reservation.Date : DateTime.UtcNow;
            await _reservationService.Save(reservation);

            return Ok();
        }
    }
}
