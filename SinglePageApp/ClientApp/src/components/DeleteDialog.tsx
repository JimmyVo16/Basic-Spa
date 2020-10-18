import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import { TProductItem } from './ProductItemTable';
import { ERROR_MESSAGE } from '../resources/Constants';

const axios = require('axios');

type TDialogStage = 'initial' | 'loading' | 'success' | 'error';

type TDeleteDialog = {
  open: boolean,
  itemToBeDeleted?: TProductItem,
  handleCancelAction: ()  => void,
  handleDeleteAction: (item:TProductItem)  => void,
};

const useStyles = makeStyles({
  title: {
    alignSelf: 'center',
  },
});

export function DeleteDialog(props: TDeleteDialog) {

  const { open, itemToBeDeleted, handleCancelAction, handleDeleteAction } = props;
  
  const style = useStyles({});

  const [dialogStage, setDialogStage] = useState<TDialogStage>('initial');
 
  const isLoading = open && dialogStage === 'loading';
  const isInitial = open && dialogStage === 'initial';
  const isError = open && dialogStage === 'error';
  const isSuccess = open && dialogStage === 'success';
  
  const isValid = open && (itemToBeDeleted !== undefined || itemToBeDeleted === null);

  if(!isValid){
    return getErrorDialog(true);
  }

  return (
    <>
      {isLoading && getLoadingDialog(isLoading)}
      {isInitial && getInitialDialog(isInitial)}
      {isError && getErrorDialog(isError)}
      {isSuccess && getSuccessDialog(isSuccess)}
    </>
  );

  function handleClose(): void {
    handleCancelAction();
    setDialogStage('initial');
  }

  function handleDelete(): void {
   
    if(itemToBeDeleted === undefined){
      setDialogStage('error');
      return;
    }
    
    setDialogStage('loading');

    axios.delete(`v1/products/items/${itemToBeDeleted.id}`)
    .then(() => {

      handleDeleteAction(itemToBeDeleted);
      setDialogStage('success');
    })
    .catch(() =>  {

      setDialogStage('error');
    });
  }

  function getInitialDialog(_open: boolean): JSX.Element {  
    return getActionDialog(
      _open,
      "Are you sure you want to delete this item?",
      false);
  }

  function getLoadingDialog(_open: boolean): JSX.Element {  
    return getActionDialog(
      _open,
      "In progress...",
      true);
  }

  function getSuccessDialog(_open: boolean): JSX.Element {  
    return getConfirmationDialog(
      _open,
      "Product item was succesfully deleted.");
  }

  function getErrorDialog(_open: boolean): JSX.Element {
    
    return getConfirmationDialog(
      _open,
      ERROR_MESSAGE);
  }

  function getConfirmationDialog(_open: boolean, content: string): JSX.Element {
    
    return (
      <Dialog
        open={_open}
        onClose={handleClose}
        aria-labelledby="delete-dialog-title"
      >
        {getTitleElement()}
        <DialogContent>
          <DialogContentText>
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button 
            autoFocus 
            onClick={handleClose} 
            color="primary">
             Close
          </Button>
        </DialogActions>
      </Dialog>);
  }

  function getActionDialog(_open: boolean, content: string, _isLoading: boolean): JSX.Element {
    
    return (
      <Dialog
          open={_open}
          onClose={handleClose}
          aria-labelledby="delete-dialog-title"
        >
          {getTitleElement()}
          <DialogContent>
            <DialogContentText>
              {content}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button 
              autoFocus
              disabled={_isLoading} 
              onClick={handleClose} 
              color="primary">
              Cancel
            </Button>

            <Button 
              disabled={_isLoading}
              onClick={handleDelete} 
              color="primary" 
              variant="contained" 
              startIcon={<DeleteIcon />}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>);
  }

  function getTitleElement(): JSX.Element {
    return <DialogTitle className={style.title} id="delete-dialog-title">{"Delete"}</DialogTitle>;
  }
}
