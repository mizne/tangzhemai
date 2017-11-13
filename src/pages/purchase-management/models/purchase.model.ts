import * as R from 'ramda'

export interface PurchaseGoods {
  id?: string
  count?: number
}

export class Purchase {
  uuid?: string
  id?: string
  goods?: PurchaseGoods[]
  providerId?: string
  stockId?: string

  static convertFromResp(resp: PurchaseResp): Purchase {
    return R.reject(R.isNil, {

    })
  }
}

export interface PurchaseResp {
  
}