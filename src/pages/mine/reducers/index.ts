import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromMineIndex from '../mine.reducer'
import * as fromRoot from '../../../app/reducers'

export interface MineState {
  mineIndex: fromMineIndex.State
}

export interface State extends fromRoot.State {
  mine: MineState
}

export const reducers = {
  mineIndex: fromMineIndex.reducer
}

export const getMineModuleState = createFeatureSelector<MineState>('home')

export const getMineIndexState = createSelector(getMineModuleState, (state: MineState) => state.mineIndex)


