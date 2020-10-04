using ServerApp.Models;
using SinglePageApp.ServerApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace SinglePageApp.ServerApp.Mappers
{
    public static class RepositoryLayerMapper
    {
        public static IEnumerable<ProductItem> MapToProductItems(this IEnumerable<ProductItemDataModel> source)
        {
            return source == null ?
                Enumerable.Empty<ProductItem>() :
                source.Select(MapToProductItem);
        }

        private static ProductItem MapToProductItem(this ProductItemDataModel source)
        {
            return new ProductItem
            {
                Id = source.Id,
                Name = source.ItemName,
                Price = source.Cost,
            }; 
        }
    }
}
