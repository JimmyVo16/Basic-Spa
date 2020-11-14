using AutoFixture;
using DomainLayer;
using FakeItEasy;
using NUnit.Framework;
using ServerApp.Models;
using Shouldly;
using SinglePageApp.ServerApp.Repository;
using System.Collections.Concurrent;
using System.Linq;
using System.Threading.Tasks;

namespace SinglePagApp
{
    [TestFixture]
    public class ProductRepositoryTests
    {
        [Test]
        public async Task ShouldGenerateNewIdWhenInsertingNewItems()
        {
            // Arrange
            var fixture = new Fixture();

            var dataSource = A.Fake<IDataSource>();

            var collection = new ConcurrentDictionary<int, ProductItem>();

            A.CallTo(() => dataSource.GetCollection())
                .Returns(collection);

            var repo = A.Fake<ProductRepository>(
                opts => opts.WithArgumentsForConstructor(new[] { dataSource }));

            var items = new[]
            {
                 fixture.Create<ProductItem>(),
                 fixture.Create<ProductItem>(),
                 fixture.Create<ProductItem>(),
            };

            var tasks = items.Select(i => Task.Run(() => repo.CreateProductItem(i)));

            // Act
            await Task.WhenAll(tasks);

            // Assert
            var expectedItems = repo.GetProductItems();

            expectedItems
                .All(ei =>
                    items.Any(i => i.Name == ei.Name && i.Price == ei.Price))
                .ShouldBeTrue();

            expectedItems
                .Any(ei => ei.Id <= 0)
                .ShouldBeFalse();
        }

    }
}
