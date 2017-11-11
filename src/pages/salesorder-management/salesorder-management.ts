import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Store } from '@ngrx/store'
import { State, getCurrentSalesOrders, getSalesOrderLoading } from './reducers'
import { FetchSalesOrderAction } from './salesorder-management.action'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { SalesOrder } from './models/salesorder.model'

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
  salesOrders$: Observable<SalesOrder[]>

  ionViewEnterSub: Subject<void> = new Subject<void>()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private store: Store<State>,
    private destroyService: DestroyService
  ) {
  }

  ionViewDidLoad() {
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getSalesOrderLoading)
    this.salesOrders$ = this.store.select(getCurrentSalesOrders)
  }

  private initSubscriber(): void {
    this.initFetchSalesOrders()
  }

  private initFetchSalesOrders(): void {
    this.ionViewEnterSub.asObservable()
    .takeUntil(this.destroyService)
    .subscribe(() => {
      this.store.dispatch(new FetchSalesOrderAction())
    })
  }

}
