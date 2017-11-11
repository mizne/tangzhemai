import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromSalesOrder from './salesorder-management.action'
import { SalesOrderService } from './salesorder.service'

import { LocalService } from '../../app/services/local.service'

@Injectable()
export class SalesOrderEffects {
  @Effect()
  fetchSalesOrders$ = this.actions$
    .ofType(fromSalesOrder.FETCH_SALESORDER)
    .switchMap(() => {
      const load = this.loadCtrl.create({
        content: '获取销售订单中'
      })
      load.present()
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.salesOrderService
          .fetchSalesOrders(tenantId)
          .map(salesOrders => {
            load.dismiss()
            return new fromSalesOrder.FetchSalesOrderSuccessAction(salesOrders)
          })
          .catch(e => {
            load.dismiss()
            return Observable.of(new fromSalesOrder.FetchSalesOrderFailureAction())
          })
      )
    })

  
  constructor(
    private actions$: Actions,
    private salesOrderService: SalesOrderService,
    private localService: LocalService,
    private toastCtrl: ToastController,
    private loadCtrl: LoadingController
  ) {}
}
