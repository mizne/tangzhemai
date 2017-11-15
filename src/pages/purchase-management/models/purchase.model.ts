import * as R from 'ramda'

import { OrderGoods } from '../../salesorder-management/models/salesorder.model'

export class Purchase {
  uuid?: string
  id?: string
  goods?: OrderGoods[]
  providerId?: string
  providerName?: string
  stockId?: string
  createdAt?: string

  static convertFromResp(resp: PurchaseResp): Purchase {
    return R.reject(R.isNil, {

    })
  }
}

export interface PurchaseResp {
  
}