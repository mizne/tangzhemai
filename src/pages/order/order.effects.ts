import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromOrder from './order.action'
import { OrderService } from './order.service'

import { LocalService } from '../../app/services/local.service'

@Injectable()
export class OrderEffects {
  @Effect()
  fetchOrders$ = this.actions$
    .ofType(fromOrder.FETCH_ORDERS)
    .switchMap(() => {
      const load = this.loadCtrl.create({
        content: '获取订单中'
      })
      load.present()
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.orderService
          .fetchOrders(tenantId)
          .map(goods => {
            load.dismiss()
            return new fromOrder.FetchOrdersSuccessAction(goods)
          })
          .catch(e => {
            load.dismiss()
            return Observable.of(new fromOrder.FetchOrdersFailureAction())
          })
      )
    })

  
  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private localService: LocalService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) {}
}
