import { Form, useActionData, useNavigation } from 'react-router-dom';
import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAddress } from '../user/userSlice.js';
import { getCart, getTotalCartPrice } from '../cart/cartSlice.js';
import EmptyCart from '../cart/EmptyCart.jsx';
import { formatCurrency } from '../../utils/helpers.js';
import { useState } from 'react';

function CreateOrder() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const formErrors = useActionData();

  const [withPriority, setWithPriority] = useState(false);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const pP = totalCartPrice / 100 * 20;
  const priorityPrice = withPriority ? pP : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const prices = {orderPrice: totalPrice, priorityPrice: pP};

  const {username, status: addressStatus, position, address, error: errorAddress} = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === 'loading';
  const isSubmitting = navigation.state === 'submitting';

  const cart = useSelector(getCart);

  function handleGetPosition(e) {
    e.preventDefault();

    dispatch(fetchAddress());
  }

  if(!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let&apos;s go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow relative">
            <input
              className="input w-full"
              type="text"
              name="address"
              disabled={isLoadingAddress}
              defaultValue={address}
              required
            />
            {!position.latitude && !position.longitude &&
              <span className="absolute right-[3px] bottom-[3px] z-50">
                <Button disabled={isLoadingAddress} type="small" onClick={(e) => handleGetPosition(e)}>{isLoadingAddress ? 'Getting address...' : 'Get address'}</Button>
              </span>
            }
          </div>
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude && position.latitude ? `${position.longitude},${position.latitude}` : ''} />
          <input type="hidden" name="prices" value={JSON.stringify(prices)} />
          <Button disabled={isSubmitting || isLoadingAddress} type="primary">
            {isSubmitting ? 'Placing order....' : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default CreateOrder;