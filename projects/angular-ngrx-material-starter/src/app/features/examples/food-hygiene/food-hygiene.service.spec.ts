import { TestBed, inject } from '@angular/core/testing';

import { FoodHygieneService } from './food-hygiene.service';

describe('FoodHygieneService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FoodHygieneService]
    });
  });

  it('should be created', inject(
    [FoodHygieneService],
    (service: FoodHygieneService) => {
      expect(service).toBeTruthy();
    }
  ));

  it('should return expected result', inject(
    [FoodHygieneService],
    (service: FoodHygieneService) => {
      const expectedStock: any = {
        symbol: 'TSLA',
        primaryExchange: 'Nasdaq',
        latestPrice: '124',
        change: '1',
        changePercent: '0.81'
      };

      service.searchEstablishmentsByName('TSLA').subscribe(stock => {
        expect(stock.symbol).toBe(expectedStock.symbol);
        expect(stock.exchange).toBe(expectedStock.primaryExchange);
        expect(stock.changePercent).toBe(expectedStock.changePercent);
        expect(stock.last).toBe(expectedStock.latestPrice);
      }, fail);
    }
  ));
});
