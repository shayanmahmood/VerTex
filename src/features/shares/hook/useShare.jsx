import { useQuery } from "@tanstack/react-query";
import { getShare } from "../../../services/apiShares";
import { useParams } from "react-router-dom";

export function useShare() {
  const { shareId } = useParams();
  const {
    isLoading,
    data: share,
    error: shareError,
  } = useQuery({
    queryKey: ["share"],
    queryFn: () => getShare(shareId),
    retry: false,
  });

  return { isLoading, share, shareError };
}
