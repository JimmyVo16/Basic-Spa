using ServerApp.Models;
using System.Collections.Generic;

namespace SinglePageApp.ServerApp.Models
{
    public class ProductItemsDto
    {
        public IEnumerable<ProductItemDto> Items { get; set; }
    }
}
