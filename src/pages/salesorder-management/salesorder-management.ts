import { Component, OnInit } from '@angular/core'
import {
  IonicPage,
  NavController,
  NavParams,
  ModalController
} from 'ionic-angular'

import { Store } from '@ngrx/store'
import { State, getCurrentSalesOrders, getSalesOrderLoading } from './reducers'
import { FetchSalesOrderAction } from './salesorder-management.action'

import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { AddSalesorderPage } from './add-salesorder/add-salesorder'
import { OrderDetailPage } from '../order/order-detail/order-detail'

import { Order } from '../order/models/order.model'

import { DestroyService } from '../../app/services/destroy.service'

/**
 * Generated class for the SalesorderManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-salesorder-management',
  templateUrl: 'salesorder-management.html',
  providers: [DestroyService]
})
export class SalesorderManagementPage implements OnInit {
  loading$: Observable<boolean>
  salesOrders$: Observable<Order[]>

  ionViewEnterSub: Subject<void> = new Subject<void>()
  addSalesOrderSub: Subject<void> = new Subject<void>()

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private store: Store<State>,
    private destroyService: DestroyService,
    private modalCtrl: ModalController
  ) {}

  ionViewDidLoad() {}

  ionViewDidEnter() {
    this.ionViewEnterSub.next()
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  toAddSalesOrder() {
    this.addSalesOrderSub.next()
  }

  goDetailOrder(order: Order): void {
    this.navCtrl.push(OrderDetailPage, {
      order
    })
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getSalesOrderLoading)
    this.salesOrders$ = this.store.select(getCurrentSalesOrders)
  }

  private initSubscriber(): void {
    this.initFetchSalesOrders()

    this.initAddSalesOrder()
  }

  private initFetchSalesOrders(): void {
    this.ionViewEnterSub
      .asObservable()
      .first()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.store.dispatch(new FetchSalesOrderAction())
      })
  }

  private initAddSalesOrder(): void {
    this.addSalesOrderSub
      .asObservable()
      .takeUntil(this.destroyService)
      .subscribe(() => {
        this.modalCtrl.create(AddSalesorderPage).present()
      })
  }
}
