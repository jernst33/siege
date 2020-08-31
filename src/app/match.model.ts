import {Round} from './round.model';

export interface Match {
  user: string;
  map: string;
  result: 'win' | 'loss';
  rounds: Round[];
  kills?: number;
  deaths?: number;
  assists?: number;
  date: Date;
}
