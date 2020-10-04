using DomainLayer;
using ServerApp.Models;
using System.Collections.Generic;

namespace SinglePageApp.Services
{
    public interface IProductService
    {
        IEnumerable<ProductItem> GetProductItems();

        decimal? GetMaxPriceForItem(string itemName);

        void SaveProductItem(ProductItem item);

        ProductItem GetProductItem(ProductItem item);
    }
}
