import { Action } from '@ngrx/store'
import { MerchantInfo } from '../models/merchant-info.model'

export const FETCH_MERCHANT_INFO = '[Mine] Fetch Merchant Info'
export const FETCH_MERCHANT_INFO_SUCCESS = '[Mine] Fetch Merchant Info Success'
export const FETCH_MERCHANT_INFO_FAILURE = '[Mine] Fetch Merchant Info Failure'

export const EDIT_DELIVERY_START_TIME = '[Mine] Edit Delivery Start Time'
export const EDIT_DELIVERY_START_TIME_SUCCESS = '[Mine] Edit Delivery Start Time Success'
export const EDIT_DELIVERY_START_TIME_FAILURE = '[Mine] Edit Delivery Start Time Failure'

export const EDIT_DELIVERY_END_TIME = '[Mine] Edit Delivery End Time'
export const EDIT_DELIVERY_END_TIME_SUCCESS = '[Mine] Edit Delivery End Time Success'
export const EDIT_DELIVERY_END_TIME_FAILURE = '[Mine] Edit Delivery End Time Failure'


export class FetchMerchantInfoAction implements Action {
  readonly type = FETCH_MERCHANT_INFO
}
export class FetchMerchantInfoSuccessAction implements Action {
  readonly type = FETCH_MERCHANT_INFO_SUCCESS
  constructor(public merchantInfo: MerchantInfo) {}
}
export class FetchMerchantInfoFailureAction implements Action {
  readonly type = FETCH_MERCHANT_INFO_FAILURE
}


export class EditDeliveryStartTimeAction implements Action {
  readonly type = EDIT_DELIVERY_START_TIME
  constructor(public startTime: string) {}
}
export class EditDeliveryStartTimeSuccessAction implements Action {
  readonly type = EDIT_DELIVERY_START_TIME_SUCCESS
  constructor(public startTime: string) {}
}
export class EditDeliveryStartTimeFailureAction implements Action {
  readonly type = EDIT_DELIVERY_START_TIME_FAILURE
}


export class EditDeliveryEndTimeAction implements Action {
  readonly type = EDIT_DELIVERY_END_TIME
  constructor(public endTime: string) {}
}
export class EditDeliveryEndTimeSuccessAction implements Action {
  readonly type = EDIT_DELIVERY_END_TIME_SUCCESS
  constructor(public endTime: string) {}
}
export class EditDeliveryEndTimeFailureAction implements Action {
  readonly type = EDIT_DELIVERY_END_TIME_FAILURE
}

export type Actions =
FetchMerchantInfoAction |
FetchMerchantInfoSuccessAction |
FetchMerchantInfoFailureAction |

EditDeliveryStartTimeAction |
EditDeliveryStartTimeSuccessAction |
EditDeliveryStartTimeFailureAction |

EditDeliveryEndTimeAction |
EditDeliveryEndTimeSuccessAction |
EditDeliveryEndTimeFailureAction
