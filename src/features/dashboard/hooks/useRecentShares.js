import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getSharesAfterDate } from "../../../services/apiShares";

export function useRecentShares() {
    const [searchParams] = useSearchParams()
    const numDays = !searchParams.get("last") ? 7 : Number(searchParams.get("last"))
    const queryDate = subDays(new Date(), numDays).toISOString()

    const { isLoading, data: shares } = useQuery({
        queryFn: () => getSharesAfterDate(queryDate),
        queryKey: ['shares', `last-${numDays}`]
    })

    return { isLoading, shares }
}