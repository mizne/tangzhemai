import * as fromOrder from './order.action'
import { Order } from './models/order.model'

export interface State {
  loading: boolean
  orders: Order[]
}

const initialState: State = {
  loading: false,
  orders: [],
}

export function reducer(
  state: State = initialState,
  action: fromOrder.Actions
): State {
  switch (action.type) {
    case fromOrder.FETCH_ORDERS:
      return {
        ...state,
        loading: true
      }
    case fromOrder.FETCH_ORDERS_SUCCESS:
      return {
        ...state,
        loading: false,
        orders: action.orders
      }
    case fromOrder.FETCH_ORDERS_FAILURE:
      return {
        ...state,
        loading: false
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getOrders = (state: State) => state.orders
