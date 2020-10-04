using DomainLayer;
using ServerApp.Models;
using ServerApp.Repository;
using System.Collections.Generic;

namespace SinglePageApp.Services
{
    public class ProductService : IProductService
    {
        private readonly IProductRepository _ProductRepository;

        public ProductService(IProductRepository IProductRepository)
        {
            _ProductRepository = IProductRepository;
        }

        public decimal? GetMaxPriceForItem(string itemName)
        {
            return _ProductRepository.GetMaxPriceForItem(itemName);
        }

        public ProductItem GetProductItem(ProductItem item)
        {
            return _ProductRepository.GetProductItem(item);
        }

        public IEnumerable<ProductItem> GetProductItems()
        {
            return _ProductRepository.GetProductItems();
        }

        public void SaveProductItem(ProductItem item)
        {
            _ProductRepository.SaveProductItem(item);
        }
    }
}
