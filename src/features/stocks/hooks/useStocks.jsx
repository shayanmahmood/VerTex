import { useQuery } from "@tanstack/react-query";
import { getStocks } from "../../../services/apiStocks";

export function useStocks() {
    const {
        isLoading,
        data: stocks,
        // error,
    } = useQuery({
        queryKey: ["stocks"],
        queryFn: getStocks,
    });

    return { isLoading, stocks }
}

export default useStocks
