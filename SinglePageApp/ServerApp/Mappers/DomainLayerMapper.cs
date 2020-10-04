using ServerApp.Models;
using SinglePageApp.ServerApp.Models;
using System.Collections.Generic;
using System.Linq;

namespace SinglePageApp.ServerApp.Mappers
{
    public static class DomainLayerMapper
    {

        public static IEnumerable<ProductItemDto> MapToProductItemDtos(this IEnumerable<ProductItem> source)
        {
            return source == null ?
                Enumerable.Empty<ProductItemDto>() :
                source.Select(MapToProductItemDto);
        }

        public static ProductItemDto MapToProductItemDto(this ProductItem source)
        {
            return new ProductItemDto
            {
                Id = source.Id,
                Name = source.Name,
                Price = source.Price,
            };
        }

        public static ProductItem MapToProductItem(this ProductItemDto source)
        {
            return new ProductItem
            {
                Id = source.Id,
                Name = source.Name,
                Price = source.Price,
            };
        }
    }
}
