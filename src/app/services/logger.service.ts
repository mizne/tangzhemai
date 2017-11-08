import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Storage } from '@ionic/storage'
// import { Device } from '@ionic-native/device'

interface ErrorInfo {
  module: string,
  method: string,
  description: string
}

/*
  Generated class for the LoggerProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LoggerService {
  private url = 'http://logger.xiaovbao.cn/api/v1/mobile-admin/error-message'

  constructor(
    public http: HttpClient,
    private storage: Storage,
    // private device: Device
  ) {
  }

  /**
   * info 级别日志记录
   * 
   * @param {ErrorInfo} error 
   * @returns {Promise<any>} 
   * @memberof LoggerProvider
   */
  info(error: ErrorInfo): Promise<any> {
    return this.postErrorMessage(error.module, 'INFO', error.method, error.description)
  }

  /**
   * error 级别日志记录
   * 
   * @param {ErrorInfo} error 
   * @returns {Promise<any>} 
   * @memberof LoggerProvider
   */
  error(error: ErrorInfo): Promise<any> {
    return this.postErrorMessage(error.module, 'ERROR', error.method, error.description)
  }

  /**
   * 日志记录
   * 
   * @private
   * @param {any} module 
   * @param {any} level 
   * @param {any} method 
   * @param {any} description 
   * @returns {Promise<any>} 
   * @memberof LoggerProvider
   */
  private postErrorMessage(module, level, method, description): Promise<any> {
    return Promise.all([this.storage.get('TENANT_ID'), this.storage.get('LOGIN_NAME')])
    .then(([tenantId, loginName]) => {
      const params = {
        tenantId,
        loginName,
        module,
        level,
        method,
        description,
        // devicePlatform: this.device.platform,
        // deviceVersion: this.device.version,
        // deviceUUID: this.device.uuid
      }
      return this.http.post(this.url, params)
      .toPromise()
      .catch(this.handleError)
    })
    
  }

  /**
   * http 错误处理
   * 
   * @private
   * @param {*} error 
   * @returns {Promise<any>} 
   * @memberof LoggerProvider
   */
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error)
    return Promise.reject(error.message || error)
  } 
}
