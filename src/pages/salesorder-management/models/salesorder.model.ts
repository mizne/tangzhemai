import * as R from 'ramda'

export interface OrderGoods {
  id?: string
  count?: number
  price?: number
}

export class SalesOrder {
  uuid?: string
  id?: string
  accountId?: string
  accountName?: string
  salerId?: string
  description?: string
  goods?: OrderGoods[]
  stockId?: string
  createdAt?: Date

  static convertFromResp(resp: SalesOrderResp): SalesOrder {
    return R.reject(R.isNil, {

    })
  }
}

export interface SalesOrderResp {
  
}