using CsvHelper;
using ServerApp.Models;
using SinglePageApp.ServerApp.Mappers;
using SinglePageApp.ServerApp.Models;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.IO;
using System.Linq;

namespace SinglePageApp.ServerApp.Repository
{
    public class CvsDataSource : IDataSource
    {
        private readonly ConcurrentDictionary<int, ProductItem> _DataSource;

        public CvsDataSource()
        {
            _DataSource = new ConcurrentDictionary<int, ProductItem>();

            LoadItemsFromSource();
        }

        public ConcurrentDictionary<int, ProductItem> GetCollection()
        {
            return _DataSource;
        }

        private IEnumerable<ProductItem> GetItemsFromSource()
        {
            var csvReader = new CsvReader(new StreamReader(AppSettings.AppSettings.FilePath));

            csvReader.Configuration.PrepareHeaderForMatch = (string header, int index) =>
                header.Replace(" ", "")
                .ToLower();

            var items = csvReader.GetRecords<ProductItemDataModel>().ToArray();

            csvReader.Dispose();

            return items.MapToProductItems();
        }

        private void LoadItemsFromSource()
        {
            var items = GetItemsFromSource();

            if (items.Any())
            {
                foreach (var item in items)
                {
                    _DataSource.TryAdd(item.Id, item);
                }
            }
        }
    }
}
