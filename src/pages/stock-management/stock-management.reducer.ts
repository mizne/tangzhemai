import * as fromStock from './stock-management.action'
import { Stock } from './models/stock.model'

export interface State {
  loading: boolean
  stocks: Stock[]
}

const initialState: State = {
  loading: false,
  stocks: [],
}

export function reducer(
  state: State = initialState,
  action: fromStock.Actions
): State {
  switch (action.type) {
    case fromStock.FETCH_STOCKS:
      return {
        ...state,
        loading: true
      }
    case fromStock.FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        loading: false,
        stocks: action.stocks
      }
    case fromStock.FETCH_STOCKS_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getStocks = (state: State) => state.stocks
