import { RootState } from '../index.types';
import { CounterState } from './counter.types';

// Selectors
export const selectCounterState = (state: RootState): CounterState =>
  state.counter;
