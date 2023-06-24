export interface PoolsList {
  push(newDta: { value: string; label: string; img: string }): unknown;
  map(arg0: (item: any) => void): unknown;
  id: number;
  poolName: string;
  poolImage: string;
  shortDescription: string;
  longDescription: string;
  rebalanceInterval: number;
  volatilityBand: number;
  minimumInvestment: string;
  minimumSipInvestment: string;
  baseNav: string;
  nav: string;
  tvl: string;
  apr: number;
  totalNumberOfShares: number;
  underlyingAssetId: number;
  activeFund: boolean;
  cagr: {
    cagrValue: number;
    numberOfYears: number;
    isDefault: boolean;
  }[];
  underlyingAsset: {
    symbol: string;
  };
  percentChange: string;
}

export interface poolDropDown {
  value: string;
  label: string;
  img: string;
}
