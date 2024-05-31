import { getOrder } from '../../services/apiRestaurant.js';

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}