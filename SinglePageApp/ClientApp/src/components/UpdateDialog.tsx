import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import { TProductItem } from './ProductItemTable';
import { TProductItemDto } from '../resources/ProductItemResource'
import { TextField } from '@material-ui/core';
import { ERROR_MESSAGE } from '../resources/Constants';

const axios = require('axios');

type TUpdateDialog = {
  open: boolean,
  originalItem?: TProductItem,
  handleCancelAction: ()  => void,
  handleUpdateAction: (response: TProductItemDto)  => void,
};

type TDialogStage = 'initial' | 'loading' | 'success' | 'error';

const useStyles = makeStyles({
  title: {
    alignSelf: 'center',
  },
});

export function UpdateDialog(props: TUpdateDialog) {

  const style = useStyles({});

  const { open, originalItem, handleCancelAction, handleUpdateAction } = props;

  const [dialogStage, setDialogStage] = useState<TDialogStage>('initial');
  const [formName, setFormName] = useState<string>();
  const [formPrice, setFormPrice] = useState<number>();

  const [isFormNameValid, setIsFormNameValid] = useState(true);
  const [isFormPriceValid, setIsFormPriceValid] = useState(true);

  const isLoading = open && dialogStage === 'loading';
  const isInitial = open && dialogStage === 'initial';
  const isError = open && dialogStage === 'error';
  const isSuccess = open && dialogStage === 'success';

  const isValid = open && (originalItem !== undefined || originalItem === null);

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
    resetForm();
    setDialogStage('initial');
  }

  function handleUpdate(): void {

    if(originalItem === undefined) {
      setDialogStage('error');
      return;
    }

    if (!isFormValid()) {
      return;
    }

    const itemTobeUpdated:TProductItemDto  = {
      id: originalItem.id,
      name: formName ?? originalItem.name,
      price: formPrice ?? originalItem.price,
    };

    setDialogStage('loading');

    axios.patch(`v1/products/items`, itemTobeUpdated)
    .then((response: any) => {

      handleUpdateAction(response.data);
      setDialogStage('success');
    })
    .catch((error: any) =>  {

      setDialogStage('error');
    });
  }

  function isFormValid(){
    const _isFormNameValid = formName ? true : false;
    const _isFormPriceValid = formPrice ? true : false;
    setIsFormNameValid(_isFormNameValid);
    setIsFormPriceValid(_isFormPriceValid);

    return _isFormNameValid && _isFormPriceValid
  }

  function resetForm(){
    setIsFormNameValid(true);
    setIsFormPriceValid(true);
  }

  function getInitialDialog(_open: boolean): JSX.Element {  
    return getActionDialog(
      _open,
      "Are you sure you want to update product item?",
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
      "Product item was succesfully unpdated.");
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
        aria-labelledby="update-dialog-title"
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
          aria-labelledby="update-dialog-title"
        >
          { getTitleElement() }
          
          <DialogContent>
            <div>
              {content}
            </div>
            {!_isLoading && 
              <div>
                <TextField
                  required
                  error={!isFormPriceValid}
                  label="Price"
                  type="number"
                  helperText={isFormPriceValid? '': "Price is required!"}
                  variant="outlined"
                  onChange={(e: any) => {setFormPrice(parseInt(e.target.value));}}/>

                <TextField
                  required
                  error={!isFormNameValid}
                  label="Name"
                  variant="outlined"
                  helperText={isFormNameValid? '': "Name is required!"}
                  onChange={(e: any) => {setFormName(e.target.value);}}/>
              </div>}
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
              onClick={handleUpdate} 
              color="primary" 
              variant="contained" 
              startIcon={<EditIcon />}>
              Update
            </Button>
            
          </DialogActions>
        </Dialog>);
  }

  function getTitleElement(): JSX.Element {
    return <DialogTitle className={style.title} id="update-dialog-title">{"Update"}</DialogTitle>;
  }
}
