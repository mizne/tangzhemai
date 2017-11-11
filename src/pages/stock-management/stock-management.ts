import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Store } from '@ngrx/store'
import { State, getCurrentStocks, getStockLoading } from './reducers'
import { FetchStocksAction } from './stock-management.action'

import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { Stock } from './models/stock.model'
import { DestroyService } from '../../app/services/destroy.service'

/**
 * Generated class for the StockManagementPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-stock-management',
  templateUrl: 'stock-management.html',
  providers: [DestroyService]
})
export class StockManagementPage implements OnInit {

  loading$: Observable<boolean>
  stocks$: Observable<Stock[]>

  ionViewEnterSub: Subject<void> = new Subject<void>()

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private destroyService: DestroyService,
    private store: Store<State>
  ) {
  }

  ionViewDidLoad() {
  }

  
  ionViewDidEnter() {
    this.ionViewEnterSub.next()
  }

  ngOnInit() {
    this.initDataSource()
    this.initSubscriber()
  }

  private initDataSource(): void {
    this.loading$ = this.store.select(getStockLoading)
    this.stocks$ = this.store.select(getCurrentStocks)
  }

  private initSubscriber(): void {
    this.initFetchStocks()
  }

  private initFetchStocks(): void {
    this.ionViewEnterSub.asObservable()
    .takeUntil(this.destroyService)
    .subscribe(() => {
      this.store.dispatch(new FetchStocksAction())
    })
  }

}
