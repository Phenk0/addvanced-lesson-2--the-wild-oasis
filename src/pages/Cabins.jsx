import Heading from '../ui/Heading';
import Row from '../ui/Row';
import { getCabins } from '../services/apiCabins.js';
import { useEffect, useState } from 'react';

function Cabins() {
  const [cabins, setCabins] = useState([]);

  useEffect(() => {
    getCabins().then((data) => setCabins(data));
  }, []);

  console.log(cabins);
  return (
    <Row type="horizontal">
      <Heading as="h1">All cabins</Heading>
      <p>TEST</p>
      <img src={cabins[0]?.image} alt="01" />
    </Row>
  );
}

export default Cabins;
