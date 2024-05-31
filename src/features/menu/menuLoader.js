import { getMenu } from '../../services/apiRestaurant.js';

export async function loader() {
  const menu = await getMenu();
  return menu;
}