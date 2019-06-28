import { Action } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';
import { Establishment } from './food-hygiene.model';

export enum FoodHygieneActionTypes {
  RETRIEVE = '[FoodHygiene] Retrieve',
  RETRIEVE_SUCCESS = '[FoodHygiene] Retrieve Success',
  RETRIEVE_ERROR = '[FoodHygiene] Retrieve Error'
}

export class ActionFoodHygieneRetrieve implements Action {
  readonly type = FoodHygieneActionTypes.RETRIEVE;

  constructor(readonly payload: { name: string }) {}
}

export class ActionFoodHygieneRetrieveSuccess implements Action {
  readonly type = FoodHygieneActionTypes.RETRIEVE_SUCCESS;

  constructor(readonly payload: { establishments: Establishment[] }) {}
}

export class ActionFoodHygieneRetrieveError implements Action {
  readonly type = FoodHygieneActionTypes.RETRIEVE_ERROR;

  constructor(readonly payload: { error: HttpErrorResponse }) {}
}

export type FoodHygieneActions =
  | ActionFoodHygieneRetrieve
  | ActionFoodHygieneRetrieveSuccess
  | ActionFoodHygieneRetrieveError;
