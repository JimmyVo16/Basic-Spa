using SinglePageApp.ServerApp.Models;
using System.Collections.Generic;

namespace SinglePageApp.Managers
{
    public interface IProductManager
    {
        ProductItemsDto GetProductItems();

        MaxPriceDto GetMaxPriceForItem(string itemName);

        ProductItemDto SaveProductItem(ProductItemDto item);
    }
}
