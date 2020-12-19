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
        public Object Get([FromQuery] int page = 1, [FromQuery] int size = 10)
        {
            var count = 0;
            
            List<Reservation> list = _reservationService.GetAllReservations(page, size, out count);

            return new {  list = list, count = count };
        }

        // GET: Reservations/Details/5
        [HttpGet("{id}")]
        public async Task<Reservation> Get(int id)
        {
            return await _reservationService.GetAllReservationById(id);
        }

        [HttpPatch("{id}")]
        public async Task<OkResult> Patch([FromBody] Reservation reservation)
        {
            reservation.Date = reservation.Date != DateTime.MinValue ? reservation.Date : DateTime.UtcNow;
            await _reservationService.Save(reservation);

            return Ok();
        }

        // GET: Reservations/Create
        //public IActionResult Create()
        //{
        //    return View();
        //}

        // POST: Reservations/Create
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Create([Bind("ReservationId,Description,ContactId")] Reservation reservation)
        //{
        //    if (ModelState.IsValid)
        //    {
        //        _context.Add(reservation);
        //        await _context.SaveChangesAsync();
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(reservation);
        //}

        // GET: Reservations/Edit/5
        //public async Task<IActionResult> Edit(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var reservation = await _context.reservations.FindAsync(id);
        //    if (reservation == null)
        //    {
        //        return NotFound();
        //    }
        //    return View(reservation);
        //}

        // POST: Reservations/Edit/5
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Edit(int id, [Bind("ReservationId,Description,ContactId")] Reservation reservation)
        //{
        //    if (id != reservation.ReservationId)
        //    {
        //        return NotFound();
        //    }

        //    if (ModelState.IsValid)
        //    {
        //        try
        //        {
        //            _context.Update(reservation);
        //            await _context.SaveChangesAsync();
        //        }
        //        catch (DbUpdateConcurrencyException)
        //        {
        //            if (!ReservationExists(reservation.ReservationId))
        //            {
        //                return NotFound();
        //            }
        //            else
        //            {
        //                throw;
        //            }
        //        }
        //        return RedirectToAction(nameof(Index));
        //    }
        //    return View(reservation);
        //}

        // GET: Reservations/Delete/5
        //public async Task<IActionResult> Delete(int? id)
        //{
        //    if (id == null)
        //    {
        //        return NotFound();
        //    }

        //    var reservation = await _context.reservations
        //        .FirstOrDefaultAsync(m => m.ReservationId == id);
        //    if (reservation == null)
        //    {
        //        return NotFound();
        //    }

        //    return View(reservation);
        //}

        // POST: Reservations/Delete/5
        //[HttpPost, ActionName("Delete")]
        //[ValidateAntiForgeryToken]
        //public async Task<IActionResult> DeleteConfirmed(int id)
        //{
        //    var reservation = await _context.reservations.FindAsync(id);
        //    _context.reservations.Remove(reservation);
        //    await _context.SaveChangesAsync();
        //    return RedirectToAction(nameof(Index));
        //}

        //private bool ReservationExists(int id)
        //{
        //    return _context.reservations.Any(e => e.ReservationId == id);
        //}
    }
}
