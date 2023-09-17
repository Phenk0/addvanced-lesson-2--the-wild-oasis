import Button from '../../ui/Button.jsx';
import { useCheckout } from './useCheckout.js';
import SpinnerMini from '../../ui/SpinnerMini.jsx';

function CheckoutButton({ bookingId }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <Button
      $size="small"
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      {isCheckingOut ? <SpinnerMini /> : 'Check out'}
    </Button>
  );
}

export default CheckoutButton;
