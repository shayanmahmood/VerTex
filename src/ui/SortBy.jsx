import { useSearchParams } from "react-router-dom";
import Select from "./Select";

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const curValue = searchParams.get("SortBy") || "";
  function handleChange(e) {
    searchParams.set("SortBy", e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select
      options={options}
      type="white"
      onChange={handleChange}
      value={curValue}
    />
  );
}

export default SortBy;
