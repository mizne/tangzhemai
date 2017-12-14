import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'

import { MerchantInfoService } from '../services/merchant-info.service'
import { LocalService } from '../../../app/services/local.service'
import * as fromDelivery from './delivery.action'

import { MerchantInfo } from '../models/merchant-info.model'

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
export class DeliveryEffects {
  @Effect()
  fetchMerchantInfo$: Observable<Action> = this.actions$
    .ofType(fromDelivery.FETCH_MERCHANT_INFO)
    .switchMap(() => {
      return Observable.fromPromise(this.localService.getTenantId()).mergeMap(
        tenantId => {
          return this.merchantInfoService
            .fetchMerchantInfo(tenantId)
            .map(merchantInfo => {
              return new fromDelivery.FetchMerchantInfoSuccessAction(
                merchantInfo
              )
            })
            .catch(() =>
              Observable.of(new fromDelivery.FetchMerchantInfoFailureAction())
            )
        }
      )
    })

  @Effect()
  editDeliveryStartTime$: Observable<Action> = this.actions$
    .ofType(fromDelivery.EDIT_DELIVERY_START_TIME)
    .map((action: fromDelivery.EditDeliveryStartTimeAction) => action.startTime)
    .switchMap(startTime => {
      return Observable.fromPromise(this.localService.getTenantId()).mergeMap(
        tenantId => {
          return this.merchantInfoService
            .editMerchantInfo(tenantId, {
              deliveryStartTime: startTime
            })
            .map(() => {
              return new fromDelivery.EditDeliveryStartTimeSuccessAction(startTime)
            })
            .catch(() =>
              Observable.of(
                new fromDelivery.EditDeliveryStartTimeFailureAction()
              )
            )
        }
      )
    })

  @Effect()
  editDeliveryEndTime$: Observable<Action> = this.actions$
    .ofType(fromDelivery.EDIT_DELIVERY_END_TIME)
    .map((action: fromDelivery.EditDeliveryEndTimeAction) => action.endTime)
    .switchMap(endTime => {
      return Observable.fromPromise(this.localService.getTenantId()).mergeMap(
        tenantId => {
          return this.merchantInfoService
            .editMerchantInfo(tenantId, {
              deliveryEndTime: endTime
            })
            .map(() => {
              return new fromDelivery.EditDeliveryEndTimeSuccessAction(endTime)
            })
            .catch(() =>
              Observable.of(new fromDelivery.EditDeliveryEndTimeFailureAction())
            )
        }
      )
    })

  constructor(
    private actions$: Actions,
    private merchantInfoService: MerchantInfoService,
    private localService: LocalService
  ) {}
}
