import { Component, OnInit } from '@angular/core'
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
import 'rxjs/add/operator/finally'

import { SalesOrder } from '../models/salesorder.model'
import { Stock } from '../../purchase-management/models/stock.model'
import { Saler } from '../models/saler.model'
import { Account } from '../models/account.model'

import { Store } from '@ngrx/store'
import {
  State,
  getSaveSuccessSalesOrderUUID,
  getStocks,
  getSalers,
  getAccounts
} from '../reducers'
import {
  AddSalesOrderAction,
  FetchStocksAction,
  FetchSalerAction,
  FetchAccountAction
} from './add-salesorder.action'

import { SalesOrderSelectGoodsPage, ShowGoods } from '../select-goods/select-goods'

import * as UUID from 'uuid'

/**
 * Generated class for the AddSalesorderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-add-salesorder',
  templateUrl: 'add-salesorder.html',
  providers: [DestroyService]
})
export class AddSalesorderPage implements OnInit {
  salesOrderForm: FormGroup

  ionViewDidEnterSub: Subject<void> = new Subject<void>()
  cancelCreateSub: Subject<void> = new Subject<void>()
  saveSub: Subject<void> = new Subject<void>()
  selectGoodsSub: Subject<void> = new Subject<void>()

  allStocks$: Observable<Stock[]>
  allSalers$: Observable<Saler[]>
  allAccount$: Observable<Account[]>

  selectedGoodses: ShowGoods[] = []
  totalNum = 0
  totalPrice = '0.00'
  salesOrderUUID: string // 用于标识销售单

  constructor(
    private alertCtrl: AlertController,
    public navCtrl: NavController,
    public navParams: NavParams,
    private viewCtrl: ViewController,
    private feedbackService: FeedbackService,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController,
    private fb: FormBuilder,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddSalesorderPage')
  }

  ngOnInit() {
    this.initNavParams()
    this.buildForm()
    this.initDataSource()
    this.initSubscriber()
  }

  ionViewDidEnter(): void {
    this.ionViewDidEnterSub.next()
  }

  toSelectGoods() {
    this.selectGoodsSub.next()
  }

  cancel() {
    this.cancelCreateSub.next()
  }

  toSave() {
    this.saveSub.next()
  }

  private initNavParams(): void {
    this.salesOrderUUID = UUID()
  }

  private buildForm(): void {
    this.buildFormForCreate()
  }

  private buildFormForCreate(): void {
    this.salesOrderForm = this.fb.group({
      accountId: [null, Validators.required],
      stockId: [null, Validators.required],
      salerId: [null, Validators.required],
      description: [null]
    })
  }

  private initDataSource(): void {
    this.allStocks$ = this.store.select(getStocks)
    this.allSalers$ = this.store.select(getSalers)
    this.allAccount$ = this.store.select(getAccounts)
  }

  private initSubscriber(): void {
    this.initFetchData()
    this.initForm()

    this.initSelectGoods()
    this.initCancelCreate()
    this.initCreate()
    this.initCreateSuccess()
  }

  private initFetchData(): void {
    this.ionViewDidEnterSub
      .asObservable()
      .first()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.store.dispatch(new FetchStocksAction())
        this.store.dispatch(new FetchSalerAction())
        this.store.dispatch(new FetchAccountAction())
      })
  }

  private initForm(): void {
    this.allStocks$
      .filter(stocks => stocks.length > 0)
      .first()
      .takeUntil(this.destroyService)
      .subscribe(stocks => {
        this.salesOrderForm.patchValue({
          stockId: stocks[0].id
        })
      })

    this.allSalers$
      .filter(salers => salers.length > 0)
      .first()
      .takeUntil(this.destroyService)
      .subscribe(salers => {
        this.salesOrderForm.patchValue({
          salerId: salers[0].id
        })
      })

    this.allAccount$
      .filter(accounts => accounts.length > 0)
      .first()
      .takeUntil(this.destroyService)
      .subscribe(accounts => {
        this.salesOrderForm.patchValue({
          accountId: accounts[0].id
        })
      })
  }

  private initSelectGoods(): void {
    this.selectGoodsSub
      .asObservable()
      .do(() => this.feedback())
      .switchMap(() => {
        return new Observable(observer => {
          const modal = this.modalCtrl.create(SalesOrderSelectGoodsPage, {
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
      .subscribe(() => {
        this.alertCtrl
          .create({
            title: `放弃新增`,
            message: `确定放弃这次新增销售单么?`,
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
    this.saveSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        const purchase = this.salesOrderForm.value

        this.store.dispatch(
          new AddSalesOrderAction({
            ...purchase,
            goods: this.selectedGoodses.map(e => ({
              id: e.id,
              count: e.count
            })),
            uuid: this.salesOrderUUID
          })
        )
      })
  }

  private initCreateSuccess(): void {
    this.store
      .select(getSaveSuccessSalesOrderUUID)
      .filter(purchaseUUID => purchaseUUID === this.salesOrderUUID)
      .takeUntil(this.destroyService)
      .subscribe(() => {
        console.log('create success to dismiss')
        this.dismiss()
      })
  }

  private feedback(): void {
    this.feedbackService.feedback()
  }

  private dismiss(data?: any): void {
    this.viewCtrl.dismiss(data)
  }
}
