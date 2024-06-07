import { deliveryTime, isValidPhone } from '../../utils/helpers.js';
import { createOrder } from '../../services/apiRestaurant.js';
import {store} from '../../store.js';
import { clearCart } from '../cart/cartSlice.js';
import { redirect } from 'react-router-dom';

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);

  const prices = JSON.parse(data.prices);
  delete data.prices;

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
    estimatedDelivery: deliveryTime(),
    orderPrice: prices.orderPrice,
    priorityPrice: prices.priorityPrice,
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      'Please give us your correct phone number. We might need it to contact you.';

  if (Object.keys(errors).length > 0) return errors;

  // If everything is okay, create new order and redirect.
  const newOrder = await createOrder(order);

  // Not for overuse.
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}