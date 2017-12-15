import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Action } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { ToastController } from 'ionic-angular'

import { MerchantInfoService } from '../services/merchant-info.service'
import { LocalService } from '../../../app/services/local.service'
import * as fromDelivery from './delivery.action'

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
              return new fromDelivery.EditDeliveryStartTimeSuccessAction(
                startTime
              )
            })
            .catch(() =>
              Observable.of(
                new fromDelivery.EditDeliveryStartTimeFailureAction()
              )
            )
        }
      )
    })

  @Effect({ dispatch: false })
  editDeliveryStartTimeSuccess$ = this.actions$
    .ofType(fromDelivery.EDIT_DELIVERY_START_TIME_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: '设置开始时间成功',
          duration: 3e3,
          position: 'top'
        })
        .present()
    })

  @Effect({ dispatch: false })
  editDeliveryStartTimeFailure$ = this.actions$
    .ofType(fromDelivery.EDIT_DELIVERY_START_TIME_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: '设置开始时间失败',
          duration: 3e3,
          position: 'top'
        })
        .present()
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

  @Effect({ dispatch: false })
  editDeliveryEndTimeSuccess$ = this.actions$
    .ofType(fromDelivery.EDIT_DELIVERY_END_TIME_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: '设置结束时间成功',
          duration: 3e3,
          position: 'top'
        })
        .present()
    })

  @Effect({ dispatch: false })
  editDeliveryEndTimeFailure$ = this.actions$
    .ofType(fromDelivery.EDIT_DELIVERY_END_TIME_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: '设置结束时间失败',
          duration: 3e3,
          position: 'top'
        })
        .present()
    })

  constructor(
    private actions$: Actions,
    private merchantInfoService: MerchantInfoService,
    private localService: LocalService,
    private toastCtrl: ToastController
  ) {}
}
