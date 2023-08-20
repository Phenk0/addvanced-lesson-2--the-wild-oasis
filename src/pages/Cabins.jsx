import { useState } from 'react';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable.jsx';
import CreateCabinForm from '../features/cabins/CreateCabinForm.jsx';
import Button from '../ui/Button.jsx';

function Cabins() {
  const [isFormVisible, setIsFormVisible] = useState(false);
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />
        <Button
          $variation={isFormVisible ? 'secondary' : 'primary'}
          onClick={() => setIsFormVisible((visible) => !visible)}
        >
          {isFormVisible ? 'Cancel adding new cabin' : 'Add new cabin'}
        </Button>
        {isFormVisible && <CreateCabinForm />}
      </Row>
    </>
  );
}

export default Cabins;
