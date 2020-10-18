import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import AddBoxIcon from '@material-ui/icons/AddBox';
import { TInsertProductItemDto, TProductItemDto } from '../resources/ProductItemResource'
import { TextField } from '@material-ui/core';
import { ERROR_MESSAGE } from '../resources/Constants';

const axios = require('axios');

type TCreateDialog = {
  open: boolean,
  handleCancelAction: ()  => void,
  handleCreateAction: (response: TProductItemDto)  => void,
};

type TDialogStage = 'initial' | 'loading' | 'success' | 'error';

const useStyles = makeStyles({
  title: {
    alignSelf: 'center',
  },
  createButton: {
    color: 'white',
    backgroundColor:'green',
    "&:hover": {
      color: 'white',
      backgroundColor:'darkgreen',
    }
  },
});

export function CreateDialog(props: TCreateDialog) {

  const { open, handleCancelAction, handleCreateAction } = props;

  const style = useStyles({});

  const [dialogStage, setDialogStage] = useState<TDialogStage>('initial');
  const [formName, setFormName] = useState<string>();
  const [formPrice, setFormPrice] = useState<number>();

  const [isFormNameValid, setIsFormNameValid] = useState(true);
  const [isFormPriceValid, setIsFormPriceValid] = useState(true);
  
  const isLoading = open && dialogStage === 'loading';
  const isInitial = open && dialogStage === 'initial';
  const isError = open && dialogStage === 'error';
  const isSuccess = open && dialogStage === 'success';

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
    resetForm();
  }

  function handleCreate(): void {

    if (!isFormValid()) {
      return;
    }

    const itemTobeCreated:TInsertProductItemDto  = {
      // @ts-ignore
      name: formName,
      // @ts-ignore 
      price: formPrice 
    };

    setDialogStage('loading');

    axios.post(`v1/products/items`, itemTobeCreated)
    .then((response: any) => {

      handleCreateAction(response.data);
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
      "Are you sure you want to create product item?",
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
      "Product item was succesfully Created.");
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
        aria-labelledby="create-dialog-title"
      >
         { getTitleElement() }
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
          aria-labelledby="create-dialog-title"
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
                  onChange={(e: any) => {setFormPrice(parseInt(e.target.value));}} />

              <TextField
                required
                error={!isFormNameValid}
                label="Name"
                variant="outlined"
                helperText={isFormNameValid? '': "Name is required!"}
                onChange={(e: any) => {setFormName(e.target.value);}} />
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
              className={style.createButton}
              onClick={handleCreate} 
              color="primary" 
              variant="contained" 
              startIcon={<AddBoxIcon />}>
              Create
            </Button>
            
          </DialogActions>
        </Dialog>);
  }

  function getTitleElement(): JSX.Element {
    return <DialogTitle className={style.title} id="create-dialog-title">{"Create New Item"}</DialogTitle>;
  }
}
