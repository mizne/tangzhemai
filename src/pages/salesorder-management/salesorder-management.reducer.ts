import * as fromSalesOrder from './salesorder-management.action'
import { Order } from '../order/models/order.model'

export interface State {
  loading: boolean
  salesOrders: Order[]
}

const initialState: State = {
  loading: false,
  salesOrders: [],
}

export function reducer(
  state: State = initialState,
  action: fromSalesOrder.Actions
): State {
  switch (action.type) {
    case fromSalesOrder.FETCH_SALESORDER:
      return {
        ...state,
        loading: true
      }
    case fromSalesOrder.FETCH_SALESORDER_SUCCESS:
      return {
        ...state,
        loading: false,
        salesOrders: action.salesOrders
      }
    case fromSalesOrder.FETCH_SALESORDER_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getSalesOrders = (state: State) => state.salesOrders
