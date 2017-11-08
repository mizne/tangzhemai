import * as fromHome from './home.action'

export interface State {
  loading: boolean
  count: number
}

const initialState: State = {
  loading: false,
  count: 0
}

export function reducer(
  state: State = initialState,
  action: fromHome.Actions
): State {
  switch (action.type) {
    case fromHome.SEARCH_TEXT:
      return {
        ...state,
        loading: true
      }
    case fromHome.INCREMENT:
      return {
        ...state,
        count: ++state.count
      }
    case fromHome.DECREMENT:
      return {
        ...state,
        count: --state.count
      }
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
export const getCount = (state: State) => state.count
