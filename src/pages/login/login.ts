import { Component, OnInit } from '@angular/core'
import {
  IonicPage,
  NavController,
} from 'ionic-angular'
import { FormGroup, FormBuilder, Validators } from '@angular/forms'
import { Store } from '@ngrx/store'

import { State } from '../../app/reducers'
import { LoginAction } from '../../app/app.action'

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
export class LoginPage implements OnInit {
  myForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
    public navCtrl: NavController,
    private store: Store<State>,
  ) {}

  ngOnInit(): void {
    this.buildForm()
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
  }

  /**
   * 登录 并 存储信息 跳转 tabPage
   *
   * @memberof LoginPage
   */
  onLogin(): void {
    this.store.dispatch(new LoginAction(this.myForm.value))
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
