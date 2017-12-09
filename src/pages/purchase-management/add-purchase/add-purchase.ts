import { Component, OnInit, OnDestroy } from '@angular/core'
import { HttpClient } from '@angular/common/http'
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

import { Purchase } from '../models/purchase.model'
import { Provider } from '../models/provider.model'
import { Stock } from '../models/stock.model'

import { Store } from '@ngrx/store'
import {
  State,
  getSaveSuccessPurchaseUUID,
  getProviders,
  getStocks
} from '../reducers'
import {
  AddPurchaseAction,
  FetchProvidersAction,
  FetchStockAction,
  AddProviderAction
} from '../purchase-management.action'

import { SelectGoodsPage, ShowGoods } from '../select-goods/select-goods'

import * as UUID from 'uuid'

/**
 * Generated class for the AddGoodsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-purchase',
  templateUrl: 'add-purchase.html',
  providers: [DestroyService]
})
export class AddPurchasePage implements OnInit {
  purchaseForm: FormGroup

  ionViewDidEnterSub: Subject<void> = new Subject<void>()
  cancelCreateSub: Subject<void> = new Subject<void>()
  saveSub: Subject<void> = new Subject<void>()
  selectGoodsSub: Subject<void> = new Subject<void>()
  addProviderSub: Subject<void> = new Subject<void>()

  discountInputSub: Subject<void> = new Subject<void>()
  otherFeeInputSub: Subject<void> = new Subject<void>()

  allProviders$: Observable<Provider[]>
  allStocks$: Observable<Stock[]>

  selectedGoodses: ShowGoods[] = []
  totalNum = 0
  totalPrice = '0.00'
  purchaseUUID: string // 用于标识采购单

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
    this.initNavParams()
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter(): void {
    this.ionViewDidEnterSub.next()
  }

  toAddProvider() {
    this.addProviderSub.next()
  }

  toSelectGoods() {
    this.selectGoodsSub.next()
  }

  toDiscountInput() {
    this.discountInputSub.next()
  }

  toOtherFeeInput() {
    this.otherFeeInputSub.next()
  }

  cancel() {
    this.cancelCreateSub.next()
  }

  toSave() {
    this.saveSub.next()
  }

  getFormControlValue(key: string) {
    return this.purchaseForm.controls[key].value
  }

  private initNavParams(): void {
    this.purchaseUUID = UUID()
  }

  private buildForm(): void {
    this.buildFormForCreate()
  }

  private buildFormForCreate(): void {
    this.purchaseForm = this.fb.group({
      providerId: [null, Validators.required],
      stockId: [null, Validators.required],
      description: [null],
      discount: [0],
      otherFee: [0],
      paidAmount: [0]
    })
  }

  private initDataSource(): void {
    this.allProviders$ = this.store.select(getProviders)
    this.allStocks$ = this.store.select(getStocks)
  }

  private initSubscriber(): void {
    this.initFetchProvidersAndStocks()
    this.initForm()

    this.initAddProvider()
    this.initSelectGoods()
    this.initCancelCreate()
    this.initCreate()
    this.initCreateSuccess()

    this.initDiscountInput()
    this.initOtherFeeInput()
  }

  private initFetchProvidersAndStocks(): void {
    this.ionViewDidEnterSub
      .asObservable()
      .first()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.store.dispatch(new FetchProvidersAction())
        this.store.dispatch(new FetchStockAction())
      })
  }

  private initForm(): void {
    this.allProviders$
      .filter(providers => providers.length > 0)
      .first()
      .takeUntil(this.destroyService)
      .subscribe(providers => {
        this.purchaseForm.patchValue({
          providerId: providers[0].id
        })
      })

    this.allStocks$
      .filter(stocks => stocks.length > 0)
      .first()
      .takeUntil(this.destroyService)
      .subscribe(stocks => {
        this.purchaseForm.patchValue({
          stockId: stocks[0].id
        })
      })
  }

  private initAddProvider(): void {
    this.addProviderSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('供应商')
      })
      .takeUntil(this.destroyService)
      .subscribe(providerName => {
        this.store.dispatch(new AddProviderAction(providerName))
      })
  }

  private createAlertToInput(name, inputType = 'text'): Observable<string> {
    return new Observable(observer => {
      this.alertCtrl
        .create({
          title: `新增${name}`,
          inputs: [
            {
              name: 'key',
              type: inputType,
              placeholder: `请输入${name}`
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
              text: '确定',
              handler: data => {
                this.feedbackService.feedback()
                if (data.key) {
                  observer.next(data.key)
                  observer.complete()
                } else {
                  this.toastCtrl
                    .create({
                      message: `还没有填写${name}`,
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

  private initSelectGoods(): void {
    this.selectGoodsSub
      .asObservable()
      .do(() => this.feedback())
      .switchMap(() => {
        return new Observable(observer => {
          const modal = this.modalCtrl.create(SelectGoodsPage, {
            selectedGoodses: this.selectedGoodses
          })
          modal.present()
          modal.onDidDismiss(data => {
            if (data) {
              observer.next(data)
            }
            observer.complete()
          })
        }) as Observable<ShowGoods[]>
      })
      .takeUntil(this.destroyService)
      .subscribe(data => {
        this.selectedGoodses = data
        this.totalNum = data.reduce(
          (accu, curr) => ((accu += curr.count), accu),
          0
        )
        this.totalPrice = data
          .reduce((accu, curr) => ((accu += curr.count * curr.price), accu), 0)
          .toFixed(2)
      })
  }

  private initCancelCreate(): void {
    this.cancelCreateSub
      .asObservable()
      .takeUntil(this.destroyService)
      .switchMap(() => {
        return new Observable(observer => {
          this.alertCtrl
            .create({
              title: `放弃新增`,
              message: `确定放弃这次新增采购单么?`,
              buttons: [
                {
                  text: '取消',
                  role: 'cancel',
                  handler: () => {
                    this.feedback()
                    observer.complete()
                  }
                },
                {
                  text: '确定',
                  handler: () => {
                    this.feedback()
                    observer.next()
                    observer.complete()
                  }
                }
              ]
            })
            .present()
        }) as Observable<void>
      })
      .subscribe(() => {
        this.dismiss()
      })
  }

  private initCreate(): void {
    this.saveSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        const purchase = this.purchaseForm.value

        this.store.dispatch(
          new AddPurchaseAction({
            ...purchase,
            goods: this.selectedGoodses.map(e => ({
              id: e.id,
              count: e.count,
              price: e.price
            })),
            uuid: this.purchaseUUID
          })
        )
      })
  }

  private initCreateSuccess(): void {
    this.store
      .select(getSaveSuccessPurchaseUUID)
      .filter(purchaseUUID => purchaseUUID === this.purchaseUUID)
      .takeUntil(this.destroyService)
      .subscribe(() => {
        console.log('create success to dismiss')
        this.dismiss()
      })
  }

  private initDiscountInput(): void {
    this.discountInputSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('优惠金额', 'number')
      })
      .takeUntil(this.destroyService)
      .subscribe(discount => {
        console.log(discount)
        this.purchaseForm.patchValue({
          discount
        })
      })
  }

  private initOtherFeeInput(): void {
    this.otherFeeInputSub
      .asObservable()
      .do(_ => this.feedbackService.feedback())
      .switchMap(() => {
        return this.createAlertToInput('其他费用', 'number')
      })
      .takeUntil(this.destroyService)
      .subscribe(otherFee => {
        console.log(otherFee)
        this.purchaseForm.patchValue({
          otherFee
        })
      })
  }

  private feedback(): void {
    this.feedbackService.feedback()
  }

  private dismiss(data?: any): void {
    this.viewCtrl.dismiss(data)
  }
}
