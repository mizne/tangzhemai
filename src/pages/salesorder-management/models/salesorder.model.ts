import * as R from 'ramda'

export class SalesOrder {
  id?: string

  static convertFromResp(resp: SalesOrderResp): SalesOrder {
    return R.reject(R.isNil, {

    })
  }
}

export interface SalesOrderResp {
  
}