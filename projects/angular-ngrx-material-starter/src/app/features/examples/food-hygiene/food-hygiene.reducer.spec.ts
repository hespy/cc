import { HttpErrorResponse } from '@angular/common/http';
import { foodHygieneReducer, initialState } from './food-hygiene.reducer';
import {
  FoodHygieneActions,
  ActionFoodHygieneRetrieve,
  ActionFoodHygieneRetrieveError,
  ActionFoodHygieneRetrieveSuccess
} from './food-hygiene.actions';
import { FoodHygieneState, Establishment } from './food-hygiene.model';

const originalState: FoodHygieneState = {
  name: 'raj kinara',
  loading: false,
  establishments: [
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
  ]
};

describe('FoodHygieneReducer', () => {
  describe('undefined action', () => {
    describe('with undefined original state', () => {
      it('should return the initial state', () => {
        const action = {} as FoodHygieneActions;
        const state = foodHygieneReducer(undefined, action);

        expect(state).toBe(initialState);
      });
    });

    describe('with a valid original state', () => {
      it('should return the original state', () => {
        const action = {} as FoodHygieneActions;
        const state = foodHygieneReducer(originalState, action);

        expect(state).toBe(originalState);
      });
    });
  });

  describe('RETRIEVE action', () => {
    it('should reflect that it has started loading the provided symbol', () => {
      const action = new ActionFoodHygieneRetrieve({ name: 'AEONS' });
      const state = foodHygieneReducer(originalState, action);

      expect(state.loading).toBeTruthy();
      expect(state.establishments).toBeNull();
      expect(state.error).toBeNull();
      expect(state.name).toBe(action.payload.name);
    });
  });

  describe('RETRIEVE_ERROR action', () => {
    it('should reflect the Error that occured', () => {
      const error = new HttpErrorResponse({});
      const action = new ActionFoodHygieneRetrieveError({ error: error });
      const state = foodHygieneReducer(originalState, action);

      expect(state.name).toBe(state.name);
      expect(state.loading).toBeFalsy();
      expect(state.establishments).toBeNull();
      expect(state.error).toBe(error);
    });
  });

  describe('RETRIEVE_SUCCESS action', () => {
    it('should reflect the retrieved information', () => {
      const stock: Establishment[] = [
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
      const action = new ActionFoodHygieneRetrieveSuccess({
        establishments: stock
      });
      const state = foodHygieneReducer(originalState, action);

      expect(state.loading).toBeFalsy();
      expect(state.establishments).toBe(stock);
      expect(state.error).toBeNull();
      expect(state.name).toBe(state.name);
    });
  });
});
