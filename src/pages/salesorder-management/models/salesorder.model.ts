import * as R from 'ramda'

export interface SalesOrderGoods {
  id?: string
  count?: number
}

export class SalesOrder {
  uuid?: string
  id?: string
  goods?: SalesOrderGoods[]
  stockId?: string

  static convertFromResp(resp: SalesOrderResp): SalesOrder {
    return R.reject(R.isNil, {

    })
  }
}

export interface SalesOrderResp {
  
}