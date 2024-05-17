import Button from '../../ui/Button.jsx';
import { decreaseItemQuantity, increaseItemQuantity } from './cartSlice.js';
import { useDispatch } from 'react-redux';

export function UpdateItemQuantity({pizzaId, currentQuantity}) {
  const dispatch = useDispatch();

  return (
    <div className="flex gap-1 items-center gap-2 md:gap-3">
      <Button type="round" value="remove" onClick={() => dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
      <span className="text-sm font-medium">{currentQuantity}</span>
      <Button type="round" value="add" onClick={() => dispatch(increaseItemQuantity(pizzaId))}>+</Button>
    </div>
  );
}