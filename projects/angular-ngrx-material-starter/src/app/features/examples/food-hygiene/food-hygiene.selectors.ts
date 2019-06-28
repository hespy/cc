import { createSelector } from '@ngrx/store';

import { ExamplesState, selectExamples } from '../examples.state';

export const selectFoodHygiene = createSelector(
  selectExamples,
  (state: ExamplesState) => state.establishments
);
