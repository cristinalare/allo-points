export interface LeaderboardItem {
  rank: number;
  address: string;
  ens: string;
  numberOfPoints: number;
  lastUpdated: string;
}

export enum LeaderboardFilter {
  THIS_WEEK = "current-week",
  LAST_WEEK = "last-week",
  ALL_TIME = "all-time",
}

export enum Role {
  DONOR = "donor",
  ROUND_OWNER = "round_owner",
  CONTRACT_DEPLOYER = "contract_deployer",
  GRANT_OWNER = "grant_owner",
}

export interface PointsBreakdownItem {
  address: string;
  ens: string;
  numberOfPoints: number;
  txHash: string;
  role: Role;
  timestamp: string;
}
