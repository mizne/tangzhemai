import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromOrder from './order.action'
import { OrderService } from './order.service'

import { TenantService } from '../../app/services/tenant.service'

@Injectable()
export class OrderEffects {
  @Effect()
  fetchOrders$ = this.actions$
    .ofType(fromOrder.FETCH_ORDERS)
    .map((action: fromOrder.FetchOrdersAction) => action.payload)
    .switchMap(({ startTime, endTime }) => {
      // const load = this.loadCtrl.create({
      //   content: '获取订单中'
      // })
      // load.present()
      return Observable.fromPromise(
        this.tenantService.getTenantId()
      ).mergeMap(tenantId =>
        this.orderService
          .fetchOrders(tenantId, startTime, endTime)
          .map(goods => {
            // load.dismiss()
            return new fromOrder.FetchOrdersSuccessAction(goods)
          })
          .catch(() => {
            // load.dismiss()
            return Observable.of(new fromOrder.FetchOrdersFailureAction())
          })
      )
    })


  constructor(
    private actions$: Actions,
    private orderService: OrderService,
    private tenantService: TenantService,
  ) {}
}
