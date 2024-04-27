import styled from "styled-components";
import { useRecentShares } from "./hooks/useRecentShares";
import Spinner from "../../ui/Spinner";
import { useSharesStays } from "./hooks/useSharesStays";
import Stats from "./Stats";
import SalesChart from "./SalesChart";
import DurationChart from "./DurationChart";
import Today from "../Check/TodayActivity";

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`;

function DashboardLayout() {
  const { isLoading: isloading1, shares } = useRecentShares();
  const { isLoading: isloading2, confirmedStays, numDays } = useSharesStays();

  if (isloading1 || isloading2) <Spinner />;
  return (
    <StyledDashboardLayout>
      <Stats shares={shares} confirmedStays={confirmedStays} />
      <Today />
      <DurationChart confirmedStays={confirmedStays} isloading2={isloading2} />
      <SalesChart shares={shares} numDays={numDays} />
    </StyledDashboardLayout>
  );
}

export default DashboardLayout;
