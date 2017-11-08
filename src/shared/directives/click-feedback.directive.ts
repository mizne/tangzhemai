import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

import { DeviceFeedback } from '@ionic-native/device-feedback'

@Directive({ selector: '[clickFeedback]' })
export class ClickFeedbackDirective {
  constructor(
    private el: ElementRef,
    private rd: Renderer2,
    private deviceFeedback: DeviceFeedback
  ) { }

  @Input('clickFeedback') activeCls: string

  @HostListener('click')
  clickItem() {
    this.rd.addClass(this.el.nativeElement, this.activeCls)

    this.deviceFeedback.acoustic();
    this.deviceFeedback.haptic(0);

    setTimeout(() => {
      this.rd.removeClass(this.el.nativeElement, this.activeCls || 'active')
    }, 1e2)
  }
}