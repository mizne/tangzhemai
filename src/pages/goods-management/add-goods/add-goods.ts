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
import { DestroyService } from '../../../app/services/destroy.service'

import { Subject } from 'rxjs/Subject'
import { Observable } from 'rxjs/Observable'

import { GoodsType } from '../models/goodsType.model'
import { GoodsUnit } from '../models/goodsUnit.model'

import { Store } from '@ngrx/store'
import { State, getAllGoodsTypes, getAllGoodsUnits } from '../reducers'
import {
  FectchGoodsTypesAction,
  AddGoodsTypeAction,
  FetchGoodsUnitsAction,
  AddGoodsUnitAction
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
  templateUrl: 'add-goods.html',
  providers: [DestroyService]
})
export class AddGoodsPage implements OnInit {
  goodsForm: FormGroup

  addGoodsTypeSub: Subject<void> = new Subject<void>()
  addGoodsUnitSub: Subject<void> = new Subject<void>()
  ionViewDidEnterSub: Subject<void> = new Subject<void>()
  cancelCreateSub: Subject<void> = new Subject<void>()
  createSub: Subject<void> = new Subject<void>()

  allGoodsTypes$: Observable<GoodsType[]>
  allGoodsUnits$: Observable<GoodsUnit[]>

  constructor(
    private alertCtrl: AlertController,
    private navCtrl: NavController,
    private navParams: NavParams,
    private viewCtrl: ViewController,
    private feedbackService: FeedbackService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {}

  ngOnInit() {
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter(): void {
    this.ionViewDidEnterSub.next()
  }

  toAddGoodsType(): void {
    this.addGoodsTypeSub.next()
  }

  toAddGoodsUnit(): void {
    this.addGoodsUnitSub.next()
  }

  cancel() {
    this.cancelCreateSub.next()
  }

  toSaveGoods() {
    this.createSub.next()
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
      buyPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
      price: [null, [Validators.required, Validators.pattern(/\d+/)]],
      vipPrice: [null, [Validators.required, Validators.pattern(/\d+/)]],
      totalCount: [null, [Validators.required, Validators.pattern(/\d+/)]],
      goodsUnitId: [null, Validators.required],
      goodsTypeId: [null, Validators.required],
      isActive: [true, Validators.required],
      description: [null],
      // listImageUrl: [null, Validators.required],
    })
  }

  private buildFormForEdit(): void {}

  private initDataSource(): void {
    this.allGoodsTypes$ = this.store.select(getAllGoodsTypes)
    this.allGoodsUnits$ = this.store.select(getAllGoodsUnits)
  }

  private initSubscriber(): void {
    this.initFetchGoodsTypesAndGoodsUnits()
    this.initAddGoodsType()
    this.initAddGoodsUnit()
    this.initCancelCreate()
    this.initCreate()
  }

  private initAddGoodsType(): void {
    this.addGoodsTypeSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('商品分类')
      })
      .takeUntil(this.destroyService)
      .subscribe(goodsTypeName => {
        this.store.dispatch(new AddGoodsTypeAction(goodsTypeName))
      })
  }

  private initFetchGoodsTypesAndGoodsUnits(): void {
    this.ionViewDidEnterSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.store.dispatch(new FectchGoodsTypesAction())
        this.store.dispatch(new FetchGoodsUnitsAction())
      })
  }

  private initAddGoodsUnit(): void {
    this.addGoodsUnitSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('商品单位')
      })
      .takeUntil(this.destroyService)
      .subscribe(goodsUnitName => {
        this.store.dispatch(new AddGoodsUnitAction(goodsUnitName))
      })
  }

  private initCancelCreate(): void {
    this.cancelCreateSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
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
      })
  }

  private initCreate(): void {
    this.createSub.asObservable().subscribe(() => {
      this.dismiss({
        name: 'fakeSaveGoodsName'
      })
    })
  }

  private createAlertToInput(name): Observable<string> {
    return new Observable(observer => {
      this.alertCtrl
        .create({
          title: `新增${name}`,
          inputs: [
            {
              name: 'key',
              placeholder: `${name}名称`
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
                if (data.key) {
                  observer.next(data.key)
                  observer.complete()
                } else {
                  this.toastCtrl
                    .create({
                      message: `还没有填写${name}名称`,
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
