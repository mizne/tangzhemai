import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { of } from 'rxjs/observable/of'

import { StatisticsService } from '../../app/services/statistics.service'
import {
  FETCH_TODAY_STATISTICS,
  FetchTodayStatisticsFailureAction,
  FetchTodayStatisticsSuccessAction
} from './home.action'

import { StatisticsItem } from '../statistics/models/statistics.model'

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
export class HomeEffects {
  @Effect()
  fetchOrderStatisticsOfToday$: Observable<Action> = this.actions$
    .ofType(FETCH_TODAY_STATISTICS)
    .switchMap(() => {
      return this.statisticsService
        .fetchOrderStatisticsOfToday()
        .map((statisticsItems: StatisticsItem[]) => {
          return new FetchTodayStatisticsSuccessAction(statisticsItems)
        })
        .catch(() => of(new FetchTodayStatisticsFailureAction()))
    })

  constructor(
    private actions$: Actions,
    private statisticsService: StatisticsService
  ) {}
}
