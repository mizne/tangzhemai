import * as R from 'ramda'

export class Stock {
  id?: string
  name?: string

  static convertFromResp(resp: StockResp): Stock {
    return R.reject(R.isNil, {

    })
  }
}

export interface StockResp {
  
}