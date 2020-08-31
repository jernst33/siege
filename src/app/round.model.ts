export interface Round {
  user: string;
  match: string;
  map: string;
  site: string;
  role: 'attack' | 'defense';
  operator: string;
  kills: number;
  assists: number;
  deaths: number;
  result: 'win' | 'loss' | 'draw';
}
