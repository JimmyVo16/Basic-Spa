using ServerApp.Models;
using SinglePageApp.ServerApp.Repository;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.Linq;
using System.Threading;

namespace DomainLayer
{
    public class ProductRepository : IProductRepository
    {
        private static int _CollectionCurrentIndex = 0;

        private readonly ConcurrentDictionary<int, ProductItem> _DataSource;

        public IEnumerable<ProductItem> GetProductItems()
        {
            return _DataSource.ToImmutableArray().Select(i => i.Value);
        }

        public ProductRepository(IDataSource dataSource)
        {
            _DataSource = dataSource.GetCollection();
            
            SetCollectionCurrentIndex();
        }

        private void SetCollectionCurrentIndex()
        {
            if (_DataSource.Any())
            {
                Interlocked.Add(ref _CollectionCurrentIndex, _DataSource.ToImmutableArray().Max(i => i.Key));
            }
        }

        public int? CreateProductItem(ProductItem item)
        {
            var generatedId = Interlocked.Add(ref _CollectionCurrentIndex, 1);

            var success = _DataSource.TryAdd(generatedId, new ProductItem
            {
                Id = generatedId,
                Price = item.Price,
                Name = item.Name,
            });

            if (success)
            {
                return generatedId;
            }

            return null;
        }

        public ProductItem GetProductItem(int itemId)
        {
            ProductItem foundItem;

            _DataSource.TryGetValue(itemId, out foundItem);

            return foundItem;
        }
		
        public ProductItem UpdateProductItem(ProductItem itemTobeUpdated)
        {
            ProductItem existingItem;
            ProductItem upatedItem;

            if (_DataSource.TryGetValue(itemTobeUpdated.Id, out existingItem)
                && _DataSource.TryUpdate(itemTobeUpdated.Id, itemTobeUpdated, existingItem)
                && _DataSource.TryGetValue(itemTobeUpdated.Id, out upatedItem))
            {
                return upatedItem;
            }
            return null;
        }

        public bool DeleteProductItem(int itemId)
        {
            return _DataSource.TryRemove(itemId, out _);
        }
    }
}
