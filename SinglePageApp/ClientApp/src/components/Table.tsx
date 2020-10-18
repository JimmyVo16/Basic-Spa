
import React from 'react';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { TProductItem } from './ProductItemTable';
import { makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>({
  deleteButton:{
    marginRight: theme.spacing(1),
    backgroundColor: '#A30038',
  }
}));

type TTable ={
  items: TProductItem[],
  setDeleteItem:  (item:TProductItem) => void,
  setUpdateItem:  (item:TProductItem) => void,
};

export function Table(props: TTable): JSX.Element {

  const { items, setDeleteItem, setUpdateItem } = props;

  const style = useStyles({});

  return (
    <table className='table table-striped'>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
      {items.map(item =>
          <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.name}</td>
              <td>{item.price}</td>
              <td>
                {
                <>
                <Button 
                  className={style.deleteButton}
                  size="small"
                  color="secondary" 
                  variant="contained" 
                  startIcon={<DeleteIcon />} 
                  onClick={() => {setDeleteItem(item);}}>
                    Delete
                </Button>

                <Button 
                  size="small"
                  color="primary" 
                  variant="contained" 
                  startIcon={<EditIcon />} 
                  onClick={() => {setUpdateItem(item);}}>
                    Update
                </Button>
                </>}
              </td>
          </tr>
      )}
      </tbody>
    </table>);
}