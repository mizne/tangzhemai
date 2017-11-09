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

import { Store } from '@ngrx/store'
import { State, getCurrentGoods } from '../reducers'
import { OffShelfGoodsAction, OnShelfGoodsAction } from '../goods-management.action'

import { FeedbackService } from '../../../app/services/feedback.service'

import { AddGoodsPage, GooodsActionType } from '../add-goods/add-goods'

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
  styles: [`
    .list-md {
      margin: 0 !important;
    }
  `]
})
export class GoodsActionPopoverPage {
  isActive$: Observable<boolean>

  goodsId: string

  constructor(
    public viewCtrl: ViewController,
    public navCtrl: NavController,
    private navParams: NavParams,
    public app: App,
    public modalCtrl: ModalController,
    private alertCtrl: AlertController,
    private store: Store<State>,
    private feedbackService: FeedbackService
  ) {}

  ionViewDidLoad() {
    this.goodsId = this.navParams.get('id')

    this.isActive$ = this.store.select(getCurrentGoods).map(goodses => {
      return goodses.find(e => e.id === this.goodsId).isActive
    })
  }

  support() {
    this.app.getRootNav().push('SupportPage')
    this.viewCtrl.dismiss()
  }

  toEdit() {
    this.feedbackService.feedback()
    this.dismiss()

    this.app.getRootNav().push(AddGoodsPage, {
      id: this.goodsId,
      action: GooodsActionType.EDIT
    })
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

  private dismiss(data?: any) {
    this.viewCtrl.dismiss(data)
  }
}
