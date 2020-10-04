using ServerApp.Models;
using System;
using System.Collections.Generic;
using System.Text;

// Jimmy update the namespace
namespace ServerApp.Repository
{
    public interface IProductRepository
    {
        // Jimmy maybe turn this into async
        IEnumerable<ProductItem> GetProductItems();

        decimal? GetMaxPriceForItem(string itemName);

        void SaveProductItem(ProductItem item);

        ProductItem GetProductItem(ProductItem item);

    }
}
