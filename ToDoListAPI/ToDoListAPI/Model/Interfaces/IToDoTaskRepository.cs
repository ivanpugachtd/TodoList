using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ToDoListAPI.Model.Interfaces
{
    public interface IToDoTaskRepository
    {
        IEnumerable<ToDoTask> Get();
        ToDoTask Get(int id);
        void Create(ToDoTask toDoTask);
        void Update(ToDoTask toDoTask);
        ToDoTask Delete(int id);
    }
}
