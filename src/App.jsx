import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Home from "./ui/Home.jsx";
import Menu from './features/menu/Menu.jsx';
import CreateOrder from './features/order/CreateOrder.jsx';
import Cart from "./features/cart/Cart.jsx";
import Order from "./features/order/Order.jsx";
import {action as createOrderAction} from "./features/order/orderAction.js";
import {action as updateOrderAction} from "./features/order/UpdateOrder.jsx";
import {loader as menuLoader} from "./features/menu/menuLoader.js";
import {loader as orderLoader} from "./features/order/orderLoader.js"
import {AppLayout} from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
    {
        element: <AppLayout />,
        errorElement: <Error />,
        children: [
            { path: '/', element: <Home /> },
            {
                path: '/menu',
                element: <Menu />,
                loader: menuLoader, // Loads data from api when page is visited.
                errorElement: <Error />,
            },
            { path: '/cart', element: <Cart /> },
            {
                path: '/order/new',
                element: <CreateOrder />,
                action: createOrderAction
            },
            {
                path: '/order/:orderId',
                element: <Order />,
                loader: orderLoader,
                errorElement: <Error />,
                action: updateOrderAction
            }
        ]
    },
])

/*
@todo: EXTRA FEATURES.

That's nice to hear! I have a few suggestions that I initially wanted to implement but then cut out. However, for these suggestions to work, you would have to build your own API first, maybe using Supabase, because they would need additional fields in the API response. With that being said, here are 3 suggestions:

1) On order, you could let the user define a PIN number for the order. Then, in the page that displays the final order, the user could be allowed to actually edit the order during the first 5 minutes after submitting it, but ONLY if they input the correct PIN number (otherwise, users could edit orders from other people). This would require a PIN to be sent to the API request on order.

2) ✅ Add the ability to add or remove ingredients for pizzas in the cart.

3) ✅ Persist the cart data using "Redux persist"
 */
function App() {
  return (
      <RouterProvider router={router} />
  );
}

export default App
