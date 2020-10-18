using SinglePageApp.ServerApp.Mappers;
using SinglePageApp.ServerApp.Models;
using SinglePageApp.ServerApp.Repository;
using System.Linq;

namespace SinglePageApp.Managers
{
    public class ProductManager : IProductManager
    {
        private readonly IProductRepository _ProductRepository;

        public ProductManager(IProductRepository productRepository)
        {
            _ProductRepository = productRepository;
        }

        public ProductItemsDto GetProductItems()
        {
            return new ProductItemsDto
            {
                Items = _ProductRepository.GetProductItems().MapToProductItemDtos()
            };
        }

        public bool DeleteProductItem(int itemId)
        {
            return _ProductRepository.DeleteProductItem(itemId);
        }

        public ProductItemsDto GetMaxPriceForItems()
        {
            var items = _ProductRepository
                .GetProductItems()
                .GroupBy(i => i.Name)
                .Select(
                    i => i.OrderByDescending(x => x.Price)
                     .First());

            return new ProductItemsDto
            {
                Items = items.MapToProductItemDtos()
            };
        }

        public ProductItemDto CreateProductItem(InsertedProductItemDto inputDto)
        {
            var item = inputDto.MapToProductItem();

            var newItemId = _ProductRepository.CreateProductItem(item);

            if (newItemId.HasValue)
            {
                return _ProductRepository
                    .GetProductItem(newItemId.Value)
                    .MapToProductItemDto();
            }

            return null;
        }

        public ProductItemDto UpdateProductItem(ProductItemDto itemToBeUpdated)
        {
            var updatedItem = _ProductRepository
                .UpdateProductItem(itemToBeUpdated.MapToProductItem());

            if (updatedItem != null)
            {
                return updatedItem.MapToProductItemDto();
            }

            return null;
        }

        public ProductItemDto GetMaxPriceForItem(string itemName)
        {
            var matchedItem = _ProductRepository
                .GetProductItems()
                .GroupBy(i => i.Name)
                .SingleOrDefault(i => i.Key.Equals(itemName, System.StringComparison.InvariantCultureIgnoreCase));

            if (matchedItem != null)
            {
                return matchedItem
                    .OrderByDescending(i => i.Price)
                    .First()
                    .MapToProductItemDto();
            }

            return null;
        }
    }
}
