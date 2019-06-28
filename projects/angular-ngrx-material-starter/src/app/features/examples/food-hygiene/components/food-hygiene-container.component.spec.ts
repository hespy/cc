import { By } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { EMPTY } from 'rxjs';

import { SharedModule } from '../../../../shared/shared.module';

import { State } from '../../examples.state';
import { FoodHygieneService } from '../food-hygiene.service';
import { ActionFoodHygieneRetrieve } from '../food-hygiene.actions';
import { FoodHygieneContainerComponent } from './food-hygiene-container.component';
import { FoodHygieneState } from '../food-hygiene.model';

describe('StockMarketContainerComponent', () => {
  let retrieveStockSpy: jasmine.Spy;

  let component: FoodHygieneContainerComponent;
  let fixture: ComponentFixture<FoodHygieneContainerComponent>;
  let store: MockStore<State>;

  const getSpinner = () => fixture.debugElement.query(By.css('mat-spinner'));

  const getError = () => fixture.debugElement.query(By.css('.error-state'));

  const getStocks = () =>
    fixture.debugElement.query(By.css('mat-card mat-card-title'));

  const getInput = () => fixture.debugElement.query(By.css('input'));

  const getExchange = () =>
    fixture.debugElement.query(By.css('mat-card mat-card-content'));

  const getChange = () =>
    fixture.debugElement.query(By.css('mat-card mat-card-subtitle'));

  const getCaretUpDownItem = () =>
    fixture.debugElement.query(By.css('mat-card fa-icon[icon="caret-down"]'));

  describe('given component booted', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        imports: [
          SharedModule,
          NoopAnimationsModule,
          TranslateModule.forRoot()
        ],
        providers: [
          FoodHygieneService,
          provideMockStore({
            initialState: createState({ name: '', loading: true })
          })
        ],
        declarations: [FoodHygieneContainerComponent]
      }).compileComponents();

      const foodHygieneService = TestBed.get(FoodHygieneService);
      retrieveStockSpy = spyOn(
        foodHygieneService,
        'retrieveFoodHygiene'
      ).and.returnValue(EMPTY);

      store = TestBed.get(Store);
      fixture = TestBed.createComponent(FoodHygieneContainerComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    }));

    it('should be created', () => {
      expect(component).toBeTruthy();
    });

    describe('and input changed', () => {
      let dispatchSpy: jasmine.Spy;

      beforeEach(() => {
        dispatchSpy = spyOn(store, 'dispatch');
        getInput().triggerEventHandler('keyup', { target: { value: 'A' } });
        fixture.detectChanges();
      });

      it('should trigger dispatch with correct input', () => {
        expect(dispatchSpy).toHaveBeenCalledTimes(1);
        expect(dispatchSpy).toHaveBeenCalledWith(
          new ActionFoodHygieneRetrieve({ name: 'A' })
        );
        expect(true).toBeTruthy();
      });
    });

    describe('and stocks are loading', () => {
      beforeEach(() => {
        store.setState(createState({ name: 'moksh', loading: true }));
        fixture.detectChanges();
      });

      it('should show spinner', () => {
        expect(getSpinner()).toBeTruthy();
      });
    });

    describe('and stocks are not loading', () => {
      beforeEach(() => {
        store.setState(createState({ name: 'royal', loading: false }));
        fixture.detectChanges();
      });

      it('should not show spinner', () => {
        expect(getSpinner()).toBeFalsy();
      });
    });

    describe('and the error happened on stock retrieval', () => {
      beforeEach(() => {
        store.setState(
          createState({
            name: 'shahi',
            loading: false,
            error: new HttpErrorResponse({})
          })
        );
        fixture.detectChanges();
      });

      it('should show error', () => {
        expect(getError()).toBeTruthy();
      });
    });

    describe('and stock details are loaded', () => {
      const name = 'raj kinara';
      const exchange = 'TESTAQ';
      const change = '100';
      const changePercent = '11';

      beforeEach(() => {
        store.setState(
          createState({
            name,
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
                LocalAuthorityEmailAddress:
                  'foodsafetyteam@valeofglamorgan.gov.uk',
                scores: {
                  Hygiene: 10,
                  Structural: 5,
                  ConfidenceInManagement: 5
                },
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
          })
        );

        fixture.detectChanges();
      });

      it('should display the relevant caret item', () => {
        expect(getCaretUpDownItem()).toBeTruthy();
      });

      it('should display correct stock name, price, currency', () => {
        expect(getStocks().nativeElement.textContent.trim()).toEqual(`${name}`);
      });

      it('should display correct exchange', () => {
        expect(getExchange().nativeElement.textContent.trim()).toEqual(
          exchange
        );
      });

      it('should display correct change', () => {
        expect(getChange().nativeElement.textContent.trim()).toEqual(
          `${change} (${changePercent}%)`
        );
      });
    });
  });
});

function createState(foodHygieneState: FoodHygieneState) {
  return {
    examples: {
      establishments: foodHygieneState
    }
  } as State;
}
