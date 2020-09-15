using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Runtime.InteropServices;
using System.Threading.Tasks;
using ToDoListAPI.Model.enums;

namespace ToDoListAPI.Model
{
    public class ToDoTask
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [Column(TypeName = "nvarchar(30)")]
        public string TaskText { get; set; }
        [JsonIgnore]
        public string TimeOfCreation { get; set; }
        [Required]
        [Column(TypeName = "bit")] 
        public bool IsComplete { get; set; }
        [Column(TypeName = "tinyint")]
        public Priorities Priority { get; set; }
    }
}
