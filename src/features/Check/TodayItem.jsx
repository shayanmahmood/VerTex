import styled from "styled-components";
import { Flag } from "../../ui/Flag";
import { Link } from "react-router-dom";

import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import CheckoutButton from "./CheckoutButton";
import { formatCurrency } from "../../utils/helpers";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ activity }) {
  const { id, status, investors, numShare, stocks } = activity;

  return (
    <StyledTodayItem>
      {status === "in-profit" && <Tag type="green"> + Money &#8599;</Tag>}
      {status === "in-loss" && <Tag type="green"> - Loss &#8601; </Tag>}
      {status === "unconfirmed" && <Tag type="blue"> not Sure &ndash;</Tag>}

      <Flag src={investors.CountryFlag} alt={`Flag of ${investors.Country}`} />
      <Guest>{investors.Name}</Guest>
      <div>${stocks.perStockPrice * numShare}</div>

      {status && (
        <Button size="small" variation="primary" as={Link} to={`/shares/${id}`}>
          Check
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;
