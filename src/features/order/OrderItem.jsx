import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item }) {
  const { quantity, name, totalPrice, ingredients, addIngredients, removeIngredients } = item;

  const finalIngredients = ingredients.concat(addIngredients);

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p>
          <span className="font-bold">{quantity}&times;</span> {name}
        </p>
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <div className="text-sm capitalize italic text-stone-500">{finalIngredients.map((i, idx) => {

        return (
          <span className={`${removeIngredients.includes(i) && 'line-through'} mr-1`} key={idx}>
            {i}
            {idx !== finalIngredients.length - 1 && ','}
          </span>
        )
      })}</div>
    </li>
  );
}

export default OrderItem;