import * as R from 'ramda'

export class Saler {
  uuid?: string
  id?: string
  name?: string

  static convertFromResp(resp: SalerResp): Saler {
    return R.reject(R.isNil, {

    })
  }
}

export interface SalerResp {
  
}