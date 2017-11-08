import { Directive, HostListener, Input, Renderer2, ElementRef } from '@angular/core';

@Directive({ selector: '[clickFeedback]' })
export class ClickFeedbackDirective {
  constructor(
    private el: ElementRef,
    private rd: Renderer2
  ) { }

  @Input('clickFeedback') activeCls: string

  @HostListener('click')
  clickItem() {
    this.rd.addClass(this.el.nativeElement, this.activeCls)

    setTimeout(() => {
      this.rd.removeClass(this.el.nativeElement, this.activeCls)
    }, 1e2)
  }
}