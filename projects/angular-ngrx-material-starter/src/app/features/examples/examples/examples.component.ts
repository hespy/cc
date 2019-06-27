import { Store, select } from '@ngrx/store';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';

import {
  routeAnimations,
  selectIsAuthenticated
} from '../../../core/core.module';

import { State } from '../examples.state';

@Component({
  selector: 'cc-examples',
  templateUrl: './examples.component.html',
  styleUrls: ['./examples.component.scss'],
  animations: [routeAnimations],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExamplesComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  examples = [
    { link: 'todos', label: 'cc.examples.menu.todos' },
    { link: 'stock-market', label: 'cc.examples.menu.stocks' },
    { link: 'theming', label: 'cc.examples.menu.theming' },
    { link: 'crud', label: 'cc.examples.menu.crud' },
    {
      link: 'simple-state-management',
      label: 'cc.examples.menu.simple-state-management'
    },
    { link: 'form', label: 'cc.examples.menu.form' },
    { link: 'notifications', label: 'cc.examples.menu.notifications' },
    { link: 'authenticated', label: 'cc.examples.menu.auth', auth: true }
  ];

  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.pipe(select(selectIsAuthenticated));
  }
}
