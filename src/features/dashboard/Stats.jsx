import { HiOutlineBanknotes, HiOutlineChartBar } from "react-icons/hi2";
import { FaRegHandshake } from "react-icons/fa";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";
import { IoFitnessOutline } from "react-icons/io5";
import { LuArrowUpLeftFromCircle } from "react-icons/lu";


function Stats({ shares, confirmedStays }) {
  // 1.
  const numShares = shares?.length;

  // // 2.
  const sales = shares?.reduce(
    (acc, cur) => acc + cur.stocks.perStockPrice * cur.numShare,
    0
  );

  const soldShares = shares?.reduce((acc, cur) => acc + cur.numShare, 0);

  const profit = confirmedStays?.filter(
    (stay) => stay.status === "in-profit"
  ).length;

  const success = (profit / numShares) * 100;

  return (
    <>
      <Stat
        title="New Investments"
        color="blue"
        icon={<FaRegHandshake />}
        value={numShares}
      />
      <Stat
        title="Sold Shares"
        color="indigo"
        icon={<LuArrowUpLeftFromCircle />}
        value={soldShares}
      />
      <Stat
        title="Sold Shares Value"
        color="green"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />
      <Stat
        title="+ Success rate"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={`${Math.round(success)}% - ${profit}`}
      />
    </>
  );
}

export default Stats;
