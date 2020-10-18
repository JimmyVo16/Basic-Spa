using ServerApp.Models;
using System.Collections.Generic;

namespace SinglePageApp.ServerApp.Repository
{
    public interface IProductRepository
    {
        IEnumerable<ProductItem> GetProductItems();

        int? CreateProductItem(ProductItem item);

        ProductItem GetProductItem(int itemId);

        ProductItem UpdateProductItem(ProductItem item);

        bool DeleteProductItem(int itemId);
    }
}
