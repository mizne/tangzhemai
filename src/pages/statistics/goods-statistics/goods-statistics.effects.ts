import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { StatisticsService } from '../../../app/services/statistics.service'
import * as fromGoodsStatistics from './goods-statistics.action'
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
export class GoodsStatisticsEffects {
    @Effect()
    fetchGoodsStatisticsOfToday$: Observable<Action> = this.actions$
      .ofType(fromGoodsStatistics.FETCH_GOODS_STATISTICS_OF_TODAY)
      .switchMap(() => {
        return this.statisticsService
          .fetchGoodsStatisticsOfToday()
          .map((goodsStatistics) => {
            return new fromGoodsStatistics.LoadSuccessGoodsOfTodayAction(goodsStatistics)
          })
          .catch(() => Observable.of(new fromGoodsStatistics.LoadFailureGoodsOfTodayAction()))
      })

    @Effect()
    fetchGoodsStatisticsOfThisMonth$: Observable<Action> = this.actions$
      .ofType(fromGoodsStatistics.FETCH_GOODS_STATISTICS_OF_THIS_MONTH)
      .switchMap(() => {
        return this.statisticsService
          .fetchGoodsStatisticsOfThisMonth()
          .map((goodsStatistics) => {
            return new fromGoodsStatistics.LoadSuccessGoodsOfThisMonthAction(goodsStatistics)
          })
          .catch(() => Observable.of(new fromGoodsStatistics.LoadFailureGoodsOfThisMonthAction()))
      })

    @Effect()
    fetchGoodsStatisticsOfThisYear$: Observable<Action> = this.actions$
      .ofType(fromGoodsStatistics.FETCH_GOODS_STATISTICS_OF_THIS_YEAR)
      .switchMap(() => {
        return this.statisticsService
          .fetchGoodsStatisticsOfThisYear()
          .map((goodsStatistics) => {
            return new fromGoodsStatistics.LoadSuccessGoodsOfThisYearAction(goodsStatistics)
          })
          .catch(() => Observable.of(new fromGoodsStatistics.LoadFailureGoodsOfThisYearAction()))
      })

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
