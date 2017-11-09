import { Component, OnInit, OnDestroy } from '@angular/core'
import {
  NavController,
  NavParams,
  ViewController,
  AlertController,
  ModalController,
  ToastController
} from 'ionic-angular'
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms'
import { FeedbackService } from '../../../app/services/feedback.service'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { GoodsType } from '../models/goodsType.model'

import { Store } from '@ngrx/store'
import { State, getAllGoodsTypes } from '../reducers'
import {
  FectchGoodsTypesAction,
  AddGoodsTypeAction
} from '../goods-management.action'

/**
 * Generated class for the AddGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export enum GooodsActionType {
  CREATE,
  EDIT
}

@Component({
  selector: 'page-add-goods',
  templateUrl: 'add-goods.html'
})
export class AddGoodsPage implements OnInit {
  goodsForm: FormGroup

  // nameCtrol: FormControl = new FormControl('', Validators.required)
  addGoodsTypeSub: Subject<void> = new Subject<void>()

  selectGoodsTypeId: string

  allGoodsTypes$: Observable<GoodsType[]>

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private feedbackService: FeedbackService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private store: Store<State>
  ) {}

  ngOnInit() {
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
    this.initFechaData()
  }

  ionViewDidLoad() {}

  toAddGoodsType(): void {
    this.addGoodsTypeSub.next()
  }

  cancel() {
    this.alertCtrl
      .create({
        title: '放弃新增',
        message: '确定放弃这次新增商品么?',
        buttons: [
          {
            text: '取消',
            role: 'cancel',
            handler: () => {
              this.feedback()
            }
          },
          {
            text: '确定',
            handler: () => {
              this.dismiss()
              this.feedback()
            }
          }
        ]
      })
      .present()
  }

  toSaveGoods() {
    console.log('save goods')
    this.dismiss({
      name: 'fakeSaveGoodsName'
    })
  }

  private buildForm(): void {
    const action = this.navParams.get('action')
    if (action === GooodsActionType.CREATE) {
      this.buildFormForCreate()
    }

    if (action === GooodsActionType.EDIT) {
      this.buildFormForEdit()
    }
  }

  private buildFormForCreate(): void {
    this.goodsForm = this.fb.group({
      name: [null, Validators.required],
      // buyPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
      // price: [null, [Validators.required, Validators.pattern(/\d+/)]],
      // vipPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
      // totalCount: [null, [Validators.required, Validators.pattern(/\d+/)]],
      // goodsUnitId: [null, Validators.required],
      goodsTypeId: [null, Validators.required]
      // isActive: [true, Validators.required],
      // description: [null],
      // listImageUrl: [null, Validators.required],
    })
  }

  private buildFormForEdit(): void {}

  private initDataSource(): void {
    this.allGoodsTypes$ = this.store.select(getAllGoodsTypes)
  }

  private initSubscriber(): void {
    this.initAddGoodsType()
  }

  private initAddGoodsType(): void {
    this.addGoodsTypeSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput()
      })
      .subscribe(goodsTypeName => {
        this.store.dispatch(new AddGoodsTypeAction(goodsTypeName))
      })
  }

  private initFechaData(): void {
    this.store.dispatch(new FectchGoodsTypesAction())
  }

  private createAlertToInput(): Observable<string> {
    return new Observable(observer => {
      this.alertCtrl
        .create({
          title: '新增商品分类',
          inputs: [
            {
              name: 'goodsTypeName',
              placeholder: '商品分类名称'
            }
          ],
          buttons: [
            {
              text: '取消',
              role: 'cancel',
              handler: () => {
                this.feedbackService.feedback()
                observer.complete()
              }
            },
            {
              text: '新增',
              handler: data => {
                this.feedbackService.feedback()
                if (data.goodsTypeName) {
                  observer.next(data.goodsTypeName)
                  observer.complete()
                } else {
                  this.toastCtrl
                    .create({
                      message: '还没有填写分类名称',
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
    })
  }

  private feedback(): void {
    this.feedbackService.feedback()
  }

  private dismiss(data?: any): void {
    this.viewCtrl.dismiss(data)
  }
}
