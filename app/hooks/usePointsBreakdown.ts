import { useState } from "react";
import { PointsBreakdownItem } from "../types";
import { POINTS_BREAKDOWN_PAGE_SIZE } from "../constants";
import { CustomAPIParams, DuneClient } from "@duneanalytics/client-sdk";
import { isAddress } from "viem";

export const usePointsBreakdown = (currentPage: number, address?: string) => {
  const [pointsBreakdownCurrentPage, setPointsBreakdownCurrentPage] =
    useState(currentPage);
  const [isLoading, setIsLoading] = useState(false);
  const [pointsBreakdown, setPointsBreakdown] = useState<PointsBreakdownItem[]>(
    []
  );
  const [totalResults, setTotalResults] = useState<number>();

  const getPointBreakdownByAddress = async (address: string) => {
    setIsLoading(true);

    try {
      const offset =
        (pointsBreakdownCurrentPage - 1) * POINTS_BREAKDOWN_PAGE_SIZE;
      let apiParams: CustomAPIParams = {
        handle: "gitcoin_dao",
        slug: "fake-allo-points-events",
        limit: POINTS_BREAKDOWN_PAGE_SIZE,
        offset,
      };
      if (isAddress(address))
        apiParams = { ...apiParams, filters: `address =  '${address}'` };
      else apiParams = { ...apiParams, filters: `ens = '${address}'` };

      const client = new DuneClient(
        process.env.NEXT_PUBLIC_POINTS_EVENTS_API ?? ""
      );
      const results = await client.custom.getResults(apiParams);
      const data = results.result?.rows?.map((entry: any) => ({
        address: entry.address,
        ens: entry.ens,
        numberOfPoints: entry.number_of_points,
        txHash: entry.tx_hash,
        role: entry.role,
        timestamp: entry.tx_timestamp,
      }));
      const totalEntries = results?.result?.metadata?.total_row_count ?? 0;
      setTotalResults(totalEntries);
      setPointsBreakdown(data ?? []);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    getPointBreakdownByAddress,
    isLoading,
    pointsBreakdown,
    totalResults,
    pointsBreakdownCurrentPage,
  };
};
