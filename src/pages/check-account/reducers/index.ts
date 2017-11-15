import { createFeatureSelector, createSelector } from '@ngrx/store'
import * as fromCheckAccount from '../check-account.reducer'
import * as fromRoot from '../../../app/reducers'

export interface CheckAccountState {
  checkAccoutIndex: fromCheckAccount.State
}

export interface State extends fromRoot.State {
  checkAccout: CheckAccountState
}

export const reducers = {
  checkAccoutIndex: fromCheckAccount.reducer
}

export const getCheckAccountModuleState = createFeatureSelector<CheckAccountState>('checkAccout')

export const getCheckAccountIndexState = createSelector(
  getCheckAccountModuleState, 
  (state: CheckAccountState) => state.checkAccoutIndex
)
export const getCheckAccountLoading = createSelector(
  getCheckAccountIndexState,
  fromCheckAccount.getLoading
)
export const getCheckAccount = createSelector(
  getCheckAccountIndexState,
  fromCheckAccount.getCheckAccount
)
export const getGoodsWriteOff = createSelector(
  getCheckAccountIndexState,
  fromCheckAccount.getGoodsWriteOff
)
export const getCollectMoney = createSelector(
  getCheckAccountIndexState,
  fromCheckAccount.getCollectMoney
)


