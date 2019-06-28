import * as assert from 'assert';
import { Actions } from '@ngrx/effects';
import { of, throwError } from 'rxjs';
import { TestScheduler } from 'rxjs/testing';

import { LocalStorageService } from '../../../core/core.module';

import {
  ActionFoodHygieneRetrieve,
  ActionFoodHygieneRetrieveError,
  ActionFoodHygieneRetrieveSuccess
} from './food-hygiene.actions';
import { FoodHygieneEffects, FOOD_HYGIENE_KEY } from './food-hygiene.effects';
import { Stock } from './stock-market.model';
import { FoodHygieneService } from './food-hygiene.service';
import { Establishment } from './food-hygiene.model';

const searchName = 'raj kinara';

describe('FoodHygieneEffects', () => {
  let localStorage: jasmine.SpyObj<LocalStorageService>;
  let foodHygiene: jasmine.SpyObj<FoodHygieneService>;
  let scheduler;

  beforeEach(() => {
    localStorage = jasmine.createSpyObj('localStorageService', ['setItem']);
    foodHygiene = jasmine.createSpyObj('foodHygieneService', [
      'retrieveFoodHygiene'
    ]);
    scheduler = new TestScheduler((actual, expected) =>
      assert.deepStrictEqual(actual, expected)
    );
  });

  it('should emit ActionFoodHygieneRetrieveSuccess on success', done => {
    scheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const retrieveAction1 = new ActionFoodHygieneRetrieve({
        name: searchName
      });
      const retrieveAction2 = new ActionFoodHygieneRetrieve({
        name: searchName
      });
      const retrieveAction3 = new ActionFoodHygieneRetrieve({
        name: searchName
      });
      const establishments: Establishment[] = [
        {
          FHRSID: 966489,
          LocalAuthorityBusinessID: '751677',
          BusinessName: 'Raj Kinara',
          BusinessType: 'Restaurant/Cafe/Canteen',
          BusinessTypeID: 1,
          AddressLine1: 'Fontygary Holiday And Leisure Park',
          AddressLine2: '',
          AddressLine3: 'Rhoose',
          AddressLine4: 'Vale Of Glamorgan',
          PostCode: 'CF62 3ZT',
          Phone: '',
          RatingValue: '4',
          RatingKey: 'fhrs_4_en-gb',
          RatingDate: '2018-06-21T00:00:00',
          LocalAuthorityCode: '570',
          LocalAuthorityName: 'Vale of Glamorgan',
          LocalAuthorityWebSite: 'http://www.valeofglamorgan.gov.uk',
          LocalAuthorityEmailAddress: 'foodsafetyteam@valeofglamorgan.gov.uk',
          scores: { Hygiene: 10, Structural: 5, ConfidenceInManagement: 5 },
          SchemeType: 'FHRS',
          geocode: { longitude: '-3.365821', latitude: '51.384625' },
          RightToReply: '',
          Distance: null,
          NewRatingPending: false,
          meta: {
            dataSource: null,
            extractDate: '0001-01-01T00:00:00',
            itemCount: 0,
            returncode: null,
            totalCount: 0,
            totalPages: 0,
            pageSize: 0,
            pageNumber: 0
          },
          links: [
            {
              rel: 'self',
              href: 'http://api.ratings.food.gov.uk/establishments/966489'
            }
          ]
        }
      ];
      const successAction = new ActionFoodHygieneRetrieveSuccess({
        establishments: establishments
      });
      const values = {
        a: retrieveAction1,
        b: retrieveAction2,
        c: retrieveAction3,
        s: successAction
      };
      const source = cold('a--b--c', values);
      const expected = '--s--s--s';
      const actions = new Actions(source);

      foodHygiene.searchEstablishmentsByName.and.returnValue(
        of(establishments)
      );

      const effects = new FoodHygieneEffects(
        actions,
        localStorage,
        foodHygiene
      );

      expectObservable(
        effects.retrieveFoodHygiene({
          debounce: 2
        })
      ).toBe(expected, values);

      setTimeout(() => {
        expect(localStorage.setItem).toHaveBeenCalledTimes(3);
        expect(localStorage.setItem).toHaveBeenCalledWith(FOOD_HYGIENE_KEY, {
          name: searchName
        });
        done();
      });
    });
  });

  it('should emit ActionFoodHygieneRetrieveError on error', () => {
    scheduler.run(helpers => {
      const { cold, expectObservable } = helpers;
      const retrieveAction = new ActionFoodHygieneRetrieve({
        name: searchName
      });
      const error = 'ERROR';
      const errorAction = new ActionFoodHygieneRetrieveError({
        error
      } as any);
      const values = {
        a: retrieveAction,
        e: errorAction
      };
      const source = cold('--a', values);
      const expected = '--e';
      const actions = new Actions(source);

      foodHygiene.searchEstablishmentsByName.and.returnValue(throwError(error));

      const effects = new FoodHygieneEffects(
        actions,
        localStorage,
        foodHygiene
      );

      expectObservable(
        effects.retrieveFoodHygiene({
          debounce: 0
        })
      ).toBe(expected, values);
    });
  });
});
