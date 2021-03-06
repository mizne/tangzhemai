import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs/Observable'
import { LoggerService } from '../../app/services/logger.service'

export interface LoginResp {
  tenantId: string
  token: string
  name: string
  aliasName: string
}

// import { APIResponse } from '../../app/interceptors/api-error-interceptor'

/*
  Generated class for the OcrServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginService {
  private url = '/admin/login'

  constructor(public http: HttpClient, private logger: LoggerService) {}

  /**
   * 最大 http请求错误 重试次数
   *
   * @private
   * @type {number}
   * @memberof LoginServiceProvider
   */
  // private MAX_RETRY_COUNT: number = 3
  /**
   * http请求错误 重试间隔时间
   *
   * @private
   * @type {number}
   * @memberof LoginServiceProvider
   */
  // private RETRY_DELAY: number = 5e2

  /**
   * 登录操作
   *
   * @param {any} {name, password}
   * @returns {Promise<any>}
   * @memberof LoginProvider
   */
  login({ name, password }): Observable<LoginResp> {
    return this.http
      .post(this.url, {
        userName: name,
        password,
        loginMode: 'mobile'
      })
      .map(result => {
        const r = result as any
        if (r.resCode !== 0) {
          throw new Error(r.resMsg)
        } else {
          return r.result[0]
        }
      })
      .catch(e => {
        return this.logger.httpError({
          module: 'LoginService',
          method: 'login',
          error: e
        })
      })
  }
}
