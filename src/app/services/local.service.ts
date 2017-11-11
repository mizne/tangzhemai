import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import * as R from 'ramda'

@Injectable()
export class LocalService {

  constructor(
    private storage: Storage
  ) { }

  setToken(value: string) {
    this.storage.set('TOKEN', value)
  }

  getToken(): Promise<string> {
    return this.storage.get('TOKEN')
  }

  setTenantId(value: string) {
    this.storage.set('TENANT_ID', value)
  }

  getTenantId(): Promise<string> {
    return this.storage.get('TENANT_ID')
  }

  setLoginName(value: string) {
    this.storage.set('LOGIN_NAME', value)
  }

  getLoginName(): Promise<string> {
    return this.storage.get('LOGIN_NAME')
  }
  

  clear(): Promise<void> {
    return this.storage.clear()
  }

  has(key: string): Promise<void> {
    return this.storage.get(key)
    .then(e => {
      if (R.isNil(e)) {
        return Promise.reject(void 0)
      } else {
        return Promise.resolve()
      }
    })
  }

  hasLogin(): Promise<void> {
    return this.has('TENANT_ID')
  }

}