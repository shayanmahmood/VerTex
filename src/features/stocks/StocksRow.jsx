import styled from "styled-components";

import CreateCabinForm from "./CreateStockTable";

import { formatCurrency } from "../../utils/helpers";
import { useDeleteStock } from "./hooks/useDeleteStock";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";

import { useCreateStock } from "./hooks/useCreateStock";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 2.8rem;
  /* aspect-ratio: 3 / 2; */
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const ImgGrey = styled.img`
  display: block;
  width: 2.8rem;
  /* aspect-ratio: 3 / 2; */
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
  filter: grayscale();
`;

const Stock = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

const Available = styled.div`
  font-weight: 500;
  color: var(--color-green-700);
`;

const NotAvailable = styled.div`
  font-weight: 500;
  color: var(--color-red-700);
`;

function StocksRow({ stock }) {
  const { addStock } = useCreateStock();
  const {
    stockName,
    image,
    description,
    perStockPrice,
    owner,
    id,
    isAvailable,
    MaxCapacity,
  } = stock;

  function handleDublicate() {
    addStock({
      stockName: `Copy of ${stockName}`,
      image,
      description,
      perStockPrice,
      owner,
    });
  }

  const { deleteStock, isDeleting } = useDeleteStock();

  return (
    <Table.Row>
      {isAvailable ? <Img src={image} /> : <ImgGrey src={image} />}
      <Stock>{stockName}</Stock>
      <Discount>{formatCurrency(perStockPrice)}</Discount>
      <Stock>{owner}</Stock>
      <Stock>{MaxCapacity}</Stock>
      <div className="">
        {isAvailable ? (
          <Available>Available</Available>
        ) : (
          <NotAvailable>Not Available</NotAvailable>
        )}
      </div>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={id} />
            <Menus.List id={id}>
              <Menus.Button
                icon={<HiSquare2Stack />}
                onClick={() => handleDublicate()}
              >
                Dublicate
              </Menus.Button>

              <Modal.Open opens="edit-stock">
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name="edit-stock">
              <CreateCabinForm stockToEdit={stock} />
            </Modal.Window>

            <Modal.Window name="delete">
              <ConfirmDelete
                resourceName="Stock"
                onConfirm={() => deleteStock(id)}
                disabled={isDeleting}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default StocksRow;
