export interface ITable {
  id: number;
  name: string;
  dimension: string;
}

export enum LoadingStatus {
  pending,
  fulfilled,
}
