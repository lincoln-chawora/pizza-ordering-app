import LinkButton from '../../ui/LinkButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart } from './cartSlice.js';
import EmptyCart from './EmptyCart.jsx';
import { getUsername } from '../user/userSlice.js';
import { useFetcher } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Cart() {
  const [ingredients, setIngredients] = useState([]);
  const username = useSelector(getUsername);
  const cart = useSelector(getCart);

  const dispatch = useDispatch();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');

    if (fetcher.data) {
      const uniqueIngredients = [...new Set(fetcher.data.flatMap(pizza => !pizza.soldOut ? pizza.ingredients : []))];
      setIngredients(uniqueIngredients);
    }
  }, [fetcher]);


  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <h2 className="mt-7 text-xl font-semibold">Your cart, {username}</h2>

      <ul className="mt-3 divide-y divide-stone-200 border-b">
        {cart.map((item, idx) => (
          <CartItem item={item} key={idx} isLoadingIngredients={fetcher.state} allIngredients={ingredients} />
        ))}
      </ul>

      <div className="mt-6 space-x-2">
          <Button to="/order/new" type="primary">
            Order pizzas
          </Button>

        <Button type="secondary" onClick={() => dispatch(clearCart())}>Clear cart</Button>
      </div>
    </div>
  );
}

export default Cart;