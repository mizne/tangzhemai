import { Component } from '@angular/core'
import {
  NavController,
  AlertController,
  App,
  ToastController
} from 'ionic-angular'
import { CallNumber } from '@ionic-native/call-number'

import { Store } from '@ngrx/store'
import { State } from './reducers'
import { LogoutAction } from '../../app/app.action'
import { FeedbackService } from '../../app/services/feedback.service'
import { LocalService } from '../../app/services/local.service'

import { AboutPage } from './about/about'
import { HelpCenterPage } from './help-center/help-center'
import { DeliveryPage } from './delivery/delivery'

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  actionItems = [
    {
      id: 0,
      label: '配送时间',
      icon: 'timer',
      command: 'deliveryTime'
    },
    {
      id: 1,
      label: '帮助中心',
      icon: 'help',
      command: 'help'
    },
    {
      id: 2,
      label: '意见反馈',
      icon: 'yijian',
      command: 'yijian'
    },
    {
      id: 3,
      label: '客服热线',
      icon: 'i-kefu',
      command: 'kefu'
    },
    {
      id: 4,
      label: '关于',
      icon: 'about',
      command: 'about'
    }
  ]

  helpPhoneNumber = '025-86662644'

  merchantName: Promise<string>

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private store: Store<State>,
    private feedbackService: FeedbackService,
    private localService: LocalService,
    private app: App,
    private toastCtrl: ToastController
  ) {}

  ionViewDidLoad() {
    this.merchantName = this.localService.getAliasName()
  }

  executeAction(command: string) {
    switch (command) {
      case 'deliveryTime':
        this.handleDeliveryTime()
        break
      case 'help':
        this.handleHelp()
        break
      case 'yijian':
        this.handleYiJian()
        break
      case 'kefu':
        this.handleKeFu()
        break
      case 'about':
        this.handleAbout()
        break
      default:
        break
    }
  }

  logout(): void {
    this.feedbackService.feedback()
    this.alertCtrl
      .create({
        title: '退出',
        message: `确定退出登录?`,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: '退出',
            handler: () => {
              this.store.dispatch(new LogoutAction())
            }
          }
        ]
      })
      .present()
  }

  private handleDeliveryTime(): void {
    this.app.getRootNav().push(DeliveryPage)
  }

  private handleHelp(): void {
    this.app.getRootNav().push(HelpCenterPage)
  }

  private handleYiJian(): void {
    this.alertCtrl
      .create({
        title: '填写意见',
        inputs: [
          {
            name: 'yijian',
            placeholder: '填写意见反馈'
          }
        ],
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: data => {
              console.log('Cancel clicked')
            }
          },
          {
            text: '提交',
            handler: data => {
              if (data.yijian) {
                this.toastCtrl
                  .create({
                    message: '感谢您的意见反馈！',
                    duration: 3e3,
                    position: 'top'
                  })
                  .present()
                return true
              } else {
                this.toastCtrl
                  .create({
                    message: '还没有填写呢',
                    duration: 3e3
                  })
                  .present()
                return false
              }
            }
          }
        ]
      })
      .present()
  }

  private handleKeFu(): void {
    this.alertCtrl
      .create({
        title: '联系客服',
        message: `确认拨打 ${this.helpPhoneNumber}?`,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {}
          },
          {
            text: '拨打',
            handler: () => {
              this.callNumber.callNumber('02586662644', true).catch(e =>
                this.alertCtrl.create({
                  title: '打电话失败',
                  message: '拨打电话失败',
                  buttons: ['我知道了']
                })
              )
            }
          }
        ]
      })
      .present()
  }

  private handleAbout(): void {
    this.app.getRootNav().push(AboutPage)
  }
}
