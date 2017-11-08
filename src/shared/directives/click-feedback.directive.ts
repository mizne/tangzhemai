import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

import { FeedbackService } from '../../app/services/feedback.service'

@Directive({ selector: '[clickFeedback]' })
export class ClickFeedbackDirective {
  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private feedabckService: FeedbackService
  ) { }

  @Input('clickFeedback') activeCls: string

  @HostListener('click')
  clickItem() {
    this.rd.addClass(this.el.nativeElement, this.activeCls)

    this.feedabckService.feedback()

    setTimeout(() => {
      this.rd.removeClass(this.el.nativeElement, this.activeCls || 'active')
    }, 1e2)
  }
}