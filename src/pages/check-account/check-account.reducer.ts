import * as fromCheckAccount from './check-account.action'

export interface State {
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export function reducer(
  state: State = initialState,
  action: fromCheckAccount.Actions
): State {
  switch (action.type) {
    case fromCheckAccount.FETCH_CHECK_ACCOUNT:
      return {
        ...state,
        loading: true
      }
    
    default:
      return state
  }
}

export const getLoading = (state: State) => state.loading
