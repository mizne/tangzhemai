import { Action } from '@ngrx/store'

export const FETCH_CHECK_ACCOUNT = '[CheckAccount] Fetch Check Account'
export const FETCH_CHECK_ACCOUNT_SUCCESS = '[CheckAccount] Fetch Check Account Success'
export const FETCH_CHECK_ACCOUNT_FAILURE = '[CheckAccount] Fetch Check Account Failure'

export const FETCH_GOODS_WRITE_OFF = '[CheckAccount] Fetch Goods Write Off'
export const FETCH_GOODS_WRITE_OFF_SUCCESS = '[CheckAccount] Fetch Goods Write Off Success'
export const FETCH_GOODS_WRITE_OFF_FAILURE = '[CheckAccount] Fetch Goods Write Off Failure'

export const FETCH_COLLECT_MONEY = '[CheckAccount] Fetch Collect Money'
export const FETCH_COLLECT_MONEY_SUCCESS = '[CheckAccount] Fetch Collect Money Success'
export const FETCH_COLLECT_MONEY_FAILURE = '[CheckAccount] Fetch Collect Money Failure'


export class FetchCheckAccountAction implements Action {
  readonly type = FETCH_CHECK_ACCOUNT
}
export class FetchCheckAccountSuccessAction implements Action {
  readonly type = FETCH_CHECK_ACCOUNT_SUCCESS
}
export class FetchCheckAccountFailureAction implements Action {
  readonly type = FETCH_CHECK_ACCOUNT_FAILURE
}

export class FetchGoodsWriteOffAction implements Action {
  readonly type = FETCH_GOODS_WRITE_OFF
}
export class FetchGoodsWriteOffSuccessAction implements Action {
  readonly type = FETCH_GOODS_WRITE_OFF_SUCCESS
}
export class FetchGoodsWriteOffFailureAction implements Action {
  readonly type = FETCH_GOODS_WRITE_OFF_FAILURE
}

export class FetchCollectMoneyAction implements Action {
  readonly type = FETCH_COLLECT_MONEY
}
export class FetchCollectMoneySuccessAction implements Action {
  readonly type = FETCH_GOODS_WRITE_OFF_SUCCESS
}
export class FetchCollectMoneyFailureAction implements Action {
  readonly type = FETCH_GOODS_WRITE_OFF_FAILURE
}




export type Actions =
FetchCheckAccountAction |
FetchCheckAccountSuccessAction |
FetchCheckAccountFailureAction |

FetchGoodsWriteOffAction |
FetchGoodsWriteOffSuccessAction |
FetchGoodsWriteOffFailureAction |

FetchCollectMoneyAction |
FetchCollectMoneySuccessAction |
FetchCollectMoneyFailureAction


