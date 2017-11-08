import { Injectable } from '@angular/core'
import { DeviceFeedback } from '@ionic-native/device-feedback'

@Injectable()
export class FeedbackService {
  constructor(private deviceFeedback: DeviceFeedback) {}

  feedback() {
    this.deviceFeedback.acoustic()
    // 触觉震感反馈
    // this.deviceFeedback.haptic(0)

    console.log('fake feedback')
  }
}
