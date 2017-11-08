import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/zip'
import 'rxjs/add/operator/switchMap'
import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { StatisticsService } from './statistics.service'
import {
  FETCH_ORDERS_STATISTICS_OF_TODAY,
  FetchOrdersStatisticsOfToday,
  LoadSuccessOrdersOfToday,
  FETCH_ORDERS_STATISTICS_OF_THIS_MONTH,
  FetchOrdersStatisticsOfThisMonth,
  LoadSuccessOrdersOfThisMonth,
  FETCH_ORDERS_STATISTICS_OF_THIS_YEAR,
  FetchOrdersStatisticsOfThisYear,
  LoadSuccessOrdersOfThisYear
} from './statistics.action'
import { StatisticsItem } from './models/statistics.model'

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */
@Injectable()
export class StatisticsEffects {
  @Effect()
  fetchOrderStatisticsOfToday$: Observable<Action> = this.actions$
    .ofType(FETCH_ORDERS_STATISTICS_OF_TODAY)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfToday()
        .map((statisticsItems: StatisticsItem[]) => {
          return new LoadSuccessOrdersOfToday(statisticsItems)
        })
        .catch(() => of(new LoadSuccessOrdersOfToday([])))
    })

  @Effect()
  fetchOrderStatisticsOfThisMonth$: Observable<Action> = this.actions$
    .ofType(FETCH_ORDERS_STATISTICS_OF_THIS_MONTH)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfThisMonth()
        .map((statisticsItems: StatisticsItem[]) => {
          return new LoadSuccessOrdersOfThisMonth(statisticsItems)
        })
        .catch(() => of(new LoadSuccessOrdersOfThisMonth([])))
    })

  @Effect()
  fetchOrderStatisticsOfThisYear$: Observable<Action> = this.actions$
    .ofType(FETCH_ORDERS_STATISTICS_OF_THIS_YEAR)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfThisYear()
        .map((statisticsItems: StatisticsItem[]) => {
          return new LoadSuccessOrdersOfThisYear(statisticsItems)
        })
        .catch(() => of(new LoadSuccessOrdersOfThisYear([])))
    })

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
