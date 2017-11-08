import * as fromMine from './mine.action'

export interface State {
  loading: boolean
}

const initialState: State = {
  loading: false,
}

export function reducer(
  state: State = initialState,
  action: fromMine.Actions
): State {
  switch (action.type) {
    
    default:
      return state
  }
}

