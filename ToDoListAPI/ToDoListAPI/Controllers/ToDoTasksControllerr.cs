using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ToDoListAPI.Model;
using ToDoListAPI.Model.Interfaces;

namespace ToDoListAPI.Controllers
{
    [Route("api/[controller]")]
    public class ToDoTasksController : Controller
    {
        private readonly ToDoTaskContext _context;

        public ToDoTasksController(ToDoTaskContext context)
        {
            _context = context;
        }

        [HttpGet]
        //[EnableCors("AllowOrigin")]
        public async Task<ActionResult<IEnumerable<ToDoTask>>> GetToDoTasks()
        {
            var toDoTasks = _context.ToDoTasks.OrderBy(x => x.IsComplete);

            return await toDoTasks.ToListAsync();
        }

        [HttpGet("{id}")]
        //[EnableCors("AllowOrigin")]
        public async Task<IActionResult> GetToDoTask(int id)
        {
            ToDoTask toDoTask = await _context.ToDoTasks.FindAsync(id);

            if (toDoTask == null)
            {
                return NotFound();
            }

            return new ObjectResult(toDoTask);
        }

        [HttpPost]
        //[EnableCors(origins: "http://localhost:4200", headers: " * ", methods: " * ")]
        //[EnableCors("AllowOrigin")]
        public async Task<ActionResult<ToDoTask>> PostTodoTask(ToDoTask toDoTask)
        {
            toDoTask.TimeOfCreation = DateTime.Now.ToString("MM/dd/yyyy HH:mm");
            _context.ToDoTasks.Add(toDoTask);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetToDoTask", new { id = toDoTask.Id }, toDoTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutToDoTask(int id, ToDoTask toDoTask)
        {
            if (id != toDoTask.Id)
            {
                return BadRequest();
            }
            toDoTask.TimeOfCreation = DateTime.Now.ToString("MM/dd/yyyy HH:mm");
            _context.Entry(toDoTask).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_context.ToDoTasks.Any(e => e.Id == id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ToDoTask>> DeleteToDoTask(int id)
        {
            var toDoTask = await _context.ToDoTasks.FindAsync(id);
            if (toDoTask == null)
            {
                return NotFound();
            }

            _context.ToDoTasks.Remove(toDoTask);
            await _context.SaveChangesAsync();

            return toDoTask;
        }
    }

}
