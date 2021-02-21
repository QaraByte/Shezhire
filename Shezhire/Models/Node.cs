using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Shezhire.Models
{
    public class Node
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Birthdate { get; set; }
        public int Parent_id { get; set; }
    }
}
