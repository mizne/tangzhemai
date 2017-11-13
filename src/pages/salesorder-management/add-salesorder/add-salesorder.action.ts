import { Action } from '@ngrx/store'

import { SalesOrder } from '../models/salesorder.model'
import { Stock } from '../../purchase-management/models/stock.model'
import { Saler } from '../models/saler.model'
import { Account } from '../models/account.model'

export const FETCH_STOCKS = '[SalesOrder] Fetch Stocks'
export const FETCH_STOCKS_SUCCESS = '[SalesOrder] Fetch Stocks Success'
export const FETCH_STOCKS_FAILURE = '[SalesOrder] Fetch Stocks Failure'

export const ADD_SALESORDER = '[SalesOrder] Add Sales Order'
export const ADD_SALESORDER_SUCCESS = '[SalesOrder] Add Sales Order Success'
export const ADD_SALESORDER_FAILURE = '[SalesOrder] Add Sales Order Failure'

export const FETCH_SALER = '[SalesOrder] Fetch Saler'
export const FETCH_SALER_SUCCESS = '[SalesOrder] Fetch Saler Success'
export const FETCH_SALER_FAILURE = '[SalesOrder] Fetch Saler Failure'

export const FETCH_ACCOUNT = '[SalesOrder] Fetch Account'
export const FETCH_ACCOUNT_SUCCESS = '[SalesOrder] Fetch Account Success'
export const FETCH_ACCOUNT_FAILURE = '[SalesOrder] Fetch Account Failure'


export class FetchStocksAction implements Action {
  readonly type = FETCH_STOCKS
}
export class FetchStocksSuccessAction implements Action {
  readonly type = FETCH_STOCKS_SUCCESS
  constructor(public stocks: Stock[]) {}
}
export class FetchStocksFailureAction implements Action {
  readonly type = FETCH_STOCKS_FAILURE
}


export class AddSalesOrderAction implements Action {
  readonly type = ADD_SALESORDER
  constructor(public salesOrder: SalesOrder) {}
}
export class AddSalesOrderSuccessAction implements Action {
  readonly type = ADD_SALESORDER_SUCCESS
  constructor(public salesOrderUUID: string) {}
}
export class AddSalesOrderFailureAction implements Action {
  readonly type = ADD_SALESORDER_FAILURE
}


export class FetchSalerAction implements Action {
  readonly type = FETCH_SALER
}
export class FetchSalerSuccessAction implements Action {
  readonly type = FETCH_SALER_SUCCESS
  constructor(public salers: Saler[]) {}
}
export class FetchSalerFailureAction implements Action {
  readonly type = FETCH_SALER_FAILURE
}


export class FetchAccountAction implements Action {
  readonly type = FETCH_ACCOUNT
}
export class FetchAccountSuccessAction implements Action {
  readonly type = FETCH_ACCOUNT_SUCCESS
  constructor(public accounts: Account[]) {}
}
export class FetchAccountFailureAction implements Action {
  readonly type = FETCH_ACCOUNT_FAILURE
}


export type Actions =
FetchStocksAction |
FetchStocksSuccessAction |
FetchStocksFailureAction |

AddSalesOrderAction |
AddSalesOrderSuccessAction |
AddSalesOrderFailureAction |

FetchSalerAction |
FetchSalerSuccessAction |
FetchSalerFailureAction |

FetchAccountAction |
FetchAccountSuccessAction |
FetchAccountFailureAction

