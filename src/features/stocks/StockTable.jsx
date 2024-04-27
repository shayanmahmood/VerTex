import StocksRow from "./StocksRow";
import Spinner from "../../ui/Spinner";
import { useStocks } from "./hooks/useStocks";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useSearchParams } from "react-router-dom";
import Empty from "../../ui/Empty";

function StockTable() {
  const { isLoading, stocks } = useStocks();
  const [searchParams] = useSearchParams();

  if (!stocks?.length) return <Empty resource="Stocks" />;

  const filterValue = searchParams.get("Available") || "All";

  let filteredStock;
  if (filterValue === "All") {
    filteredStock = stocks;
  }
  if (filterValue === "Available") {
    filteredStock = stocks?.filter((stock) => stock.isAvailable > 0);
  }
  if (filterValue === "Not-Available") {
    filteredStock = stocks?.filter((stock) => stock.isAvailable <= 0);
  }

  const Sortby = searchParams.get("SortBy") || "stockName-asc";

  const [field, direction] = Sortby.split("-");
  const modifier = direction === "asc" ? 1 : -1;
  const sortedStock = filteredStock?.sort(
    (a, b) => (a[field] - b[field]) * modifier
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Menus>
      <Table columns="0.6fr 1.8fr 2.2fr 1fr 1fr 1fr 1fr">
        <Table.Header>
          <div></div>
          <div>Name</div>
          <div>PricePerStock</div>
          <div>Owner</div>
          <div>Capacity</div>
          <div>Available</div>
        </Table.Header>

        <Table.Body
          // data={stocks}
          // data={filteredStock}
          data={sortedStock}
          render={(stock) => <StocksRow stock={stock} key={stock.id} />}
        />
      </Table>

     
    </Menus>
  );
}

export default StockTable;
