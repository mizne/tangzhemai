import { Action } from '@ngrx/store'

import { SalesOrder } from './models/salesorder.model'
import { Order } from '../order/models/order.model'

export const FETCH_SALESORDER = '[SalesOrder] Fetch SalesOrders'
export const FETCH_SALESORDER_SUCCESS = '[SalesOrder] Fetch SalesOrders Success'
export const FETCH_SALESORDER_FAILURE = '[SalesOrder] Fetch SalesOrders Failure'



export class FetchSalesOrderAction implements Action {
  readonly type = FETCH_SALESORDER
}
export class FetchSalesOrderSuccessAction implements Action {
  readonly type = FETCH_SALESORDER_SUCCESS
  constructor(public salesOrders: Order[]) {}
}
export class FetchSalesOrderFailureAction implements Action {
  readonly type = FETCH_SALESORDER_FAILURE
}


export type Actions =
FetchSalesOrderAction |
FetchSalesOrderSuccessAction |
FetchSalesOrderFailureAction
