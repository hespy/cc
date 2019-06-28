import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { take } from 'rxjs/operators';

import { ROUTE_ANIMATIONS_ELEMENTS } from '../../../../core/core.module';

import { selectFoodHygiene } from '../food-hygiene.selectors';
import { ActionFoodHygieneRetrieve } from '../food-hygiene.actions';
import { State } from '../../examples.state';
import { FoodHygieneState } from '../food-hygiene.model';

@Component({
  selector: 'cc-food-hygiene',
  templateUrl: './food-hygiene-container.component.html',
  styleUrls: ['./food-hygiene-container.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FoodHygieneContainerComponent implements OnInit {
  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  establishments$: Observable<FoodHygieneState>;

  constructor(public store: Store<State>) {}

  ngOnInit() {
    this.establishments$ = this.store.pipe(select(selectFoodHygiene));
    this.establishments$
      .pipe(take(1))
      .subscribe(establishments => this.onSymbolChange(establishments.name));
  }

  onSymbolChange(search: string) {
    this.store.dispatch(new ActionFoodHygieneRetrieve({ name: search }));
  }
}
