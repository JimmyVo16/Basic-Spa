using ServerApp.Models;
using System.Collections.Concurrent;

namespace SinglePageApp.ServerApp.Repository
{
    public interface IDataSource
    {
        ConcurrentDictionary<int, ProductItem> GetCollection();
    }
}
