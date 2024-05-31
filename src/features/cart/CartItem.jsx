import { convertToOptionList, formatCurrency } from '../../utils/helpers';
import { DeleteItem } from './DeleteItem';
import { UpdateItemQuantity } from './UpdateItemQuantity';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentQuantityById, updateItemIngredients } from './cartSlice.js';
import Select from 'react-select';
import { useState } from 'react';

function CartItem({ item, isLoadingIngredients, allIngredients }) {
  const { pizzaId, name, quantity, totalPrice, ingredients } = item;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  const [ingredientsList, setIngredientsList] = useState(ingredients);

  function handleOnChange(selectedItems) {
    const updatedIngredients = selectedItems.map((item) => {
      return item.value;
    });

    setIngredientsList(updatedIngredients);

    const thingsToSend = {pizzaId, updatedIngredients};
    dispatch(updateItemIngredients(thingsToSend));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <div className="mr-3">
        <p className="mb-1">
          {quantity}&times; {name}
        </p>

        {isLoadingIngredients === 'loading' ? 'Loading ingredients...' :
          <Select defaultValue={convertToOptionList(ingredientsList)}
          isMulti
          onChange={(e) => handleOnChange(e)}
          name="ingredients"
          options={convertToOptionList(allIngredients)}
          className="basic-multi-select"
          classNamePrefix="select" />
        }
      </div>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;