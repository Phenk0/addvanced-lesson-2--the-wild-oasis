import Spinner from '../../ui/Spinner.jsx';
import CabinRow from './CabinRow.jsx';

import { useCabins } from './useCabins.js';
import Table from '../../ui/Table.jsx';
import Menus from '../../ui/Menus.jsx';
import { useSearchParams } from 'react-router-dom';
import Empty from '../../ui/Empty.jsx';

function CabinTable() {
  const { cabins, isLoading } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;
  if (!cabins.length) return <Empty resourceName="cabins" />;

  // 1) For FILTER
  const filterValue = searchParams.get('discount') || 'all';

  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins;
  if (filterValue === 'no-discount')
    filteredCabins = cabins.filter((cabin) => Boolean(!cabin.discount));
  if (filterValue === 'with-discount')
    filteredCabins = cabins.filter((cabin) => cabin.discount > 0);

  // 2) SORTBY
  const sortByValue = searchParams.get('sortBy') || 'name-asc';

  const [field, direction] = sortByValue.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  const sortedAndFilteredCabins = [...filteredCabins].sort(
    (a, b) =>
      (typeof a[field] === 'string'
        ? a[field].localeCompare(b[field])
        : a[field] - b[field]) * modifier
  );

  // let sortedAndFilteredCabins;
  //
  // switch (sortByValue) {
  //   // case 'name-asc':
  //   // sortedAndFilteredCabins = [...filteredCabins].sort((a, b) =>
  //   //   a.name.localeCompare(b.name)
  //   // );
  //   //   break;
  //   case 'name-dsc':
  //     sortedAndFilteredCabins = [...filteredCabins].sort((a, b) =>
  //       b.name.localeCompare(a.name)
  //     );
  //     break;
  //   case 'regularPrice-asc':
  //     sortedAndFilteredCabins = [...filteredCabins].sort(
  //       (a, b) => a.regularPrice - b.regularPrice
  //     );
  //     break;
  //   case 'regularPrice-dsc':
  //     sortedAndFilteredCabins = [...filteredCabins].sort(
  //       (a, b) => b.regularPrice - a.regularPrice
  //     );
  //     break;
  //   case 'maxCapacity-asc':
  //     sortedAndFilteredCabins = [...filteredCabins].sort(
  //       (a, b) => a.maxCapacity - b.maxCapacity
  //     );
  //     break;
  //   case 'maxCapacity-dsc':
  //     sortedAndFilteredCabins = [...filteredCabins].sort(
  //       (a, b) => b.maxCapacity - a.maxCapacity
  //     );
  //     break;
  //   default:
  //     sortedAndFilteredCabins = [...filteredCabins].sort((a, b) =>
  //       a.name.localeCompare(b.name)
  //     );
  //     break;
  // }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 0.3fr">
        <Table.Header role="row">
          <div></div>
          <div>Cabin</div>
          <div>Capacity</div>
          <div>Price</div>
          <div>Discount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={sortedAndFilteredCabins}
          render={(cabin) => <CabinRow cabin={cabin} key={cabin.id} />}
        />
      </Table>
    </Menus>
  );
}

export default CabinTable;
