using AutoFixture;
using DomainLayer;
using FakeItEasy;
using NUnit.Framework;
using ServerApp.Models;
using Shouldly;
using SinglePageApp.Managers;
using SinglePageApp.ServerApp.Repository;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;


namespace SinglePageApp.UnitTest
{
    [TestFixture]
    public class ProductManagerTests
    {
        [Test]
        public void ShouldOnlyReturnMaxPriceItems()
        {
            // Arrange
            var item1Record1 = new ProductItem
            {
                Id = 1,
                Name = "item1",
                Price = 11,
            };

            var item1Record2 = new ProductItem
            {
                Id = 2,
                Name = "item1",
                Price = 12,
            };

            var item1Record3 = new ProductItem
            {
                Id = 3,
                Name = "item1",
                Price = 13,
            };

            var item2Record1 = new ProductItem
            {
                Id = 4,
                Name = "item2",
                Price = 21,
            };

            var item2Record2 = new ProductItem
            {
                Id = 5,
                Name = "item2",
                Price = 22,
            };

            var item3Record1 = new ProductItem
            {
                Id = 6,
                Name = "item3",
                Price = 31,
            };

            var items = new[]
            {
              item1Record1,
              item1Record2,
              item1Record3,
              item2Record1,
              item2Record2,
              item3Record1,
            };

            var repo = A.Fake<IProductRepository>();

            A.CallTo(() => repo.GetProductItems())
                .Returns(items);

            var manager = A.Fake<ProductManager>(
                opts => opts.WithArgumentsForConstructor(new[] { repo }));

            // Act
            var response = manager.GetMaxPriceForItems();

            // Assert

            var expectedItems = response.Items
                .Select(i =>
                    new ProductItem
                    {
                        Id = i.Id,
                        Name = i.Name,
                        Price = i.Price,
                    });

            expectedItems.Count().ShouldBe(3);

            ShouldContainItem(expectedItems, item1Record3);
            ShouldContainItem(expectedItems, item2Record2);
            ShouldContainItem(expectedItems, item3Record1);
        }

        public static void ShouldContainItem(IEnumerable<ProductItem> source, ProductItem item)
        {
            source
                .Any(i =>
                    i.Id == item.Id
                    && i.Name == item.Name
                    && i.Price == item.Price)
                .ShouldBeTrue();
        }
    }
}
