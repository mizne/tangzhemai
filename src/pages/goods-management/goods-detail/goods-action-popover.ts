import { Component } from '@angular/core'

import {
  App,
  NavController,
  ModalController,
  ViewController,
  NavParams,
  AlertController
} from 'ionic-angular'
import { Observable } from 'rxjs/Observable'
import { Subject } from 'rxjs/Subject'

import { Store } from '@ngrx/store'
import {
  State,
  getCurrentGoods,
  getAllGoodsTypes,
  getAllGoodsUnits
} from '../reducers'
import {
  OffShelfGoodsAction,
  OnShelfGoodsAction,
  FectchGoodsTypesAction,
  FetchGoodsUnitsAction
} from '../goods-management.action'

import { FeedbackService } from '../../../app/services/feedback.service'
import { DestroyService } from '../../../app/services/destroy.service'

import { AddGoodsPage, GooodsActionType } from '../add-goods/add-goods'
import { Goods } from '../models/goods.model'

@Component({
  template: `
    <ion-list>
      <button ion-item (click)="toEdit()">
        <ion-icon name="create" item-start></ion-icon>
        <span>编辑</span>
      </button>
      <button ion-item *ngIf="isActive$ | async; else block;" (click)="toOffShelf()">
        <ion-icon name="cloud-download" item-start></ion-icon>
        <span>下架</span>
      </button>
      <ng-template #block>
        <button ion-item (click)="toOnShelf()">
          <ion-icon name="cloud-upload" item-start></ion-icon>
          <span>上架</span>
        </button>
      </ng-template>
    </ion-list>
  `,
  styles: [
    `
    .list-md {
      margin: 0 !important;
    }
  `
  ],
  providers: [DestroyService]
})
export class GoodsActionPopoverPage {
  isActive$: Observable<boolean>

  goodsId: string

  toEditSub: Subject<void> = new Subject<void>()

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private navParams: NavParams,
    public app: App,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private store: Store<State>,
    private feedbackService: FeedbackService,
    private destroyService: DestroyService
  ) {}

  ionViewDidLoad() {
    this.initNavParams()

    this.initDataSource()
    this.initSubscriber()
  }

  toEdit() {
    this.toEditSub.next()
  }

  toOffShelf() {
    this.feedbackService.feedback()
    this.dismiss()
    this.store.dispatch(new OffShelfGoodsAction(this.goodsId))
  }

  toOnShelf() {
    this.feedbackService.feedback()
    this.dismiss()
    this.store.dispatch(new OnShelfGoodsAction(this.goodsId))
  }

  private initNavParams(): void {
    this.goodsId = this.navParams.get('id')
  }

  private initDataSource(): void {
    this.isActive$ = this.store.select(getCurrentGoods).map(goodses => {
      return goodses.find(e => e.id === this.goodsId).isActive
    })
  }

  private initSubscriber(): void {
    this.initToEdit()

    this.initFetchGoodsTypesAndGoodsUnits()
  }

  private initToEdit(): void {
    const toEditGoods$: Observable<Goods> = this.toEditSub
      .asObservable()
      .do(() => {
        this.feedbackService.feedback()
        this.dismiss()
      })
      .switchMap(() => {
        return this.store
          .select(getCurrentGoods)
          .map(goodes => goodes.find(goods => goods.id === this.goodsId))
          .withLatestFrom(
            this.store.select(getAllGoodsTypes),
            (goods, allGoodsTypes) => {
              return {
                ...goods,
                goodsTypeId: allGoodsTypes.find(
                  e => e.name === goods.goodsTypeName
                ).id
              }
            }
          )
          .withLatestFrom(
            this.store.select(getAllGoodsUnits),
            (goods, allGoodsUnits) => {
              return {
                ...goods,
                goodsUnitId: allGoodsUnits.find(
                  e => e.name === goods.goodsUnitName
                ).id
              }
            }
          )
      })

    toEditGoods$.takeUntil(this.destroyService).subscribe(goods => {
      this.modalCtrl
        .create(AddGoodsPage, {
          goods,
          action: GooodsActionType.EDIT
        })
        .present()
    })
  }

  private initFetchGoodsTypesAndGoodsUnits(): void {
    this.store.dispatch(new FetchGoodsUnitsAction())
    this.store.dispatch(new FectchGoodsTypesAction())
  }

  private dismiss(data?: any) {
    this.viewCtrl.dismiss(data)
  }
}
