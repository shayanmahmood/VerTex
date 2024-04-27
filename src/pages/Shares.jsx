import SharesTable from "../features/shares/SharesTable";
import ShareTableOperations from "../features/shares/shareTableOperations";
import Heading from "../ui/Heading";
import Row from "../ui/Row";

function Shares() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All Shares</Heading>
        <ShareTableOperations />
      </Row>

      <SharesTable />
    </>
  );
}

export default Shares;
