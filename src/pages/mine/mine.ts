import { Component } from '@angular/core'
import { NavController, AlertController } from 'ionic-angular'
import { CallNumber } from '@ionic-native/call-number'

import { Store } from '@ngrx/store'
import { State } from './reducers'
import { LogoutAction } from '../../app/app.action'

@Component({
  selector: 'page-mine',
  templateUrl: 'mine.html'
})
export class MinePage {
  actionItems = [
    {
      id: 0,
      label: '员工管理',
      icon: 'employee',
      command: 'employee'
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

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private callNumber: CallNumber,
    private store: Store<State>
  ) {}

  executeAction(command: string) {
    switch (command) {
      case 'employee':
        break
      case 'help':
        break
      case 'yijian':
        break
      case 'kefu':
        this.alertCtrl
          .create({
            title: '联系客服',
            message: `确认拨打 ${this.helpPhoneNumber}?`,
            buttons: [
              {
                text: '取消',
                role: 'cancel',
                handler: () => {
                }
              },
              {
                text: '拨打',
                handler: () => {

                  this.callNumber
                    .callNumber('02586662644', true)
                    .catch(e =>
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
        break
      case 'about':
      this.navCtrl.push('AboutPage')
      // this.store.dispatch(new ToAboutPageAction())
        break

      default:
        break
    }
  }

  logout(): void {
    this.alertCtrl
      .create({
        title: '退出',
        message: `确定退出登录?`,
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
            }
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
}
