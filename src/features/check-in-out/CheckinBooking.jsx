import { useEffect, useState } from 'react';
import styled from 'styled-components';

import BookingDataBox from '../bookings/BookingDataBox.jsx';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import ButtonGroup from '../../ui/ButtonGroup.jsx';
import Button from '../../ui/Button.jsx';
import ButtonText from '../../ui/ButtonText.jsx';
import Checkbox from '../../ui/Checkbox.jsx';
import Spinner from '../../ui/Spinner.jsx';

import { useMoveBack } from '../../hooks/useMoveBack.js';
import { useBooking } from '../bookings/useBooking.js';
import { useCheckin } from './useCheckin.js';
import { useSettings } from '../settings/useSettings.js';
import { formatCurrency } from '../../utils/helpers.js';

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const [isConfirmPaid, setIsConfirmPaid] = useState(false);
  const [isAddBreakfast, setIsAddBreakfast] = useState(false);
  const moveBack = useMoveBack();
  const { booking, isLoading } = useBooking();
  const { checkin, isCheckingIn } = useCheckin();
  const { settings, isLoading: isLoadingSettings } = useSettings();
  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid
  } = booking || {};

  useEffect(() => {
    setIsConfirmPaid(isPaid ?? false);
  }, [isPaid]);

  if (isLoading || isLoadingSettings) return <Spinner />;

  const optionalBreakfastPrice =
    settings.breakfastPrice * numNights * numGuests;

  function handleCheckin() {
    if (!isConfirmPaid) return;

    if (isAddBreakfast)
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      });
    else checkin({ bookingId, breakfast: {} });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      {!hasBreakfast && (
        <Box>
          <Checkbox
            checked={isAddBreakfast}
            id="breakfast"
            onChange={() => {
              setIsAddBreakfast((prevState) => !prevState);
              setIsConfirmPaid(false);
            }}
            disabled={false}
          >
            Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
          </Checkbox>
        </Box>
      )}

      <Box>
        <Checkbox
          onChange={() => setIsConfirmPaid((prevState) => !prevState)}
          checked={isConfirmPaid}
          id="confirm"
          disabled={isConfirmPaid || isCheckingIn}
        >
          I confirm that {guests.fullName} has paid the total amount of{' '}
          {!isAddBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + optionalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button
          onClick={handleCheckin}
          disabled={!isConfirmPaid || isCheckingIn}
        >
          Check in booking #{bookingId}
        </Button>
        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;
