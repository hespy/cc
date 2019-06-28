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
});
