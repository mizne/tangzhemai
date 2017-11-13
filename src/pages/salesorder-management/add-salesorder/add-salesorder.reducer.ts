import * as fromAddSalesOrder from './add-salesorder.action'
import { Stock } from '../../purchase-management/models/stock.model'
import { Saler } from '../models/saler.model'
import { Account } from '../models/account.model'

export interface State {
  loading: boolean
  stocks: Stock[]
  salers: Saler[]
  accounts: Account[]

  saveSuccessSalesOrderUUID: string
}

const initialState: State = {
  loading: false,
  stocks: [],
  salers: [],
  accounts: [],

  saveSuccessSalesOrderUUID: ''
}

export function reducer(
  state: State = initialState,
  action: fromAddSalesOrder.Actions
): State {
  switch (action.type) {
    case fromAddSalesOrder.FETCH_STOCKS_SUCCESS:
      return {
        ...state,
        stocks: action.stocks
      }
    case fromAddSalesOrder.ADD_SALESORDER_SUCCESS:
      return {
        ...state,
        saveSuccessSalesOrderUUID: action.salesOrderUUID
      }
    case fromAddSalesOrder.FETCH_SALER_SUCCESS:
      return {
        ...state,
        salers: action.salers
      }
    case fromAddSalesOrder.FETCH_ACCOUNT_SUCCESS:
      return {
        ...state,
        accounts: action.accounts
      }
    default:
      return state
  }
}

export const getStocks = (state: State) => state.stocks
export const getSalers = (state: State) => state.salers
export const getAccounts = (state: State) => state.accounts
export const getSaveSuccessSalesOrderUUID = (state: State) => state.saveSuccessSalesOrderUUID