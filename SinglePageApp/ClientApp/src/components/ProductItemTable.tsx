
import React, { useState } from 'react';
import { DeleteDialog } from './DeleteDialog';
import { UpdateDialog } from './UpdateDialog';
import { TProductItemDto } from '../resources/ProductItemResource';
import { Table } from './Table';

export type TProductItem ={
  id: number,
  name: string,
  price: number
};

type TProductItemPageProps = {
  items: TProductItem[],
}

export  function ProductItemTable(props: TProductItemPageProps): JSX.Element {

  const [items, setItems] = useState<TProductItem[]>(props.items);

  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [itemToBeDeleted, setItemToBeDeleted] = useState<TProductItem>();

  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [itemToBeUpdated, setItemToBeUpdated] = useState<TProductItem>();

  return (
    <div>
      <Table items={items} 
       setDeleteItem={setDeleteItem}
       setUpdateItem={setUpdateItem} />

      { openDeleteModal && 
        <DeleteDialog 
          open={openDeleteModal}
          itemToBeDeleted={itemToBeDeleted}
          handleCancelAction={closeDeleteDialog}
          handleDeleteAction={handleDeleteItem} />}
      
      { openUpdateModal &&  <UpdateDialog 
        open={openUpdateModal}
        originalItem={itemToBeUpdated}
        handleCancelAction={closeUpdateDialog}
        handleUpdateAction={handleUpdateItem} />}
    </div>
  );

  // Handle update
  function closeUpdateDialog(): void {
    setOpenUpdateModal(false);
  }

  function handleUpdateItem(response: TProductItemDto): void {
    const itemIndex = items.findIndex((item => item.id == response.id));
    items[itemIndex].name = response.name;
    items[itemIndex].price = response.price;
  }

  function setUpdateItem(item:TProductItem): void {
    setItemToBeUpdated(item);
    setOpenUpdateModal(true);
  }

  // Handle deletion
  function closeDeleteDialog(): void {
      setOpenDeleteModal(false);
  }

  function handleDeleteItem(deletedItem:TProductItem): void {
    setItems(items.filter(item => item.id !== deletedItem.id));
  }

  function setDeleteItem(item:TProductItem): void {
    setItemToBeDeleted(item);
    setOpenDeleteModal(true);
  }
}