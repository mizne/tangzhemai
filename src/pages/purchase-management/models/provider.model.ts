import * as R from 'ramda'

export class Provider {
  id?: string
  name?: string

  static convertFromResp(resp: ProviderResp): Provider {
    return R.reject(R.isNil, {

    })
  }
}

export interface ProviderResp {
  
}