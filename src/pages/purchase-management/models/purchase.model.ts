import * as R from 'ramda'

export class Purchase {
  id?: string

  static convertFromResp(resp: PurchaseResp): Purchase {
    return R.reject(R.isNil, {

    })
  }
}

export interface PurchaseResp {
  
}