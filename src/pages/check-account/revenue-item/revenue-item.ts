import { Component, Input, Output, EventEmitter } from '@angular/core'
import { AlertController } from 'ionic-angular'

import { FeedbackService } from '../../../app/services/feedback.service'

/**
 * Generated class for the RevenueItemPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'revenue-item',
  templateUrl: 'revenue-item.html'
})
export class RevenueItem {
  @Input() title: string
  @Input() number: string
  @Input() size: string
  @Input() help: string
  @Input() toDetail: boolean

  @Output() view: EventEmitter<void> = new EventEmitter<void>()

  constructor(
    private alertCtrl: AlertController,
    private feedbackService: FeedbackService
  ) {}

  handleClick() {
    if (this.help) {
      this.feedbackService.feedback()
      this.alertCtrl
        .create({
          title: '温馨提示',
          message: this.help,
          buttons: ['朕知道了']
        })
        .present()
    }

    if (this.toDetail) {
      this.view.emit()
    }
  }
}
