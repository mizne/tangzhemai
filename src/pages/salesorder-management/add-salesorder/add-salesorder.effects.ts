import { ToastController, LoadingController } from 'ionic-angular'

import { Injectable } from '@angular/core'
import { Effect, Actions } from '@ngrx/effects'
import { Observable } from 'rxjs/Observable'

import * as fromAddSalesOrder from './add-salesorder.action'
import * as fromSalesOrderManagement from '../salesorder-management.action'

import { LocalService } from '../../../app/services/local.service'
import { SalesOrderService } from '../salesorder.service'
import { StockService } from '../../purchase-management/services/stock.service'

@Injectable()
export class AddSalesOrderEffects {
  @Effect()
  fetchStocks$ = this.actions$
    .ofType(fromAddSalesOrder.FETCH_STOCKS)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.stockService
          .fetchStocks(tenantId)
          .map(stocks => {
            return new fromAddSalesOrder.FetchStocksSuccessAction(stocks)
          })
          .catch(e => {
            return Observable.of(
              new fromAddSalesOrder.FetchStocksFailureAction()
            )
          })
      )
    })

  @Effect()
  fetchSalers$ = this.actions$
    .ofType(fromAddSalesOrder.FETCH_SALER)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.salesOrderService
          .fetchSalers(tenantId)
          .map(salers => {
            return new fromAddSalesOrder.FetchSalerSuccessAction(salers)
          })
          .catch(e => {
            return Observable.of(
              new fromAddSalesOrder.FetchSalerFailureAction()
            )
          })
      )
    })

  @Effect()
  fetchAccounts$ = this.actions$
    .ofType(fromAddSalesOrder.FETCH_ACCOUNT)
    .switchMap(() => {
      return Observable.fromPromise(
        this.localService.getTenantId()
      ).mergeMap(tenantId =>
        this.salesOrderService
          .fetchAccounts(tenantId)
          .map(accounts => {
            return new fromAddSalesOrder.FetchAccountSuccessAction(accounts)
          })
          .catch(e => {
            return Observable.of(
              new fromAddSalesOrder.FetchAccountFailureAction()
            )
          })
      )
    })

  @Effect()
  // addSalesOrder$ = this.actions$
  //   .ofType(fromAddSalesOrder.ADD_SALESORDER)
  //   .map((action: fromAddSalesOrder.AddSalesOrderAction) => action.salesOrder)
  //   .switchMap(salesOrder => {
  //     return Observable.fromPromise(
  //       this.localService.getTenantId()
  //     ).mergeMap(tenantId =>
  //       this.salesOrderService
  //         .addSalesOrder(tenantId, salesOrder)
  //         .concatMap(() => {
  //           return [
  //             new fromAddSalesOrder.AddSalesOrderSuccessAction(
  //               salesOrder.uuid
  //             ),
  //             new fromSalesOrderManagement.FetchSalesOrderAction()
  //           ]
  //         })
  //         .catch(e => {
  //           return Observable.of(
  //             new fromAddSalesOrder.AddSalesOrderFailureAction()
  //           )
  //         })
  //     )
  //   })

  @Effect({ dispatch: false })
  addSalesOrderSuccess$ = this.actions$
    .ofType(fromAddSalesOrder.ADD_SALESORDER_SUCCESS)
    .do(() => {
      this.toastCtrl
        .create({
          message: '恭喜您 新增销售单成功！',
          position: 'top',
          duration: 3e3
        })
        .present()
    })

  @Effect({ dispatch: false })
  addSalesOrderFailure$ = this.actions$
    .ofType(fromAddSalesOrder.ADD_SALESORDER_FAILURE)
    .do(() => {
      this.toastCtrl
        .create({
          message: '新增销售单失败！',
          position: 'top',
          duration: 3e3
        })
        .present()
    })

  constructor(
    private actions$: Actions,
    private salesOrderService: SalesOrderService,
    private localService: LocalService,
    private stockService: StockService,
    private toastCtrl: ToastController
  ) {}
}
