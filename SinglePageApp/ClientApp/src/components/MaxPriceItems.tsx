import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {ProductItemTable, TProductItem} from './ProductItemTable'
import LoopTwoToneIcon from '@material-ui/icons/LoopTwoTone';
import { ERROR_MESSAGE } from '../resources/Constants';
import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { TProductItemDto } from '../resources/ProductItemResource';
import { TabPage } from "./TabPage";

const useStyles = makeStyles((theme: Theme) =>({
  filterSearch: {
    margin: theme.spacing(1),
  },
}));

export function MaxPriceItems():  JSX.Element {

  const style = useStyles({});
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [serverMessage, setServerMessage] = useState<string>();
  const [items, setItems] = useState<TProductItem[]>([]);

  useEffect(() => {
    getAllMaxPrices();
  }, []);


  return (
    <TabPage 
      header="Max Price Product Items"
      getConstent={getContent}
      getControllers={getControllers}
      handleCreateItem={handleCreateItem}
      />
  );

  function handleOnChange(itemName:string): void {
    
    if(itemName !== undefined && itemName !== "" && itemName !== null) {
      getAllMaxPriceByName(itemName);
    }
    else{
      getAllMaxPrices();
    }
  }

  function getAllMaxPrices(): void {
    axios.get('v1/products/items/max-price')
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

  function getAllMaxPriceByName(itemName: string): void {

    setIsLoading(true);

    axios.get(`v1/products/items/max-price/${itemName}`)
      .then((response: any) => {

        const array: TProductItem[] = [];
        array.push(response.data);

        setItems(array);
        setIsError(false);
        setIsLoading(false);
      })
      .catch((error: any) =>  {
        setServerMessage(error.response.data.detail);
        setIsError(true);
        setIsLoading(false);
      });
  }

  function getContent(): JSX.Element {

    if(isLoading) {
      return <div><LoopTwoToneIcon/> Loading...</div>
    }
    if(isError) {
      return <div>{serverMessage ?? ERROR_MESSAGE}</div>
    }

    return <ProductItemTable items={items} />;
  }

  function getControllers(): JSX.Element {
     return(
     <>
        <TextField 
           className={style.filterSearch}
          label="Filter by name"
          onChange={(e) => handleOnChange(e.target.value)} />
     </>)
  }

  function handleCreateItem(addedItem: TProductItemDto): void {
    setItems(getFilteredItems(addedItem, items));
  }
}

export function getFilteredItems(addedItem: TProductItemDto, originalItems:TProductItemDto[]) : TProductItemDto[] {

  const filteredItems = originalItems.map(x => x);

  if(!originalItems.some(i => i.name === addedItem.name)) {
    filteredItems.push({name:addedItem.name, price:addedItem.price, id: addedItem.id });
    
    return filteredItems;
  }

  const foundedIndex = originalItems.findIndex(i => i.name === addedItem.name && i.price < addedItem.price);

  if(foundedIndex === -1){
    return filteredItems;
  }
  
  filteredItems.splice(foundedIndex, 1, addedItem);
  return filteredItems;
}