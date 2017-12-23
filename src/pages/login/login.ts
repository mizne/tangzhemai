import { Component, OnInit, OnDestroy } from '@angular/core'
import {
  AlertController,
  IonicPage,
  LoadingController,
  NavController,
  NavParams
} from 'ionic-angular'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Device } from '@ionic-native/device'
import { Store } from '@ngrx/store'
import { Observable } from 'rxjs/Observable'
import { Subscription } from 'rxjs/Subscription'

import { State } from '../../app/reducers'
import { ToTabsPageAction } from '../../app/app.action'
import { LoginService } from './login.service'

import { FeedbackService } from '../../app/services/feedback.service'
import { TenantService } from '../../app/services/tenant.service'
import { LoggerService } from '../../app/services/logger.service'

declare const JPush: any

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
    private loginService: LoginService,
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>,
    private device: Device,
    private feedbackService: FeedbackService,
    private tenantService: TenantService,
    private logger: LoggerService
  ) {}

  ionViewDidLoad(): void {}

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
      name: ['', [Validators.required]],
      password: ['', [Validators.required]]
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
      content: '登录中...'
    })

    loading.present()

    this.feedbackService.feedback()

    this.subscription = this.loginService.login(this.myForm.value).subscribe(
      result => {
        loading.dismiss()
        // Observable.forkJoin(
        //   this.tenantService.setTenantId(result.tenantId),
        //   this.tenantService.setToken(result.token),
        //   this.tenantService.setLoginName(result.name),
        //   this.tenantService.setAliasName(result.aliasName)
        // )
        //   .toPromise()
        this.tenantService.login(result)
          .then(() => {
            this.store.dispatch(new ToTabsPageAction())
            // 真机或模拟器运行
            if (this.device.platform) {
              JPush.setAlias(
                {
                  sequence: 1,
                  alias: result.tenantId
                },
                () => {
                  this.logger.info({
                    module: 'JPush',
                    method: 'setAlias',
                    description: `set alias success; alias: ${result.tenantId}`
                  })
                },
                (err) => {
                  this.logger.error({
                    module: 'JPush',
                    method: 'setAlias',
                    description: `set alias failed; err: ${err.message}`
                  })
                }
              )
            }
          })
      },
      () => {
        loading.dismiss()
        let alert = this.alertCtrl.create({
          title: '登录错误',
          subTitle: '用户名密码不匹配',
          buttons: ['我知道了']
        })

        alert.present()
      }
    )
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
