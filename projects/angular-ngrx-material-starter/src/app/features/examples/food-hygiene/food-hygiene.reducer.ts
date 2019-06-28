import {
  FoodHygieneActions,
  FoodHygieneActionTypes
} from './food-hygiene.actions';
import { FoodHygieneState } from './food-hygiene.model';

export const initialState: FoodHygieneState = {
  name: '',
  loading: false
};

export function foodHygieneReducer(
  state: FoodHygieneState = initialState,
  action: FoodHygieneActions
): FoodHygieneState {
  switch (action.type) {
    case FoodHygieneActionTypes.RETRIEVE:
      return {
        ...state,
        loading: true,
        establishments: null,
        error: null,
        name: action.payload.name
      };

    case FoodHygieneActionTypes.RETRIEVE_SUCCESS:
      return {
        ...state,
        loading: false,
        establishments: action.payload.establishments,
        error: null
      };

    case FoodHygieneActionTypes.RETRIEVE_ERROR:
      return {
        ...state,
        loading: false,
        establishments: null,
        error: action.payload.error
      };

    default:
      return state;
  }
}
