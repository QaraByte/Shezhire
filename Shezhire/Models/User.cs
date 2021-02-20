using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shezhire.Models
{
    public class User
    {
        public int Id { get; set; }
        public string Name { get; set; } // имя пользователя
        public int Age { get; set; } // возраст пользователя
    }

    public class Node
    {
        public int Id { get; set; }
        public string Name{ get;set;}
        public DateTime Birthdate { get; set; }
        public int Child_id { get; set; }
    }
}
