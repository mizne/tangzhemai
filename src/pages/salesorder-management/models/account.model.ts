import * as R from 'ramda'

export class Account {
  uuid?: string
  id?: string
  name?: string

  static convertFromResp(resp: AccountResp): Account {
    return R.reject(R.isNil, {

    })
  }
}

export interface AccountResp {
  
}