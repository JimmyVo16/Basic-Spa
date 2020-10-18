
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ProductItemTable, TProductItem} from './ProductItemTable'
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';
import { ERROR_MESSAGE } from '../resources/Constants';
import { TProductItemDto } from '../resources/ProductItemResource';
import { TabPage } from "./TabPage";

export function AllProductItems():  JSX.Element {

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [items, setItems] = useState<TProductItem[]>([]);

  useEffect(() => {
    getAllItems();
  }, []);


  return (
    <TabPage 
      header="All Product Items"
      getConstent={getContent}
      getControllers={getControllers}
      handleCreateItem={handleCreateItem}
      />
  );

  function getAllItems(): void {
    setIsLoading(true);

    axios.get('v1/products/items')
      .then((response: any) => {
        setItems(response.data.items);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error: any) =>  {
        setIsError(true);
        setIsLoading(false);
      });
  }

  function getContent(): JSX.Element {

    if(isLoading) {
      return <div><LoopTwoToneIcon/> Loading...</div>
    }
    if(isError) {
      return <div>{ERROR_MESSAGE}</div>
    }

    return <ProductItemTable items={items} />;
  }

  function getControllers(): JSX.Element {
     return(<></>)
  }

  function handleCreateItem(addedItem: TProductItemDto): void {

    items.push({name:addedItem.name, price:addedItem.price, id: addedItem.id });
    setItems(items);
  }
}