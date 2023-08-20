import Button from '../../ui/Button.jsx';
import CreateCabinForm from './CreateCabinForm.jsx';
import Modal from '../../ui/Modal.jsx';
import CabinTable from './CabinTable.jsx';

function AddCabin() {
  return (
    <div>
      <Modal>
        <Modal.Trigger modalName="cabin-form">
          <Button>Add new cabin</Button>
        </Modal.Trigger>
        <Modal.Window modalName="cabin-form">
          <CreateCabinForm />
        </Modal.Window>
      </Modal>
    </div>
  );
}

export default AddCabin;
