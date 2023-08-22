import { useQuery } from '@tanstack/react-query';
import { getBookings } from '../../services/apiBookings.js';

export function useBookings() {
  const {
    data: bookings,
    error,
    isLoading
  } = useQuery({
    queryKey: ['bookings'],
    queryFn: getBookings
  });
  return { bookings, error, isLoading };
}
