using DomainLayer;
using ServerApp.Models;
using ServerApp.Models;
using SinglePageApp.ServerApp.Mappers;
using SinglePageApp.ServerApp.Models;
using SinglePageApp.Services;
using System.Collections.Generic;

namespace SinglePageApp.Managers
{
    public class ProductManager : IProductManager
    {
        private readonly IProductService _ProductService;

        public ProductManager(IProductService productService)
        {
            _ProductService = productService;
        }

        public MaxPriceDto GetMaxPriceForItem(string itemName)
        {
            var price = _ProductService.GetMaxPriceForItem(itemName);

            if (price.HasValue)
            {
                return new MaxPriceDto
                {
                    MaxPrice = price.Value
                };
            }

            return null;
        }

        public ProductItemsDto GetProductItems()
        {
            return new ProductItemsDto
            {
                Items = _ProductService.GetProductItems().MapToProductItemDtos()
            };
        }

        public ProductItemDto SaveProductItem(ProductItemDto inputDto)
        {
            // Jimmy validation
            if (inputDto == null)
            {
                return null;
            }

            var item = inputDto.MapToProductItem();

            _ProductService.SaveProductItem(item);

            return _ProductService
                .GetProductItem(item)
                .MapToProductItemDto();
        }
    }
}
