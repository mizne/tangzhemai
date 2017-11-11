import { Action } from '@ngrx/store'

import { Order } from './models/order.model'

export const FETCH_ORDERS = '[Order] Fetch Orders'
export const FETCH_ORDERS_SUCCESS = '[Order] Fetch Orders Success'
export const FETCH_ORDERS_FAILURE = '[Order] Fetch Orders Failure'



export class FetchOrdersAction implements Action {
  readonly type = FETCH_ORDERS
}
export class FetchOrdersSuccessAction implements Action {
  readonly type = FETCH_ORDERS_SUCCESS
  constructor(public orders: Order[]) {}
}
export class FetchOrdersFailureAction implements Action {
  readonly type = FETCH_ORDERS_FAILURE
}


export type Actions =
FetchOrdersAction |
FetchOrdersSuccessAction |
FetchOrdersFailureAction
