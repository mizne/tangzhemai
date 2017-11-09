import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import 'rxjs/add/operator/map'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/do'
import 'rxjs/add/operator/retryWhen'
import 'rxjs/add/operator/delay'
import 'rxjs/add/operator/scan'

import { Observable } from 'rxjs/Observable'
// import { LoggerService } from '../../app/services/logger.service'

// import { APIResponse } from '../interceptor'

/*
  Generated class for the OcrServiceProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class LoginService {
  private url = '/admin/login'

  constructor(
    public http: HttpClient, 
    // private logger: LoggerService
  ) {}

  /**
   * 最大 http请求错误 重试次数
   *
   * @private
   * @type {number}
   * @memberof LoginServiceProvider
   */
  private MAX_RETRY_COUNT: number = 3
  /**
   * http请求错误 重试间隔时间
   *
   * @private
   * @type {number}
   * @memberof LoginServiceProvider
   */
  private RETRY_DELAY: number = 5e2

  /**
   * 登录操作
   *
   * @param {any} {name, password}
   * @returns {Promise<any>}
   * @memberof LoginProvider
   */
  login({ name, password }): Observable<any> {
    return this.http
      .post(this.url, {
        userName: name,
        password,
        mode: 'mobile'
      })
      .map(result => {
        const r = result as any
        if (r.resCode !== 0) {
          throw new Error(r.result)
        } else {
          return r.result
        }
      })
      .catch(this.handleError.bind(this, 'login'))
  }

  /**
   * http 错误处理
   *
   * @private
   * @param {string} method
   * @param {*} error
   * @returns {Promise<any>}
   * @memberof LoginProvider
   */
  private handleError(method: string, error: any): Observable<any> {
    // this.logger.error({
    //   module: 'loginService',
    //   method: 'login',
    //   description: error.message || '用户名或密码错误'
    // })
    return Observable.throw(new Error(error.message || '用户名或密码错误!'))
  }
}
