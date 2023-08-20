// import styled from 'styled-components';
//
// import Button from '../../ui/Button.jsx';
// import Row from '../../ui/Row.jsx';
// import CreateCabinForm from './CreateCabinForm.jsx';
//
// import useDeleteCabin from './useDeleteCabin.js';
// import { formatCurrency } from '../../utils/helpers.js';
// import {
//   HiOutlinePencil,
//   HiOutlineSquare2Stack,
//   HiOutlineTrash
// } from 'react-icons/hi2';
// import useCreateCabin from './useCreateCabin.js';
// import Modal from '../../ui/Modal.jsx';
// import ConfirmDelete from '../../ui/ConfirmDelete.jsx';
// import Table from '../../ui/Table.jsx';
// import Menus from '../../ui/Menus.jsx';
//
// const Img = styled.img`
//   display: block;
//   width: 6.4rem;
//   aspect-ratio: 3 / 2;
//   object-fit: cover;
//   object-position: center;
//   transform: scale(1.5) translateX(-7px);
// `;
//
// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   font-family: 'Sono';
// `;
//
// const Price = styled.div`
//   font-family: 'Sono';
//   font-weight: 600;
// `;
//
// const Discount = styled.div`
//   font-family: 'Sono';
//   font-weight: 500;
//   color: var(--color-green-700);
// `;
//
// function CabinRow({ cabin }) {
//   const { deleteCabin, isDeleting } = useDeleteCabin();
//   const { createCabin, isCreating } = useCreateCabin();
//
//   const {
//     image,
//     regularPrice,
//     discount,
//     name,
//     maxCapacity,
//     description,
//     id: cabinId
//   } = cabin;
//
//   function handleDuplicate() {
//     createCabin({
//       name: `Copy of ${name}`,
//       discount,
//       regularPrice,
//       image,
//       maxCapacity,
//       description
//     });
//   }
//   return (
//     <Table.Row>
//       <Img src={image} />
//       <Cabin>{name}</Cabin>
//       <div>Fits up to {maxCapacity} guests</div>
//       <Price>{formatCurrency(regularPrice)}</Price>
//       {discount ? (
//         <Discount>{formatCurrency(discount)}</Discount>
//       ) : (
//         <span>&mdash;</span>
//       )}
//
//       <Row type="horizontal">
//         <Button $size="small" onClick={handleDuplicate} disabled={isCreating}>
//           <HiOutlineSquare2Stack size="20" color="white" />
//         </Button>
//
//         <Modal>
//           <Modal.Trigger modalName="edit-cabin-form">
//             <Button $variation="secondary" $size="small">
//               <HiOutlinePencil size="20" color="black" />
//             </Button>
//           </Modal.Trigger>
//           <Modal.Window modalName="edit-cabin-form">
//             <CreateCabinForm cabinToEdit={cabin} />
//           </Modal.Window>
//         </Modal>
//
//         <Modal>
//           <Modal.Trigger modalName="delete-cabin">
//             <Button $variation="danger" $size="small">
//               <HiOutlineTrash size="20" color="white" />
//             </Button>
//           </Modal.Trigger>
//           <Modal.Window modalName="delete-cabin">
//             <ConfirmDelete
//               onConfirm={() => deleteCabin(cabinId)}
//               resourceName={`<${cabin.name}>`}
//               disabled={isDeleting}
//             />
//           </Modal.Window>
//         </Modal>
//
//         <Menus.Menu>
//           <Menus.Toggle menusName={cabinId} />
//
//           <Menus.List menusName={cabinId}>
//             <Menus.Button
//               icon={<HiOutlineSquare2Stack color="var(--color-brand-600)" />}
//               onClick={handleDuplicate}
//             >
//               Duplicate
//             </Menus.Button>
//
//             <Menus.Button icon={<HiOutlinePencil />}>Edit</Menus.Button>
//
//             <Menus.Button
//               icon={<HiOutlineTrash color="var(--color-red-700)" />}
//             >
//               Delete
//             </Menus.Button>
//           </Menus.List>
//         </Menus.Menu>
//       </Row>
//     </Table.Row>
//   );
// }
//
// export default CabinRow;
