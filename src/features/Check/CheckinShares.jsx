import styled from "styled-components";
import ShareDataBox from "../shares/SharesDataBox";

import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useShare } from "../shares/hook/useShare";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import Checkbox from "../../ui/Checkbox";
import { useEffect, useState } from "react";
import { useCheck } from "./hooks/useCheck";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/hooks/useSettings";
import { useLoss } from "./hooks/useLoss";
import { PiArrowCircleDownRightFill } from "react-icons/pi";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function CheckShares() {
  const [confirmed, setConfirmed] = useState(false);
  const [addMore, setaddMore] = useState(false);
  const { isLoading, share: { id, status } = {} } = useShare();
  const { share } = useShare();
  const { settings, isLoading: isSetting } = useSettings();

  useEffect(() => {
    if (!share?.status === "unconfirmed") {
      setConfirmed(true);
    }
  }, [share]);

  const moveBack = useMoveBack();
  const { checkin, isChecking } = useCheck();
  const { loss, isLoss } = useLoss();

  if (isLoading) {
    return <Spinner />;
  }

  const {
    id: ShareId,
    numShare,
    stocks: { perStockPrice },
  } = share;

  function handleCheckin() {
    if (addMore) {
      checkin({
        id,
        obj: {
          numShare: numShare + 10,
        },
      });
    } else {
      checkin({ id, obj: {} });
    }
  }

  const statusToTagName = {
    unconfirmed: "blue",
    "in-profit": "green",
    "in-loss": "silver",
  };

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Check Share</Heading>
          <Heading as="h1">Share #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <ShareDataBox share={share} />

      <Box>
        <Checkbox
          id="beaker"
          checked={addMore}
          onChange={() => {
            setaddMore((con) => !con);
          }}
          disabled={isChecking || isSetting}
        >
          I Want 10 More Shares with Security after total is
          <p style={{ fontSize: "1.3rem", marginLeft: "42px" }}>
            <span
              style={{ color: "var(--color-brand-500)", fontSize: "1.5rem" }}
            >
              {" "}
              {formatCurrency(
                (numShare + 10) * perStockPrice + settings.securityFee
              )}
            </span>
            {` (${numShare + 10} number of shares x ${formatCurrency(
              perStockPrice
            )} PerStock Price) + ${formatCurrency(
              settings.securityFee
            )} Security Fee`}
          </p>
        </Checkbox>
      </Box>

      <Box>
        <Checkbox
          id="checked"
          checked={confirmed}
          onChange={() => setConfirmed((con) => !con)}
          disabled={confirmed || isChecking}
        >
          I Confirm that He is making Some MOney
        </Checkbox>
      </Box>

      <ButtonGroup>
        <Button onClick={handleCheckin} disabled={!confirmed || isChecking}>
          Check in Share #{ShareId}
        </Button>

        {status === "in-profit" && (
          <Button
            onClick={() => loss(id)}
            icon={<PiArrowCircleDownRightFill />}
          >
            Making Loss
          </Button>
        )}
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckShares;
