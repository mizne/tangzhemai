import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { StatisticsService } from '../../../app/services/statistics.service'
import * as fromOrderStatistics from './order-statistics.action'
import { StatisticsItem } from '../models/statistics.model'

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
export class OrderStatisticsEffects {
  @Effect()
  fetchOrderStatisticsOfToday$: Observable<Action> = this.actions$
    .ofType(fromOrderStatistics.FETCH_ORDERS_STATISTICS_OF_TODAY)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfToday()
        .map((statisticsItems: StatisticsItem[]) => {
          return new fromOrderStatistics.LoadSuccessOrdersOfTodayAction(statisticsItems)
        })
        .catch(() => Observable.of(new fromOrderStatistics.LoadFailureOrdersOfTodayAction()))
    })

  @Effect()
  fetchOrderStatisticsOfThisMonth$: Observable<Action> = this.actions$
    .ofType(fromOrderStatistics.FETCH_ORDERS_STATISTICS_OF_THIS_MONTH)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfThisMonth()
        .map((statisticsItems: StatisticsItem[]) => {
          return new fromOrderStatistics.LoadSuccessOrdersOfThisMonthAction(statisticsItems)
        })
        .catch(() => Observable.of(new fromOrderStatistics.LoadFailureOrdersOfThisMonthAction()))
    })

  @Effect()
  fetchOrderStatisticsOfThisYear$: Observable<Action> = this.actions$
    .ofType(fromOrderStatistics.FETCH_ORDERS_STATISTICS_OF_THIS_YEAR)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfThisYear()
        .map((statisticsItems: StatisticsItem[]) => {
          return new fromOrderStatistics.LoadSuccessOrdersOfThisYearAction(statisticsItems)
        })
        .catch(() => Observable.of(new fromOrderStatistics.LoadFailureOrdersOfThisYearAction()))
    })
  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
