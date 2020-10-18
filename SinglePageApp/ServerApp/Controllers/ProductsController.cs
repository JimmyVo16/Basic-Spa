using Microsoft.AspNetCore.Mvc;
using SinglePageApp.Managers;
using SinglePageApp.ServerApp.Models;

namespace SinglePageApp.Controllers
{
    [Route("v1/[controller]/items")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductManager _ProductManager;

        public ProductsController(IProductManager productManager)
        {
            _ProductManager = productManager;
        }

        [HttpGet]
        public ActionResult<ProductItemsDto> GetAllItems()
        {
            return _ProductManager.GetProductItems();
        }

        [HttpGet("max-price/{itemName}")]
        public ActionResult<ProductItemDto> GetMaxPriceForItem(string itemName)
        {
            if (string.IsNullOrWhiteSpace(itemName))
            {
                return this.Problem($"Item name is invalid", null, 400);
            }

            var result = _ProductManager.GetMaxPriceForItem(itemName);

            if (result == null)
            {
                return this.Problem($"No items were found with the name '{itemName}'.", null, 404);
            }

            return result;
        }

        [HttpGet("max-price")]
        public ActionResult<ProductItemsDto> GetMaxPriceForItems()
        {
            return _ProductManager.GetMaxPriceForItems();
        }

        [HttpPost]
        public ActionResult<ProductItemDto> Post([FromBody] InsertedProductItemDto inputDto)
        {
            if (inputDto == null 
                || string.IsNullOrWhiteSpace(inputDto.Name)
                || inputDto.Price == 0)
            {
                return this.Problem($"Item name and price must be provided", null, 400);
            }

            var result = _ProductManager.CreateProductItem(inputDto);

            if (result == null)
            {
                return this.Problem("Unable to create item", null, 500);
            }

            return result;
        }

        public ActionResult<ProductItemDto> Patch([FromBody] ProductItemDto itemToBeUpdated)
        {
            if (itemToBeUpdated == null || itemToBeUpdated.Id == 0)
            {
                return this.Problem($"Invalid product item", null, 400);
            }

            if (string.IsNullOrWhiteSpace(itemToBeUpdated.Name) || itemToBeUpdated.Price == 0)
            {
                return this.Problem($"New values must be valid", null, 400);
            }

            var updatedItem = _ProductManager.UpdateProductItem(itemToBeUpdated);

            if (updatedItem == null)
            {
                return this.Problem($"Unable to update item.", null, 500);
            }

            return updatedItem;
        }

        [HttpDelete("{productItemId}")]
        public ActionResult Delete(int productItemId)
        {
            if (productItemId <= 0)
            {
                return this.Problem($"Product item id '{productItemId}' is invalid", null, 400);
            }

            if (_ProductManager.DeleteProductItem(productItemId))
            {
                return Ok();
            }

            return this.Problem($"Unable to delete Product item id '{productItemId}'", null, 500);
        }
    }
}
