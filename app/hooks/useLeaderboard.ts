import { useEffect, useState } from "react";
import { LeaderboardFilter, LeaderboardItem } from "../types";
import { DuneClient } from "@duneanalytics/client-sdk";
import { LEADERBOARD_PAGE_SIZE } from "../constants";

export const useLeaderboard = (leaderboardSelectedPage: number) => {
  const [leaderboardCurrentPage, setLeaderboardCurrentPage] = useState(
    leaderboardSelectedPage
  );
  const [leaderboardTotalResults, setLeaderboardTotalResults] =
    useState<number>(0);
  const [isLeaderboardLoading, setIsLeaderboardLoading] = useState(false);
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardItem[]>([]);

  const filters = [
    {
      value: LeaderboardFilter.THIS_WEEK,
      label: "This week",
    },
    {
      value: LeaderboardFilter.LAST_WEEK,
      label: "Last week",
    },
    {
      value: LeaderboardFilter.ALL_TIME,
      label: "All time",
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState<LeaderboardFilter>(
    LeaderboardFilter.THIS_WEEK
  );

  async function getLeaderboardData(offset: number) {
    setIsLeaderboardLoading(true);
    try {
      const client = new DuneClient(
        process.env.NEXT_PUBLIC_LEADERBOARD_API ?? ""
      );
      const results = await client.custom.getResults({
        handle: "gitcoin_dao",
        slug: "fake-allo-points-leaderboard",
        limit: LEADERBOARD_PAGE_SIZE,
        offset,
      });

      const totalEntries = results?.result?.metadata?.total_row_count ?? 0;
      setLeaderboardTotalResults(totalEntries);

      setLeaderboardData(
        results?.result?.rows?.map((row: any) => ({
          rank: row.rank,
          address: row.address,
          ens: row.ens,
          numberOfPoints: row.number_of_points,
          lastUpdated: row.last_updated,
        })) ?? []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLeaderboardLoading(false);
    }
  }

  useEffect(() => {
    // TODO: fetch data based on filter
  }, [selectedFilter]);

  useEffect(() => {
    getLeaderboardData((leaderboardCurrentPage - 1) * LEADERBOARD_PAGE_SIZE);
  }, [leaderboardCurrentPage]);

  return {
    isLeaderboardLoading,
    leaderboardCurrentPage,
    leaderboardTotalResults,
    leaderboardData,
    filters,
    selectedFilter,
    setSelectedFilter,
  };
};
