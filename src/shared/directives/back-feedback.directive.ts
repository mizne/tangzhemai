import { Directive, Input, OnInit } from '@angular/core';
import { Navbar, NavController } from 'ionic-angular'
import { FeedbackService } from '../../app/services/feedback.service'

@Directive({ selector: '[backFeedback]' })
export class BackFeedbackDirective implements OnInit {
  constructor(
    private navCtrl: NavController,
    private feedbackService: FeedbackService
  ) {
  }

  @Input('backFeedback') navbar: Navbar

  ngOnInit() {
    const originalHandler = this.navbar.backButtonClick

    this.navbar.backButtonClick = (ev) => {
      this.feedbackService.feedback()
      originalHandler.call(this, ev)
    }

    console.log(this.navbar)
  }
}
