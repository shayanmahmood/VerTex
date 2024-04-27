import styled from "styled-components";
import { format, intervalToDuration, isToday } from "date-fns";
import {
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineCurrencyDollar,
  HiOutlineHomeModern,
} from "react-icons/hi2";

import { FaPagelines } from "react-icons/fa";
import { PiEggCrackBold } from "react-icons/pi";
import { HiMiniArrowTrendingUp } from "react-icons/hi2";
import { IoIosTrendingDown } from "react-icons/io";
import { BiConfused } from "react-icons/bi";
import { GiBossKey } from "react-icons/gi";

import DataItem from "../../ui/DataItem";
import { Flag } from "../../ui/Flag";

import { formatDistanceFromNow, formatCurrency } from "../../utils/helpers";

const StyledBookingDataBox = styled.section`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  overflow: hidden;
`;

const Header = styled.header`
  background-color: var(--color-brand-500);
  padding: 2rem 4rem;
  color: #e0e7ff;
  font-size: 1.8rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: space-between;

  svg {
    height: 3.2rem;
    width: 3.2rem;
  }

  & div:first-child {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    font-weight: 600;
    font-size: 1.8rem;
  }

  & span {
    font-family: "Sono";
    font-size: 2rem;
    margin-left: 4px;
  }
`;

const Section = styled.section`
  padding: 3.2rem 4rem 1.2rem;
`;

const Guest = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.6rem;
  color: var(--color-grey-500);

  & p:first-of-type {
    font-weight: 500;
    color: var(--color-grey-700);
  }
`;

const Price = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1.6rem 3.2rem;
  border-radius: var(--border-radius-sm);
  margin-top: 2.4rem;

  background-color: ${(props) =>
    props.isPaid ? "var(--color-green-100)" : "var(--color-yellow-100)"};
  color: ${(props) =>
    props.isPaid ? "var(--color-green-700)" : "var(--color-yellow-700)"};

  & p:last-child {
    text-transform: uppercase;
    font-size: 1.4rem;
    font-weight: 600;
  }

  svg {
    height: 2.4rem;
    width: 2.4rem;
    color: currentColor !important;
  }
`;

const Footer = styled.footer`
  padding: 1.6rem 4rem;
  font-size: 1.2rem;
  color: var(--color-grey-500);
  text-align: right;
`;

// A purely presentational component
function ShareDataBox({ share }) {
  const {
    created_at,
    startDate,
    monitoring: observations,
    isBroker,
    numShare,
    status,
    investors: { Name: investorName, Email, Country, CountryFlag, NationId },
    stocks: { name: cabinName, perStockPrice, demand },
  } = share;

  function getMonthIndex(monthName) {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    const index = months.indexOf(monthName);
    return index !== -1 ? index : null;
  }

  function get(startDate) {
    const start = format(new Date(startDate), "EEE, MMM dd yyyy").split(" ");
    const end = format(new Date(), "EEE, MMM dd yyyy").split(" ");
    let [day, month, date, year] = start;
    let [dayE, monthE, dateE, yearE] = end;

    month = getMonthIndex(month);
    monthE = getMonthIndex(monthE);

    const { days } = intervalToDuration({
      start: new Date(Number(year), month, Number(date)),
      end: new Date(Number(yearE), monthE, Number(dateE)),
    });

    return days;
  }

  return (
    <StyledBookingDataBox>
      <Header>
        <div>
          <HiOutlineHomeModern />
          <p>
            They Bought this share {get(startDate)} days ago
            <span>{cabinName}</span>
          </p>
        </div>

        <p>
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &rarr; {`Till Today (${format(new Date(), "EEE, MMM dd yyyy")})`}
        </p>
      </Header>

      <Section>
        <Guest>
          {CountryFlag && <Flag src={CountryFlag} alt={`Flag of ${Country}`} />}
          <p>
            {investorName} from {Country}
          </p>
          <span>&bull;</span>
          <p>{Email}</p>
          <span>&bull;</span>
          <p>National ID {NationId}</p>
        </Guest>

        {observations && (
          <DataItem
            icon={<HiOutlineChatBubbleBottomCenterText />}
            label="Observations"
          >
            {observations}
          </DataItem>
        )}

        <DataItem icon={<PiEggCrackBold />} label="Borker included?">
          {isBroker ? "Yes" : "No"}
        </DataItem>

        <DataItem icon={<FaPagelines />} label="Demand:">
          {demand}
        </DataItem>

        <DataItem icon={<GiBossKey />} label="Owners of Shares of Company:">
          {numShare} Shares
        </DataItem>

        <Price isPaid={status === "in-profit"}>
          <DataItem icon={<HiOutlineCurrencyDollar />} label={`Total Worth`}>
            {formatCurrency(numShare * perStockPrice)}

            {` (${numShare} number of shares x ${formatCurrency(
              perStockPrice
            )} PerStock Price)`}
            <p style={{ color: "var(--color-brand-500)", price: "1.5rem" }}>
              {isBroker &&
                " +" + (2 / 100) * numShare * perStockPrice + " Broker Fee"}
            </p>
          </DataItem>

          {status === "in-profit" && (
            <DataItem icon={<HiMiniArrowTrendingUp />} />
          )}
          {status === "in-loss" && <DataItem icon={<IoIosTrendingDown />} />}
          {status === "unconfirmed" && <DataItem icon={<BiConfused />} />}
        </Price>
      </Section>

      <Footer>
        <p>
          Registered in Market {"(Vertex)"}{" "}
          {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
        </p>
      </Footer>
    </StyledBookingDataBox>
  );
}

export default ShareDataBox;
