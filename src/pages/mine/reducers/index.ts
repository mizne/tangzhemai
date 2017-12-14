import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromMineIndex from '../mine.reducer'
import * as fromDelivery from '../delivery/delivery.reducer'
import * as fromRoot from '../../../app/reducers'

export interface MineState {
  mineIndex: fromMineIndex.State,
  delivery: fromDelivery.State
}

export interface State extends fromRoot.State {
  mine: MineState,
}

export const reducers = {
  mineIndex: fromMineIndex.reducer,
  delivery: fromDelivery.reducer
}

export const getMineModuleState = createFeatureSelector<MineState>('mine')

export const getMineIndexState = createSelector(getMineModuleState, (state: MineState) => state.mineIndex)


export const getDeliveryState = createSelector(getMineModuleState, (state: MineState) => state.delivery)
export const getDeliveryStartTime = createSelector(getDeliveryState, fromDelivery.getStartTime)
export const getDeliveryEndTime = createSelector(getDeliveryState, fromDelivery.getEndTime)

