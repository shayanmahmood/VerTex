import styled from "styled-components";

// import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { BsSendCheck } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useShare } from "./hook/useShare";
import ShareDataBox from "./SharesDataBox";
import Spinner from "../../ui/Spinner";
import { useDelShare } from "../Check/hooks/useDelShare";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function SharesDetails() {
  const navigate = useNavigate();
  const { isLoading, share: { id, status } = {} } = useShare();
  const { share } = useShare();
  const moveBack = useMoveBack();
  const { delShare, isdelShare } = useDelShare();

  if (isLoading) {
    return <Spinner />;
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
          <Heading as="h1">Share #{id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <ShareDataBox share={share} />

      <ButtonGroup>
        {status === "unconfirmed" && (
          <Button
            icon={<BsSendCheck />}
            onClick={() => navigate(`/check/${id}`)}
          >
            Check in Share
          </Button>
        )}

        <Button onClick={() => delShare(id)}>Delete the Share</Button>

        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default SharesDetails;
