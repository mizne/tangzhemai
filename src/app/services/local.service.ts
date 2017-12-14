import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import * as R from 'ramda'

@Injectable()
export class LocalService {

  constructor(
    private storage: Storage
  ) { }

  setToken(value: string): Promise<any> {
    return this.storage.set('TOKEN', value)
  }

  getToken(): Promise<string> {
    return this.storage.get('TOKEN')
  }

  setJPushID(id: string): Promise<any> {
    return this.storage.set('JPUSH_ID', id)
  }

  getJPushID(): Promise<string> {
    return this.storage.get('JPUSH_ID')
  }

  setTenantId(value: string): Promise<any> {
    return this.storage.set('TENANT_ID', value)
  }

  getTenantId(): Promise<string> {
    return this.storage.get('TENANT_ID')
  }

  setLoginName(value: string): Promise<any> {
    return this.storage.set('LOGIN_NAME', value)
  }

  getLoginName(): Promise<string> {
    return this.storage.get('LOGIN_NAME')
  }

  setAliasName(value: string): Promise<any> {
    return this.storage.set('ALIAS_NAME', value)
  }

  getAliasName(): Promise<string> {
    return this.storage.get('ALIAS_NAME')
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
