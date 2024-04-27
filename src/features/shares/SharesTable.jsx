import BookingRow from "./ShareRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Empty from "../../ui/Empty";
import { useShares } from "./hook/useShares";
import Spinner from "../../ui/Spinner";
import Pagination from "../../ui/Pagination";

function SharesTable() {
  const { shares, isLoading, count } = useShares();

  if (isLoading) return <Spinner />;

  if (!shares?.length) return <Empty resource="Shares" />;

  return (
    <Menus>
      <Table columns="1fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Stock</div>
          <div>Investor</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={shares}
          render={(share) => <BookingRow key={share.id} shares={share} />}
        />
      </Table>

      <Table.Footer>
        <Pagination count={count} />
      </Table.Footer>
    </Menus>
  );
}

export default SharesTable;
