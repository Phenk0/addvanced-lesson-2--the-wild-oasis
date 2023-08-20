import { useState } from 'react';
import styled from 'styled-components';

import Button from '../../ui/Button.jsx';
import Row from '../../ui/Row.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';

import useDeleteCabin from './useDeleteCabin.js';
import { formatCurrency } from '../../utils/helpers.js';
import {
  HiOutlinePencil,
  HiOutlineSquare2Stack,
  HiOutlineTrash
} from 'react-icons/hi2';
import useCreateCabin from './useCreateCabin.js';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const [isFormVisible, setIsFormVisible] = useState(false);
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin, isCreating } = useCreateCabin();

  const {
    image,
    regularPrice,
    discount,
    name,
    maxCapacity,
    description,
    id: cabinId
  } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      discount,
      regularPrice,
      image,
      maxCapacity,
      description
    });
  }
  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? (
          <Discount>{formatCurrency(discount)}</Discount>
        ) : (
          <span>&mdash;</span>
        )}

        <Row type="horizontal">
          <Button $size="small" onClick={handleDuplicate} disabled={isCreating}>
            <HiOutlineSquare2Stack size="20" color="white" />
          </Button>
          <Button
            $variation="secondary"
            $size="small"
            onClick={() => setIsFormVisible((visible) => !visible)}
          >
            <HiOutlinePencil size="20" color="black" />
          </Button>
          <Button
            onClick={() => deleteCabin(cabinId)}
            disabled={isDeleting}
            $variation="danger"
            $size="small"
          >
            <HiOutlineTrash size="20" color="white" />
          </Button>
        </Row>
      </TableRow>
      {isFormVisible && <CreateCabinForm cabinToEdit={cabin} />}
    </>
  );
}

export default CabinRow;
