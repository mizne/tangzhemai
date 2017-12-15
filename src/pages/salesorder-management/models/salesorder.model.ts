// import * as R from 'ramda'

export interface OrderGoods {
  id?: string
  count?: number
  price?: number
}

export class SalesOrder {
  uuid?: string
  id?: string
  tradeNo?: string
  createdAt?: Date
  time?: string
  phone?: string
  status?: number

  // static convertFromResp(resp: SalesOrderResp): SalesOrder {
  //   return R.reject(R.isNil, {

  //   })
  // }
}

export interface SalesOrderResp {
  id?: string
  tradeNo?: string

}
