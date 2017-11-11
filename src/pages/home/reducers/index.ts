import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromHomeIndex from '../home.reducer'
import * as fromRoot from '../../../app/reducers'

export interface HomeState {
  homeIndex: fromHomeIndex.State
}

export interface State extends fromRoot.State {
  home: HomeState
}

export const reducers = {
  homeIndex: fromHomeIndex.reducer
}

export const getHomeModuleState = createFeatureSelector<HomeState>('home')

export const getHomeIndexState = createSelector(getHomeModuleState, (state: HomeState) => state.homeIndex)
export const getHomeLoading = createSelector(
  getHomeIndexState,
  fromHomeIndex.getLoading
)
export const getTodayStatistics = createSelector(
  getHomeIndexState,
  fromHomeIndex.getTodayStatistics
)

