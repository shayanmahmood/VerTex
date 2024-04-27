import CreateCabinForm from "./CreateStockTable";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";

function AddStock() {
  return (
    <Modal>
      <Modal.Open opens="stock">
          <Button>Add New Stock</Button>
      </Modal.Open>
      <Modal.Window name="stock">
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddStock;
