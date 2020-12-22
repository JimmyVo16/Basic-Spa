import { TProductItemDto } from "../resources/ProductItemResource";
import { getFilteredItems } from "./MaxPriceItems";


describe(`${getFilteredItems.name} tests`, () => {

  const originalItems: TProductItemDto[] = [
    { id: 1, name: "test1", price: 1 },
    { id: 2, name: "test2", price: 2 },
  ]

  test.each`
    addedItem                            | testDescription
    ${{ id: 4, name: "test1", price: 0 }}} | ${"equal to"}
    ${{ id: 4, name: "test1", price: 1 }}} | ${"lower than"}
  
  `(
    "added item should be part of filtered items when added item's price is $description the highest price",
    ({ addedItem }) => {

      var expectItem = getFilteredItems(addedItem, originalItems)
        .find(i => i.id === addedItem.id);

      expect(expectItem)
        .toBe(undefined);
    },
  );

  test.each`
    addedItem                            | description
    ${{ id: 4, name: "test1", price: 2 }}} | ${"added item's price is highest"}
    ${{ id: 4, name: "test3", price: 2 }}} | ${"added item is a new item."}
  `(
    "added item should be part of filtered items when $description",
    ({ addedItem }) => {

      const expectedItems = originalItems.map(x => x);
      expectedItems.push(addedItem);

      var expectItem = getFilteredItems(addedItem, originalItems)
        .find(i => i.id === addedItem.id);

      expect(expectItem.name)
        .toBe(addedItem.name);
      expect(expectItem.price)
        .toBe(addedItem.price);
    },
  );
});