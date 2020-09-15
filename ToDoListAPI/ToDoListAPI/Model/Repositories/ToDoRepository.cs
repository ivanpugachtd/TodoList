using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ToDoListAPI.Model.Interfaces;

namespace ToDoListAPI.Model.Repositories
{
    public class ToDoService : IToDoTaskRepository
    {
        private ToDoTaskContext Context;
        public ToDoService(ToDoTaskContext context)
        {
            Context = context;
        }

        public IEnumerable<ToDoTask> Get()
        {
            return Context.ToDoTasks;
        }
        public void Create(ToDoTask toDoTask)
        {
            Context.ToDoTasks.Add(toDoTask);
            Context.SaveChanges();
        }

        public ToDoTask Delete(int id)
        {
            ToDoTask toDoTask = Get(id);

            if (toDoTask != null)
            {
                Context.ToDoTasks.Remove(toDoTask);
                Context.SaveChanges();
            }

            return toDoTask;
        }

        public ToDoTask Get(int id)
        {
            return Context.ToDoTasks.Find(id);
        }

        public void Update(ToDoTask updatedToDoTask)
        {
            ToDoTask currentItem = Get(updatedToDoTask.Id);
            currentItem.TaskText = updatedToDoTask.TaskText;
            currentItem.IsComplete = updatedToDoTask.IsComplete;
            currentItem.TimeOfCreation = updatedToDoTask.TimeOfCreation;
            currentItem.Priority = updatedToDoTask.Priority;

            Context.ToDoTasks.Update(currentItem);
            Context.SaveChanges();
        }
    }
}
