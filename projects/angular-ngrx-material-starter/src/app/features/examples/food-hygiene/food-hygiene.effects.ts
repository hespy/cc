import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { asyncScheduler, of } from 'rxjs';
import { catchError, debounceTime, map, switchMap, tap } from 'rxjs/operators';

import { LocalStorageService } from '../../../core/core.module';

import {
  ActionFoodHygieneRetrieve,
  ActionFoodHygieneRetrieveError,
  ActionFoodHygieneRetrieveSuccess,
  FoodHygieneActionTypes
} from './food-hygiene.actions';
import { FoodHygieneService } from './food-hygiene.service';

export const FOOD_HYGIENE_KEY = 'FOOD_HYGIENE';

@Injectable()
export class FoodHygieneEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private service: FoodHygieneService
  ) {}

  @Effect()
  retrieveFoodHygiene = ({ debounce = 500 } = {}) =>
    this.actions$.pipe(
      ofType<ActionFoodHygieneRetrieve>(FoodHygieneActionTypes.RETRIEVE),
      tap(action =>
        this.localStorageService.setItem(FOOD_HYGIENE_KEY, {
          foodHygiene: action.payload.name
        })
      ),
      debounceTime(debounce),
      switchMap((action: ActionFoodHygieneRetrieve) =>
        this.service.searchEstablishmentsByName(action.payload.name).pipe(
          map(
            establishments =>
              new ActionFoodHygieneRetrieveSuccess({
                establishments: establishments
              })
          ),
          catchError(error => of(new ActionFoodHygieneRetrieveError({ error })))
        )
      )
    );
}
