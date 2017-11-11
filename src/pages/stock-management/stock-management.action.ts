import { Action } from '@ngrx/store'

import { Stock } from './models/stock.model'

export const FETCH_STOCKS = '[Stock] Fetch Stocks'
export const FETCH_STOCKS_SUCCESS = '[Stock] Fetch Stocks Success'
export const FETCH_STOCKS_FAILURE = '[Stock] Fetch Stocks Failure'



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


export type Actions =
FetchStocksAction |
FetchStocksSuccessAction |
FetchStocksFailureAction
