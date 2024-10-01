import { useEffect, useState } from "react";
import { LeaderboardFilter, LeaderboardItem } from "../types";
import { LEADERBOARD_PAGE_SIZE } from "../constants";

export const useLeaderboard = (leaderboardSelectedPage: number) => {
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
      const options = {
        method: "GET",
        headers: {
          "X-DUNE-API-KEY": process.env.NEXT_PUBLIC_DUNE_API_KEY ?? "",
        },
      };

      const queryParams = {
        time_range: selectedFilter,
        limit: LEADERBOARD_PAGE_SIZE.toString(),
        offset: offset.toString(),
      };
      const queryId = process.env.NEXT_PUBLIC_LEADERBOARD_API;
      const url = `https://api.dune.com/api/v1/query/${queryId}/results?${new URLSearchParams(
        queryParams
      ).toString()}`;

      const resp = await fetch(url, options);
      if (!resp.ok) {
        throw new Error(resp.statusText);
      }
      const results = await resp.json();

      console.log(results);

      const totalEntries = results?.result?.metadata?.total_row_count ?? 0;
      setLeaderboardTotalResults(totalEntries);

      setLeaderboardData(
        results?.result?.rows?.map((row: any) => ({
          rank: row.rank,
          address: row.address,
          ens: row.ens,
          numberOfPoints: row.total_points,
          lastUpdated: row.last_timestamp,
        })) ?? []
      );
    } catch (err) {
      console.log(err);
    } finally {
      setIsLeaderboardLoading(false);
    }
  }

  // useEffect(() => {
  //   // TODO: fetch data based on filter
  // }, [selectedFilter]);

  useEffect(() => {
    getLeaderboardData((leaderboardSelectedPage - 1) * LEADERBOARD_PAGE_SIZE);
  }, [leaderboardSelectedPage, selectedFilter]);

  return {
    isLeaderboardLoading,
    leaderboardTotalResults,
    leaderboardData,
    filters,
    selectedFilter,
    setSelectedFilter,
  };
};
