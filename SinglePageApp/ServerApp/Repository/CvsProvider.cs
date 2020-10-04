using CsvHelper;
using ServerApp.Models;
using ServerApp.Repository;
using SinglePageApp.ServerApp.Mappers;
using SinglePageApp.ServerApp.Models;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Collections.Immutable;
using System.IO;
using System.Linq;

namespace DomainLayer
{
    public class CvsProvider : IProductRepository
    {
        public CvsProvider()
        {
            _DataSource = new ConcurrentBag<ProductItem>();

            LoadItemsFromSource();
        }

        private const string Path = @"resources\items.txt";

        private readonly ConcurrentBag<ProductItem> _DataSource;

        public IEnumerable<ProductItem> GetProductItems()
        {
            return _DataSource.ToArray();
        }

        private void LoadItemsFromSource()
        {
            var items = GetItemsFromSource();

            if (items.Any())
            {
                foreach (var item in items)
                {
                    _DataSource.Add(item);
                }
            }
        }

        private IEnumerable<ProductItem> GetItemsFromSource()
        {
            // Jimmy put the file name in a setting.
            var csvReader = new CsvReader(new StreamReader(Path));

            csvReader.Configuration.PrepareHeaderForMatch = (string header, int index) =>
                header.Replace(" ", "")
                .ToLower();

            var items = csvReader.GetRecords<ProductItemDataModel>().ToArray();

            csvReader.Dispose();

            return items.MapToProductItems();
        }

        public decimal? GetMaxPriceForItem(string itemName)
        {
            // Jimmy anki find an item from a concurrent dictionary that is not the key.
            var items = _DataSource.ToImmutableArray();

            // Jimmy anki OrderByDescending
            var matchedItems = items
                .Where(i => i.Name == itemName);
            //.OrderByDescending(i => i.Value.Price);

            decimal? highestPrice = null;

            if (matchedItems.Any())
            {
                // Jimmy Anki how to get the max from a collection.
                highestPrice = matchedItems
                    .Max(i => i.Price);
            }

            return highestPrice;
        }

        public void SaveProductItem(ProductItem item)
        {
            _DataSource.Add(item);
        }

        public ProductItem GetProductItem(ProductItem item)
        {
            var storedItems = _DataSource.ToImmutableList();

            return storedItems.FirstOrDefault(i => i.Equals(item));
        }
    }
}
