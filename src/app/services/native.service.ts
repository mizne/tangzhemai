import { Injectable, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http'

import { Platform, ToastController, AlertController } from 'ionic-angular'
import { Network } from '@ionic-native/network'

import { AppVersion } from '@ionic-native/app-version'
import { File } from '@ionic-native/file'
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer'
import { InAppBrowser } from '@ionic-native/in-app-browser'

import { Subscription } from 'rxjs/Subscription'
import { environment } from '../../environments/environment'

@Injectable()
export class NativeService implements OnDestroy {
  private subscription: Subscription
  constructor(
    private platform: Platform,
    private network: Network,
    private toastCtrl: ToastController,
    private transfer: FileTransfer,
    private appVersion: AppVersion,
    private file: File,
    private inAppBrowser: InAppBrowser,
    private alertCtrl: AlertController,
    private http: HttpClient
  ) {}

  /**
   * 检查app是否需要升级
   */
  detectionUpgrade() {
    //这里连接后台获取app最新版本号,然后与当前app版本号(this.getVersionNumber())对比
    //版本号不一样就需要申请,不需要升级就return
    this.http.get(environment.APP_VERSION).subscribe(version => {
      console.log(version)
    })

    // this.alertCtrl.create({
    //   title: '升级',
    //   subTitle: '发现新版本,是否立即升级？',
    //   buttons: [{text: '取消'},
    //     {
    //       text: '确定',
    //       handler: () => {
    //         this.downloadApp();
    //       }
    //     }
    //   ]
    // }).present();
  }

  /**
   * 下载安装app
   */
  downloadApp() {
    if (this.isAndroid()) {
      let alert = this.alertCtrl.create({
        title: '下载进度：0%',
        enableBackdropDismiss: false,
        buttons: ['后台下载']
      })
      alert.present()

      const fileTransfer: FileTransferObject = this.transfer.create()
      const apk = this.file.externalRootDirectory + 'tangzhemai.apk' //apk保存的目录

      fileTransfer.download(environment.APK_DOWNLOAD, apk).then(() => {
        window['install'].install(apk.replace('file://', ''))
      })

      fileTransfer.onProgress((event: ProgressEvent) => {
        let num = Math.floor(event.loaded / event.total * 100)
        if (num === 100) {
          alert.dismiss()
        } else {
          let title = document.getElementsByClassName('alert-title')[0]
          title && (title.innerHTML = '下载进度：' + num + '%')
        }
      })
    }
    if (this.isIos()) {
      // this.openUrlByBrowser(APP_DOWNLOAD);
    }
  }

  /**
   * 通过浏览器打开url
   */
  openUrlByBrowser(url: string): void {
    this.inAppBrowser.create(url, '_system')
  }

  /**
   * 获得app版本号,如0.01
   * @description  对应/config.xml中version的值
   * @returns {Promise<string>}
   */
  getVersionNumber(): Promise<string> {
    return new Promise(resolve => {
      this.appVersion
        .getVersionNumber()
        .then((value: string) => {
          resolve(value)
        })
        .catch(err => {
          console.log('getVersionNumber:' + err)
        })
    })
  }

  /**
   * 是否真机环境
   * 
   * @returns {boolean} 
   * @memberof NativeServiceProvider
   */
  isMobile(): boolean {
    return this.platform.is('mobile') && !this.platform.is('mobileweb')
  }

  /**
   * 是否android真机环境
   * 
   * @returns {boolean} 
   * @memberof NativeServiceProvider
   */
  isAndroid(): boolean {
    return this.isMobile() && this.platform.is('android')
  }

  /**
   * 是否ios真机环境
   * 
   * @returns {boolean} 
   * @memberof NativeServiceProvider
   */
  isIos(): boolean {
    return (
      this.isMobile() &&
      (this.platform.is('ios') ||
        this.platform.is('ipad') ||
        this.platform.is('iphone'))
    )
  }

  checkNetwork(): void {
    this.subscription = this.network
      .onDisconnect()
      .debounceTime(3e2)
      .subscribe(() => {
        this.toastCtrl
          .create({
            message: '网络不可用，请检查您的网络设置',
            duration: 3e3,
            position: 'top'
          })
          .present()
      })
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }
}
