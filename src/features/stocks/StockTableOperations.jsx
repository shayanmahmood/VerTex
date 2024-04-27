import TableOperations from "../../ui/TableOperations";
import Filter from "../../ui/Filter";
import SortBy from "../../ui/SortBy";

function StockTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="Available"
        options={[
          { value: "All", label: "All" },
          { value: "Available", label: "Available" },
          { value: "Not-Available", label: "Not Available" },
        ]}
      />
      <SortBy
        options={[
          {
            value: "stockName-asc",
            label: "Sort by name (A-Z)",
          },
          {
            value: "stockName-desc",
            label: "Sort by name (Z-A)",
          },
          {
            value: "perStockPrice-asc",
            label: "Sort by price (low first)",
          },
          {
            value: "perStockPrice-desc",
            label: "Sort by price (high first)",
          },
          {
            value: "MaxCapacity-asc",
            label: "Sort by capacity (low first)",
          },
          {
            value: "MaxCapacity-desc",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default StockTableOperations;
