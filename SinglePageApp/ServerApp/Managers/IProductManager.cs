using SinglePageApp.ServerApp.Models;

namespace SinglePageApp.Managers
{
    public interface IProductManager
    {
        ProductItemsDto GetProductItems();

        ProductItemsDto GetMaxPriceForItems();

        ProductItemDto GetMaxPriceForItem(string itemName);

        ProductItemDto CreateProductItem(InsertedProductItemDto item);

        ProductItemDto UpdateProductItem(ProductItemDto item);

        bool DeleteProductItem(int itemId);
    }
}
