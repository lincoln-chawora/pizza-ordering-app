import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { useDispatch, useSelector } from 'react-redux';
import {
  addItem,
  getCurrentQuantityById,
  increaseItemQuantity,
} from '../cart/cartSlice.js';
import { DeleteItem } from '../cart/DeleteItem.jsx';
import { UpdateItemQuantity } from '../cart/UpdateItemQuantity';

function MenuItem({ pizza }) {
  const { id: pizzaId, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId));

  const pizzaIsInCart = currentQuantity > 0;

  function handleAddToCart() {
    if (soldOut) return;

    if (pizzaIsInCart) {
      dispatch(increaseItemQuantity(pizzaId));
    } else {
      const newItem = {
        pizzaId,
        name,
        quantity: 1,
        unitPrice,
        ingredients,
        totalPrice: unitPrice,
        addIngredients: [],
        removeIngredients: []
      };

      dispatch(addItem(newItem));
    }
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {pizzaIsInCart &&
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity pizzaId={pizzaId} currentQuantity={currentQuantity} />
              <DeleteItem pizzaId={pizzaId} />
            </div>
          }
          {!soldOut && !pizzaIsInCart &&
            <Button type="small" onClick={handleAddToCart}>Add to cart</Button>
          }
        </div>
      </div>
    </li>
  );
}

export default MenuItem;