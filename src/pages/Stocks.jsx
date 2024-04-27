import StockTable from "../features/stocks/StockTable";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import AddStock from "../features/stocks/addStock";
import StockTableOperations from "../features/stocks/StockTableOperations";

function Stocks() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Stocks</Heading>
        <StockTableOperations />
      </Row>

      <Row>
        <StockTable />
        <AddStock />
      </Row>
    </>
  );
}

export default Stocks;
