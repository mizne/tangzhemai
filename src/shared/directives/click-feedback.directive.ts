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
    const cls = this.activeCls || 'active'
    this.rd.addClass(this.el.nativeElement, cls)

    this.feedabckService.feedback()

    setTimeout(() => {
      this.rd.removeClass(this.el.nativeElement, cls)
    }, 1e2)
  }
}