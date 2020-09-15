using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoListAPI.Model.enums;

namespace ToDoListAPI.Model
{
    public class ToDoTaskContext : DbContext
    {
        public DbSet<ToDoTask> ToDoTasks { get; set; }
        public ToDoTaskContext(DbContextOptions<ToDoTaskContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }
    }
}
