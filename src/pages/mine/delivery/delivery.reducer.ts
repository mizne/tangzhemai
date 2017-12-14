import * as fromDelivery from './delivery.action'

export interface State {
  loading: boolean
  startTime: string
  endTime: string
}

const initialState: State = {
  loading: false,
  startTime: '',
  endTime: ''
}

export function reducer(
  state: State = initialState,
  action: fromDelivery.Actions
): State {
  switch (action.type) {
    case fromDelivery.FETCH_MERCHANT_INFO:
      return {
        ...state,
        loading: true
      }
    case fromDelivery.FETCH_MERCHANT_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        startTime: action.merchantInfo.deliveryStartTime,
        endTime: action.merchantInfo.deliveryEndTime
      }
    case fromDelivery.EDIT_DELIVERY_START_TIME_SUCCESS:
      return {
        ...state,
        startTime: action.startTime
      }
    case fromDelivery.EDIT_DELIVERY_END_TIME_SUCCESS:
      return {
        ...state,
        endTime: action.endTime
      }

    default:
      return state
  }
}

export const getStartTime = (state: State) => state.startTime
export const getEndTime = (state: State) => state.endTime
