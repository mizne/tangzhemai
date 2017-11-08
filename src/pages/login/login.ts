import { Component, OnInit, OnDestroy } from '@angular/core'
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular'
import { FormGroup, FormBuilder, Validators } from "@angular/forms"
import { Storage } from '@ionic/storage'
import { Device } from '@ionic-native/device'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { State } from '../../app/reducers'
import { ToTabsPageAction } from '../../app/app.action'
import { LoginService } from './login.service'
import { LoggerService } from '../../app/services/logger.service'

import { FeedbackService } from '../../app/services/feedback.service'

// declare var JPush: any
/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit, OnDestroy {

  myForm: FormGroup

  subscription: Subscription

  constructor(
    private alertCtrl: AlertController,
    private formBuilder: FormBuilder,
    private loadingCtrl: LoadingController,
    private logger: LoggerService,
    private loginService: LoginService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private storage: Storage,
    private store: Store<State>,
    private device: Device,
    private feedbackService: FeedbackService
  ) {
  }

  ionViewDidLoad(): void {
    console.log('ionViewDidLoad LoginPage')
  }

  ngOnInit(): void {
    this.buildForm()
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe()
    }
  }

  /**
   * 构造 表单模型
   *
   * @memberof LoginPage
   */
  buildForm(): void {
    this.myForm = this.formBuilder.group({
      name: ['', [
        Validators.required
      ]],
      password: ['', [
        Validators.required
      ]]
    })

    // this.myForm.valueChanges.subscribe(data => this.onValueChanged(data))
  }


  /**
   * 登录 并 存储信息 跳转 tabPage
   *
   * @memberof LoginPage
   */
  onLogin(): void {
    let loading = this.loadingCtrl.create({
      content: '登录中...',
    })

    loading.present()

    this.feedbackService.feedback()

    this.subscription = this.loginService.login(this.myForm.value)
      .subscribe(result => {
        loading.dismiss()
        // 存储tenantId
        const tenantId = result.tenantId
        this.storage.set('TENANT_ID', tenantId)
        this.storage.set('HAS_LOGIN', true)
        this.storage.set('LOGIN_NAME', this.myForm.value.name)
        this.store.dispatch(new ToTabsPageAction())

        // 真机或模拟器运行
        // if (this.device.platform) {
          // JPush.setAlias(tenantId, () => {
          //   this.logger.info({
          //     module: 'login',
          //     method: 'onLogin',
          //     description: `set alias success; alias: ${tenantId}`
          //   })
          // }, (errMsg) => {
          //   this.logger.error({
          //     module: 'login',
          //     method: 'onLogin',
          //     description: `set alias failed; err: ${errMsg}`
          //   })
          // })
        // }
      }, err => {
        loading.dismiss()
        let alert = this.alertCtrl.create({
          title: '登录错误',
          subTitle: err.message,
          buttons: ['我知道了']
        })

        alert.present()
      })
    }
  /**
   * 跳转 注册页面
   *
   * @memberof LoginPage
   */
  onSignup(): void {
    // this.navCtrl.push(SignupPage)
  }

}
