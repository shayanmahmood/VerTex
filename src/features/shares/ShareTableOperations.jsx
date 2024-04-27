import SortBy from "../../ui/SortBy";
import Filter from "../../ui/Filter";
import TableOperations from "../../ui/TableOperations";

function ShareTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="status"
        options={[
          { value: "All", label: "All" },
          { value: "in-profit", label: "IN-PROFIT" },
          { value: "unconfirmed", label: "UNCONFIRMED" },
          { value: "in-loss", label: "IN-LOSS" },
        ]}
      />

      <SortBy
        options={[
          { value: "startDate-desc", label: "Sort by date (recent first)" },
          { value: "startDate-asc", label: "Sort by date (earlier first)" },
          {
            value: "numShare-desc",
            label: "Sort by number of shares (high first)",
          },
          {
            value: "numShare-asc",
            label: "Sort by number of shares (low first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default ShareTableOperations;
