import React, { useState } from 'react';

import { CreateDialog } from './CreateDialog';
import { TProductItemDto } from '../resources/ProductItemResource';
import { Button } from '@material-ui/core';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { makeStyles, Theme } from '@material-ui/core/styles';

type TProductContentPageProps = {
  header: string,
  getConstent: () => JSX.Element, 
  getControllers: () => JSX.Element,
  handleCreateItem:(response: TProductItemDto)  => void,
};

const useStyles = makeStyles((theme: Theme) =>({
  createButton: {
    color: 'white',
    backgroundColor:'green',
    "&:hover": {
      color: 'white',
      backgroundColor:'darkgreen',
    },
    margin: theme.spacing(1),
    marginTop: "25px",
  },
}));

export function TabPage(props: TProductContentPageProps):  JSX.Element {

  const style = useStyles({});
  const {header, getConstent, getControllers, handleCreateItem} = props;
  const [openCreateModal, setOpenCreateModal] = useState(false);

  return (
    <div>
      <h1>{header}</h1>
      <div>
      <Button 
          size="small"
          className={style.createButton}
          variant="contained" 
          startIcon={<AddBoxIcon />} 
          onClick={() => setOpenCreateModal(true)}>
            Create new item
        </Button>
        
        {getControllers()}
      </div>
      <div>
        {getConstent()}
      </div>

      {openCreateModal && 
        <CreateDialog 
          open={openCreateModal}
          handleCancelAction={closeCreateDialog}
          handleCreateAction={handleCreateItem} />}
    </div>
  );

    function closeCreateDialog(): void {
      setOpenCreateModal(false);
    }
}