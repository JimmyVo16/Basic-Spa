using Microsoft.AspNetCore.Mvc;
using SinglePageApp.Managers;
using SinglePageApp.ServerApp.Models;
using System.Collections.Generic;

namespace SinglePageApp.Controllers
{
    [Route("v1/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly IProductManager _ProductManager;

        public ProductsController(IProductManager productManager)
        {
            _ProductManager = productManager;
        }

        // Anki Jimmy the reason why it was erroring is because it's has a / infront of it.
        [HttpGet]
        [Route("items")]
        public ProductItemsDto GetItems()
        {
            return _ProductManager.GetProductItems();
        }

        [Route("items/{itemName}")]
        public MaxPriceDto Get(string itemName)
        {
            var response = _ProductManager.GetMaxPriceForItem(itemName);

            if (response == null)
            {
                //Jimmy return 404
            }

            //Jimmy validatation for can't find item.
            return response;
        }

        [HttpPost]
        [Route("items")]
        public ProductItemDto Post([FromBody] ProductItemDto inputDto)
        {
            return _ProductManager.SaveProductItem(inputDto);
        }


        //[HttpGet]
        //[Route("items")]
        //public HttpResponseMessage GetItems()
        //{ Jimmy
        //    JsonSerializerSettings settings = new JsonSerializerSettings();
        //    string json = JsonConvert.SerializeObject(_ProductManager.GetProductItems(), settings);

        //    HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.OK, "value");
        //    response.Content = new StringContent(json, Encoding.Unicode, "json");
        //    return response;

        //}



        //// PUT: api/Product/5
        //[HttpPut("{id}")]
        //public void Put(int id, [FromBody] string value)
        //{
        //}

        //// DELETE: api/ApiWithActions/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //}
    }
}
