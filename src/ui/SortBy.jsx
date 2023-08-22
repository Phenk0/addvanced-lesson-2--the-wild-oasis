import Select from './Select.jsx';
import { useSearchParams } from 'react-router-dom';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortBy = searchParams.get('sortBy') || '';
  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);

    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      $type="white"
      onChange={handleChange}
      sortByValue={sortBy}
    />
  );
}

export default SortBy;
