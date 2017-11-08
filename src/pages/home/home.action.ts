import { Action } from '@ngrx/store'

export const SEARCH_TEXT = '[Heaer] Search Text'
export class SearchTExtAction implements Action {
  readonly type = SEARCH_TEXT
  constructor(public text: string) {}
}

export const INCREMENT = '[Home] Increment'
export class IncrementAction implements Action {
  readonly type = INCREMENT
}
export const DECREMENT = '[Home] Decrement'
export class DecrementAction implements Action {
  readonly type = DECREMENT
}

export type Actions =
SearchTExtAction |
IncrementAction |
DecrementAction
