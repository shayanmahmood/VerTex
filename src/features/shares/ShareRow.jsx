import styled from "styled-components";
import { format } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";

import { FaBitcoinSign } from "react-icons/fa6";
import { PiArrowCircleDownRightFill } from "react-icons/pi";
import { FaTrash } from "react-icons/fa";

import Menus from "../../ui/Menus";

import { HiEye } from "react-icons/hi";
import { BsSendCheck } from "react-icons/bs";

import { useNavigate } from "react-router-dom";
import { useLoss } from "../Check/hooks/useLoss";
import { useDelShare } from "../Check/hooks/useDelShare";

const Stock = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  /* font-family: "Sono"; */
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  font-size: 1.3rem;
`;

function ShareRow({
  shares: {
    id: shareId,
    created_at,
    startDate,
    total: totalPrice,
    isBroker,
    numDays,
    numShare,
    status,
    investors: { Name: InvestorName, Email },
    stocks: { stockName, perStockPrice },
  },
}) {
  const statusToTagName = {
    unconfirmed: "blue",
    "in-profit": "green",
    "in-loss": "silver",
  };

  const TodayDates = format(new Date(), "MMM dd yyyy");

  const navigate = useNavigate();
  const { loss, isLoss } = useLoss();
  const { delShare, isdelShare } = useDelShare();

  return (
    <Table.Row>
      <Stock>{stockName}</Stock>

      <Stacked>
        <span>{InvestorName}</span>
        <span>{Email}</span>
      </Stacked>

      <Stacked>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &rarr; {"Till Now"}
        </span>
        <span>
          {format(new Date(startDate), "MMM dd yyyy")} &mdash;
          {TodayDates}
        </span>
      </Stacked>

      <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

      <Amount>
        {formatCurrency(numShare * perStockPrice)}
        <span style={{ fontSize: "1.3rem" }}>
          <FaBitcoinSign />
        </span>
      </Amount>

      <Menus.Menu>
        <Menus.Toggle id={shareId} />
        <Menus.List id={shareId}>
          <Menus.Button
            onClick={() => navigate(`/shares/${shareId}`)}
            icon={<HiEye />}
          >
            See Details
          </Menus.Button>
          <Menus.Button onClick={() => delShare(shareId)} icon={<FaTrash />}>
            Delete Share
          </Menus.Button>
          {!(status === "in-profit") && (
            <Menus.Button
              onClick={() => navigate(`/check/${shareId}`)}
              icon={<BsSendCheck />}
            >
              Check Share
            </Menus.Button>
          )}
          {status === "in-profit" && (
            <Menus.Button
              onClick={() => loss(shareId)}
              icon={<PiArrowCircleDownRightFill />}
            >
              Making Loss
            </Menus.Button>
          )}
        </Menus.List>
      </Menus.Menu>
    </Table.Row>
  );
}

export default ShareRow;
