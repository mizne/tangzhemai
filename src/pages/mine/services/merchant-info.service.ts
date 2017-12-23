import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Observable } from 'rxjs/Observable'
import { APIResponse } from '../../../app/interceptors/api-error-interceptor'
import { MerchantInfo, MerchantInfoResp } from '../models/merchant-info.model'

import { LoggerService } from '../../../app/services/logger.service'

@Injectable()
export class MerchantInfoService {
  private merchantInfoUrl = '/admin/deal/tenantInfo'
  private changePasswordUrl = '/admin/changePassword'

  constructor(
    private http: HttpClient,
    private logger: LoggerService
  ) {}

  fetchMerchantInfo(
    tenantId: string,
  ): Observable<MerchantInfo> {
    const query = `?tenantId=${tenantId}`

    return this.http.get(this.merchantInfoUrl + query)
    .map(res => (res as APIResponse).result[0] as MerchantInfoResp)
    .map(MerchantInfo.convertFromResp)
    .catch(e => {
      return this.logger.httpError({
        module: 'MerchantInfoService',
        method: 'fetchMerchantInfo',
        error: e
      })
    })
  }

  editMerchantInfo(tenantId: string, merchantInfo: MerchantInfo): Observable<any> {
    return this.http.put(this.merchantInfoUrl, {
      tenantConfig: MerchantInfo.convertFromModel(merchantInfo),
      condition: {
        tenantId
      }
    })
    .map(res => (res as APIResponse).result)
    .catch(e => {
      return this.logger.httpError({
        module: 'MerchantInfoService',
        method: 'editMerchantInfo',
        error: e
      })
    })
  }

  changePassword(tenantId: string, oldPassword: string, newPassword: string): Observable<any> {
    return this.http.post(this.changePasswordUrl, {
      oldPassword,
      newPassword,
      tenantId
    })
    .map(res => (res as APIResponse).result)
    .catch(e => {
      return this.logger.httpError({
        module: 'MerchantInfoService',
        method: 'changePassword',
        error: e
      })
    })
  }
}
