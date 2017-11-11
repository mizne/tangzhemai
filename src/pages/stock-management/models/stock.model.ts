import * as R from 'ramda'

export class Stock {
  id?: string

  static convertFromResp(resp: StockResp): Stock {
    return R.reject(R.isNil, {

    })
  }
}

export interface StockResp {
  
}